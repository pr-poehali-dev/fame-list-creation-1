import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';

interface Celebrity {
  id: number;
  name: string;
  username: string;
  category: string;
  views: number;
  likes: number;
  imageUrl: string;
}

const categories = ['Все', 'главный фейм', 'фейм', 'средний фейм', 'малый фейм', 'новичок', 'скамер'];

const categoryColors: Record<string, string> = {
  'главный фейм': 'from-fuchsia-500 to-pink-500',
  'фейм': 'from-purple-500 to-violet-500',
  'средний фейм': 'from-cyan-500 to-blue-500',
  'малый фейм': 'from-blue-400 to-cyan-400',
  'новичок': 'from-gray-500 to-gray-600',
  'скамер': 'from-red-500 to-pink-600',
};

const Index = () => {
  const [celebrities, setCelebrities] = useState<Celebrity[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('Все');
  const [searchQuery, setSearchQuery] = useState('');
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const { toast } = useToast();

  const [newCeleb, setNewCeleb] = useState({
    name: '',
    username: '',
    category: 'главный фейм',
    imageUrl: ''
  });

  const handleLike = (id: number) => {
    setCelebrities(prev => prev.map(celeb => 
      celeb.id === id ? { ...celeb, likes: celeb.likes + 1 } : celeb
    ));
  };

  const handleDelete = (id: number) => {
    setCelebrities(prev => prev.filter(celeb => celeb.id !== id));
    toast({
      title: "Участник удален",
      description: "Участник успешно удален из списка",
    });
  };

  const handleAddCelebrity = () => {
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
                владелец @telorezov
              </p>
            </div>
            <div className="flex gap-3">
              <Dialog open={isAdminOpen} onOpenChange={setIsAdminOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-gradient-to-r from-fuchsia-600 to-purple-600 hover:opacity-90 text-white border-0">
                    <Icon name="Plus" size={18} className="mr-2" />
                    Добавить участника
                  </Button>
                </DialogTrigger>
                <DialogContent className="bg-card border-primary/30">
                  <DialogHeader>
                    <DialogTitle className="text-2xl bg-gradient-to-r from-fuchsia-500 to-purple-500 bg-clip-text text-transparent">
                      Добавить участника
                    </DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 mt-4">
                    <div>
                      <Label htmlFor="name">Имя</Label>
                      <Input
                        id="name"
                        placeholder="Введите имя"
                        value={newCeleb.name}
                        onChange={(e) => setNewCeleb({...newCeleb, name: e.target.value})}
                        className="bg-background/50 border-primary/30"
                      />
                    </div>
                    <div>
                      <Label htmlFor="username">Юзернейм</Label>
                      <Input
                        id="username"
                        placeholder="@username"
                        value={newCeleb.username}
                        onChange={(e) => setNewCeleb({...newCeleb, username: e.target.value})}
                        className="bg-background/50 border-primary/30"
                      />
                    </div>
                    <div>
                      <Label htmlFor="category">Категория</Label>
                      <Select value={newCeleb.category} onValueChange={(value) => setNewCeleb({...newCeleb, category: value})}>
                        <SelectTrigger className="bg-background/50 border-primary/30">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.filter(c => c !== 'Все').map(cat => (
                            <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="image">URL изображения</Label>
                      <Input
                        id="image"
                        placeholder="https://..."
                        value={newCeleb.imageUrl}
                        onChange={(e) => setNewCeleb({...newCeleb, imageUrl: e.target.value})}
                        className="bg-background/50 border-primary/30"
                      />
                    </div>
                    <Button 
                      onClick={handleAddCelebrity}
                      className="w-full bg-gradient-to-r from-fuchsia-600 to-purple-600 hover:opacity-90 text-white border-0"
                    >
                      Добавить
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
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
          <div className="text-center py-20 animate-fade-in">
            <Icon name="Users" className="mx-auto mb-4 text-muted-foreground" size={64} />
            <h3 className="text-2xl font-bold mb-2 text-foreground">Список пуст</h3>
            <p className="text-muted-foreground mb-6">Начните добавлять участников в свой фейм-лист</p>
            <Button 
              onClick={() => setIsAdminOpen(true)}
              className="bg-gradient-to-r from-fuchsia-600 to-purple-600 hover:opacity-90 text-white border-0"
            >
              <Icon name="Plus" size={18} className="mr-2" />
              Добавить первого участника
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-4">
            {filteredCelebrities.map((celeb, index) => {
              const borderColor = categoryColors[celeb.category] || 'from-gray-500 to-gray-600';
              
              return (
                <Card
                  key={celeb.id}
                  className={`overflow-hidden hover:shadow-2xl hover:shadow-primary/20 transition-all duration-300 hover:-translate-y-2 bg-card/80 backdrop-blur-sm animate-scale-in border-2 bg-gradient-to-b ${borderColor} p-[2px] relative group`}
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <Button
                    size="sm"
                    variant="destructive"
                    className="absolute top-2 right-2 z-20 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => handleDelete(celeb.id)}
                  >
                    <Icon name="Trash2" size={14} />
                  </Button>
                  
                  <div className="bg-card rounded-lg overflow-hidden h-full">
                    <div className="relative h-64 overflow-hidden group">
                      <img
                        src={celeb.imageUrl}
                        alt={celeb.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                      
                      <Badge className={`absolute top-3 right-3 bg-gradient-to-r ${borderColor} text-white border-0 shadow-lg`}>
                        {celeb.category}
                      </Badge>

                      <div className="absolute top-3 left-3 flex items-center gap-2 text-white text-sm bg-black/50 backdrop-blur-sm px-2 py-1 rounded-md">
                        <Icon name="Eye" size={14} />
                        {celeb.views}
                      </div>

                      <div className="absolute bottom-3 left-3 right-3">
                        <h3 className="text-white font-bold text-lg mb-1">{celeb.name}</h3>
                        <p className="text-cyan-400 text-sm">{celeb.username}</p>
                      </div>
                    </div>

                    <div className="p-3">
                      <Button
                        size="sm"
                        variant="outline"
                        className="w-full border-pink-500/50 hover:bg-pink-500/10 hover:border-pink-500 group"
                        onClick={() => handleLike(celeb.id)}
                      >
                        <Icon name="Heart" size={16} className="mr-2 group-hover:fill-pink-500 transition-all" />
                        <span className="text-pink-500">{celeb.likes}</span>
                      </Button>
                    </div>
                  </div>
                </Card>
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
