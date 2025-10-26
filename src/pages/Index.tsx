import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

interface Celebrity {
  id: number;
  name: string;
  category: string;
  rating: number;
  votes: number;
  imageUrl: string;
}

const initialCelebrities: Celebrity[] = [
  { id: 1, name: 'Анна Иванова', category: 'Актриса', rating: 9.5, votes: 2847, imageUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop' },
  { id: 2, name: 'Дмитрий Петров', category: 'Музыкант', rating: 9.2, votes: 3214, imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop' },
  { id: 3, name: 'Мария Смирнова', category: 'Блогер', rating: 8.9, votes: 4521, imageUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop' },
  { id: 4, name: 'Александр Козлов', category: 'Спортсмен', rating: 9.7, votes: 1893, imageUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop' },
  { id: 5, name: 'Елена Соколова', category: 'Актриса', rating: 9.1, votes: 2156, imageUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop' },
  { id: 6, name: 'Виктор Новиков', category: 'Музыкант', rating: 8.8, votes: 3678, imageUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop' },
  { id: 7, name: 'Ольга Морозова', category: 'Блогер', rating: 9.4, votes: 5234, imageUrl: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&h=400&fit=crop' },
  { id: 8, name: 'Сергей Волков', category: 'Спортсмен', rating: 9.6, votes: 2945, imageUrl: 'https://images.unsplash.com/photo-1552374196-c4e7ffc6e126?w=400&h=400&fit=crop' },
];

const categories = ['Все', 'Актриса', 'Музыкант', 'Блогер', 'Спортсмен'];

const Index = () => {
  const [celebrities, setCelebrities] = useState<Celebrity[]>(initialCelebrities);
  const [selectedCategory, setSelectedCategory] = useState('Все');
  const [searchQuery, setSearchQuery] = useState('');

  const handleVote = (id: number, increment: boolean) => {
    setCelebrities(prev => prev.map(celeb => {
      if (celeb.id === id) {
        const newVotes = celeb.votes + 1;
        const ratingChange = increment ? 0.1 : -0.1;
        const newRating = Math.max(0, Math.min(10, celeb.rating + ratingChange));
        return { ...celeb, votes: newVotes, rating: parseFloat(newRating.toFixed(1)) };
      }
      return celeb;
    }));
  };

  const filteredCelebrities = celebrities
    .filter(celeb => selectedCategory === 'Все' || celeb.category === selectedCategory)
    .filter(celeb => celeb.name.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-12 animate-fade-in">
          <div className="inline-block mb-4">
            <div className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              <h1 className="text-6xl font-bold mb-2">FameList</h1>
            </div>
          </div>
          <p className="text-xl text-muted-foreground">Рейтинг самых популярных знаменитостей</p>
        </header>

        <div className="flex flex-col md:flex-row gap-4 mb-8 animate-scale-in">
          <div className="flex-1 relative">
            <Icon name="Search" className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
            <Input
              placeholder="Поиск знаменитостей..."
              className="pl-10 h-12 bg-white/80 backdrop-blur-sm border-2 focus:border-primary transition-all"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="flex gap-2 mb-8 overflow-x-auto pb-2 animate-fade-in">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? 'default' : 'outline'}
              onClick={() => setSelectedCategory(category)}
              className={`whitespace-nowrap transition-all ${
                selectedCategory === category 
                  ? 'bg-gradient-to-r from-primary to-secondary hover:opacity-90' 
                  : 'hover:border-primary'
              }`}
            >
              {category}
            </Button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredCelebrities.map((celeb, index) => (
            <Card
              key={celeb.id}
              className="overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 bg-white/80 backdrop-blur-sm animate-scale-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="relative h-64 overflow-hidden group">
                <img
                  src={celeb.imageUrl}
                  alt={celeb.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <Badge className="absolute top-3 right-3 bg-gradient-to-r from-primary to-secondary text-white border-0">
                  {celeb.category}
                </Badge>
                <div className="absolute bottom-3 left-3 right-3">
                  <h3 className="text-white font-bold text-xl mb-1">{celeb.name}</h3>
                </div>
              </div>

              <div className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Icon name="Star" className="text-yellow-500 fill-yellow-500 animate-pulse-glow" size={24} />
                    <span className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                      {celeb.rating}
                    </span>
                  </div>
                  <div className="text-sm text-muted-foreground flex items-center gap-1">
                    <Icon name="Users" size={16} />
                    {celeb.votes.toLocaleString()}
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button
                    size="sm"
                    className="flex-1 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white border-0"
                    onClick={() => handleVote(celeb.id, true)}
                  >
                    <Icon name="ThumbsUp" size={16} />
                  </Button>
                  <Button
                    size="sm"
                    className="flex-1 bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white border-0"
                    onClick={() => handleVote(celeb.id, false)}
                  >
                    <Icon name="ThumbsDown" size={16} />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {filteredCelebrities.length === 0 && (
          <div className="text-center py-16 animate-fade-in">
            <Icon name="Search" className="mx-auto mb-4 text-muted-foreground" size={64} />
            <p className="text-xl text-muted-foreground">Знаменитости не найдены</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
