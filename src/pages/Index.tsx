import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';
import AuthDialog from '@/components/AuthDialog';
import AddCelebrityDialog from '@/components/AddCelebrityDialog';
import CelebrityCard from '@/components/CelebrityCard';
import EmptyState from '@/components/EmptyState';
import { ADMIN_USERNAME, categories, categoryColors, Celebrity, User } from '@/utils/constants';

const Index = () => {
  const [celebrities, setCelebrities] = useState<Celebrity[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('Все');
  const [searchQuery, setSearchQuery] = useState('');
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<string | null>(null);
  const { toast } = useToast();

  const [authData, setAuthData] = useState({
    username: '',
    password: '',
  });

  const [newCeleb, setNewCeleb] = useState({
    name: '',
    username: '',
    category: 'главный фейм',
    imageUrl: ''
  });

  useEffect(() => {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      setCurrentUser(savedUser);
    }

    const savedCelebrities = localStorage.getItem('celebrities');
    if (savedCelebrities) {
      setCelebrities(JSON.parse(savedCelebrities));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('celebrities', JSON.stringify(celebrities));
  }, [celebrities]);

  const handleRegister = () => {
    if (!authData.username || !authData.password) {
      toast({
        title: "Ошибка",
        description: "Заполните все поля",
        variant: "destructive"
      });
      return;
    }

    const username = authData.username.startsWith('@') ? authData.username : `@${authData.username}`;
    
    const users: User[] = JSON.parse(localStorage.getItem('users') || '[]');
    
    if (users.find(u => u.username === username)) {
      toast({
        title: "Ошибка",
        description: "Пользователь с таким именем уже существует",
        variant: "destructive"
      });
      return;
    }

    users.push({ username, password: authData.password });
    localStorage.setItem('users', JSON.stringify(users));
    
    setCurrentUser(username);
    localStorage.setItem('currentUser', username);
    setIsAuthOpen(false);
    
    toast({
      title: "Регистрация успешна",
      description: `Добро пожаловать, ${username}!`,
    });

    setAuthData({ username: '', password: '' });
  };

  const handleLogin = () => {
    if (!authData.username || !authData.password) {
      toast({
        title: "Ошибка",
        description: "Заполните все поля",
        variant: "destructive"
      });
      return;
    }

    const username = authData.username.startsWith('@') ? authData.username : `@${authData.username}`;
    const users: User[] = JSON.parse(localStorage.getItem('users') || '[]');
    
    const user = users.find(u => u.username === username && u.password === authData.password);
    
    if (!user) {
      toast({
        title: "Ошибка",
        description: "Неверный логин или пароль",
        variant: "destructive"
      });
      return;
    }

    setCurrentUser(username);
    localStorage.setItem('currentUser', username);
    setIsAuthOpen(false);
    
    toast({
      title: "Вход выполнен",
      description: `С возвращением, ${username}!`,
    });

    setAuthData({ username: '', password: '' });
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('currentUser');
    toast({
      title: "Выход выполнен",
      description: "До скорой встречи!",
    });
  };

  const isAdmin = currentUser === ADMIN_USERNAME;

  const handleLike = (id: number) => {
    setCelebrities(prev => prev.map(celeb => 
      celeb.id === id ? { ...celeb, likes: celeb.likes + 1 } : celeb
    ));
  };

  const handleDelete = (id: number) => {
    if (!isAdmin) return;
    
    setCelebrities(prev => prev.filter(celeb => celeb.id !== id));
    toast({
      title: "Участник удален",
      description: "Участник успешно удален из списка",
    });
  };

  const handleAddCelebrity = () => {
    if (!isAdmin) return;
    
    if (!newCeleb.name || !newCeleb.username || !newCeleb.imageUrl) {
      toast({
        title: "Ошибка",
        description: "Заполните все поля",
        variant: "destructive"
      });
      return;
    }

    const newId = celebrities.length > 0 ? Math.max(...celebrities.map(c => c.id)) + 1 : 1;
    
    setCelebrities(prev => [...prev, {
      id: newId,
      name: newCeleb.name,
      username: newCeleb.username.startsWith('@') ? newCeleb.username : `@${newCeleb.username}`,
      category: newCeleb.category,
      views: 0,
      likes: 0,
      imageUrl: newCeleb.imageUrl
    }]);

    setNewCeleb({
      name: '',
      username: '',
      category: 'главный фейм',
      imageUrl: ''
    });

    setIsAdminOpen(false);

    toast({
      title: "Участник добавлен",
      description: `${newCeleb.name} успешно добавлен в список`,
    });
  };

  const filteredCelebrities = celebrities
    .filter(celeb => selectedCategory === 'Все' || celeb.category === selectedCategory)
    .filter(celeb => celeb.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                     celeb.username.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwMCIgaGVpZ2h0PSIyMDAwIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxkZWZzPjxyYWRpYWxHcmFkaWVudCBpZD0iYSI+PHN0b3Agb2Zmc2V0PSIwIiBzdG9wLWNvbG9yPSIjZmZmIiBzdG9wLW9wYWNpdHk9Ii4yIi8+PHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjZmZmIiBzdG9wLW9wYWNpdHk9IjAiLz48L3JhZGlhbEdyYWRpZW50PjwvZGVmcz48Y2lyY2xlIGN4PSI1MCIgY3k9IjEwMCIgcj0iMSIgZmlsbD0idXJsKCNhKSIvPjxjaXJjbGUgY3g9IjIwMCIgY3k9IjUwIiByPSIxIiBmaWxsPSJ1cmwoI2EpIi8+PGNpcmNsZSBjeD0iNDAwIiBjeT0iMjAwIiByPSIxIiBmaWxsPSJ1cmwoI2EpIi8+PGNpcmNsZSBjeD0iNjAwIiBjeT0iODAiIHI9IjEiIGZpbGw9InVybCgjYSkiLz48Y2lyY2xlIGN4PSI4MDAiIGN5PSIzMDAiIHI9IjEiIGZpbGw9InVybCgjYSkiLz48Y2lyY2xlIGN4PSIxMDAwIiBjeT0iMTUwIiByPSIxIiBmaWxsPSJ1cmwoI2EpIi8+PGNpcmNsZSBjeD0iMTIwMCIgY3k9IjI1MCIgcj0iMSIgZmlsbD0idXJsKCNhKSIvPjxjaXJjbGUgY3g9IjE0MDAiIGN5PSIxMDAiIHI9IjEiIGZpbGw9InVybCgjYSkiLz48Y2lyY2xlIGN4PSIxNjAwIiBjeT0iMzUwIiByPSIxIiBmaWxsPSJ1cmwoI2EpIi8+PGNpcmNsZSBjeD0iMTgwMCIgY3k9IjIwMCIgcj0iMSIgZmlsbD0idXJsKCNhKSIvPjwvc3ZnPg==')] opacity-30" />
      
      <div className="container mx-auto px-4 py-8 relative z-10">
        <header className="mb-12 animate-fade-in">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-6xl font-bold mb-2 bg-gradient-to-r from-fuchsia-500 via-purple-500 to-cyan-400 bg-clip-text text-transparent" 
                  style={{ textShadow: '0 0 40px rgba(168, 85, 247, 0.4)' }}>
                FAME LIST
              </h1>
              <p className="text-sm text-muted-foreground flex items-center gap-2">
                <Icon name="Shield" size={16} />
                владелец {ADMIN_USERNAME}
              </p>
            </div>
            <div className="flex gap-3">
              {currentUser ? (
                <>
                  {isAdmin && (
                    <AddCelebrityDialog
                      isOpen={isAdminOpen}
                      onOpenChange={setIsAdminOpen}
                      newCeleb={newCeleb}
                      onNewCelebChange={setNewCeleb}
                      onAdd={handleAddCelebrity}
                      categories={categories}
                    />
                  )}
                  <Button variant="outline" className="border-primary/50 hover:bg-primary/10" onClick={handleLogout}>
                    <Icon name="LogOut" size={18} className="mr-2" />
                    {currentUser}
                  </Button>
                </>
              ) : (
                <AuthDialog
                  isOpen={isAuthOpen}
                  onOpenChange={setIsAuthOpen}
                  authData={authData}
                  onAuthDataChange={setAuthData}
                  onLogin={handleLogin}
                  onRegister={handleRegister}
                />
              )}
            </div>
          </div>

          <div className="relative mb-6">
            <Icon name="Search" className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
            <Input
              placeholder="Поиск участников..."
              className="pl-12 h-14 bg-card/50 backdrop-blur-sm border-primary/30 focus:border-primary text-lg"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="flex gap-2 overflow-x-auto pb-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? 'default' : 'outline'}
                onClick={() => setSelectedCategory(category)}
                className={`whitespace-nowrap transition-all ${
                  selectedCategory === category 
                    ? 'bg-gradient-to-r from-fuchsia-600 to-purple-600 hover:opacity-90 border-0' 
                    : 'border-primary/30 hover:bg-primary/10 hover:border-primary'
                }`}
              >
                {category}
              </Button>
            ))}
          </div>
        </header>

        {celebrities.length === 0 ? (
          <EmptyState isAdmin={isAdmin} onAddClick={() => setIsAdminOpen(true)} />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-4">
            {filteredCelebrities.map((celeb, index) => {
              const borderColor = categoryColors[celeb.category] || 'from-gray-500 to-gray-600';
              
              return (
                <CelebrityCard
                  key={celeb.id}
                  celebrity={celeb}
                  index={index}
                  borderColor={borderColor}
                  isAdmin={isAdmin}
                  onLike={handleLike}
                  onDelete={handleDelete}
                />
              );
            })}
          </div>
        )}

        {filteredCelebrities.length === 0 && celebrities.length > 0 && (
          <div className="text-center py-16 animate-fade-in">
            <Icon name="Search" className="mx-auto mb-4 text-muted-foreground" size={64} />
            <p className="text-xl text-muted-foreground">Участники не найдены</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
