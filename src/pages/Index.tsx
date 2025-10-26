import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

interface Celebrity {
  id: number;
  name: string;
  username: string;
  category: string;
  views: number;
  likes: number;
  imageUrl: string;
  isMain?: boolean;
}

const initialCelebrities: Celebrity[] = [
  { id: 1, name: 'Телорезов', username: '@telorezov', category: 'главный фейм', views: 28, likes: 10, imageUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&h=400&fit=crop', isMain: true },
  { id: 2, name: 'Gabriel Nordi', username: '@mainfuck', category: 'главный фейм', views: 21, likes: 4, imageUrl: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&h=400&fit=crop', isMain: true },
  { id: 3, name: 'Менталистов', username: '@tganecodw', category: 'главный фейм', views: 7, likes: 5, imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop', isMain: true },
  { id: 4, name: 'Conexion', username: '@pattagoniya', category: 'главный фейм', views: 4, likes: 3, imageUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop', isMain: true },
  { id: 5, name: 'Anecodw', username: '@anecodw', category: 'главный фейм', views: 1, likes: 0, imageUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop', isMain: true },
  { id: 6, name: 'Mi_Avdeev', username: '@Avdeev_v_praime', category: 'фейм', views: 8, likes: 3, imageUrl: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=400&h=400&fit=crop' },
  { id: 7, name: 'HYDRA', username: '@hydra_dark', category: 'средний фейм', views: 14, likes: 8, imageUrl: 'https://images.unsplash.com/photo-1552374196-c4e7ffc6e126?w=400&h=400&fit=crop' },
  { id: 8, name: 'DarkSoul', username: '@darksoul', category: 'средний фейм', views: 4, likes: 2, imageUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop' },
  { id: 9, name: 'Shadow', username: '@shadow_main', category: 'малый фейм', views: 10, likes: 6, imageUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop' },
  { id: 10, name: 'Phoenix', username: '@phoenix_rise', category: 'новичок', views: 12, likes: 7, imageUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop' },
  { id: 11, name: 'Ghost', username: '@ghost_walker', category: 'новичок', views: 8, likes: 4, imageUrl: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=400&h=400&fit=crop' },
  { id: 12, name: 'Nebula', username: '@nebula_star', category: 'скамер', views: 12, likes: 1, imageUrl: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&h=400&fit=crop' },
];

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
  const [celebrities, setCelebrities] = useState<Celebrity[]>(initialCelebrities);
  const [selectedCategory, setSelectedCategory] = useState('Все');
  const [searchQuery, setSearchQuery] = useState('');

  const handleLike = (id: number) => {
    setCelebrities(prev => prev.map(celeb => 
      celeb.id === id ? { ...celeb, likes: celeb.likes + 1 } : celeb
    ));
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
              <Button className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:opacity-90 text-white border-0">
                <Icon name="Plus" size={18} className="mr-2" />
                Подать заявку
              </Button>
              <Button variant="outline" className="border-primary/50 hover:bg-primary/10">
                <Icon name="Settings" size={18} className="mr-2" />
                Админка
              </Button>
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-4">
          {filteredCelebrities.map((celeb, index) => {
            const borderColor = categoryColors[celeb.category] || 'from-gray-500 to-gray-600';
            
            return (
              <Card
                key={celeb.id}
                className={`overflow-hidden hover:shadow-2xl hover:shadow-primary/20 transition-all duration-300 hover:-translate-y-2 bg-card/80 backdrop-blur-sm animate-scale-in border-2 bg-gradient-to-b ${borderColor} p-[2px]`}
                style={{ animationDelay: `${index * 0.05}s` }}
              >
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

        {filteredCelebrities.length === 0 && (
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
