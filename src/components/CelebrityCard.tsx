import { Button } from '@/components/ui/button';
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
}

interface CelebrityCardProps {
  celebrity: Celebrity;
  index: number;
  borderColor: string;
  isAdmin: boolean;
  onLike: (id: number) => void;
  onDelete: (id: number) => void;
}

const CelebrityCard = ({ 
  celebrity, 
  index, 
  borderColor, 
  isAdmin, 
  onLike, 
  onDelete 
}: CelebrityCardProps) => {
  return (
    <Card
      className={`overflow-hidden hover:shadow-2xl hover:shadow-primary/20 transition-all duration-300 hover:-translate-y-2 bg-card/80 backdrop-blur-sm animate-scale-in border-2 bg-gradient-to-b ${borderColor} p-[2px] relative group`}
      style={{ animationDelay: `${index * 0.05}s` }}
    >
      {isAdmin && (
        <Button
          size="sm"
          variant="destructive"
          className="absolute top-2 right-2 z-20 opacity-0 group-hover:opacity-100 transition-opacity"
          onClick={() => onDelete(celebrity.id)}
        >
          <Icon name="Trash2" size={14} />
        </Button>
      )}
      
      <div className="bg-card rounded-lg overflow-hidden h-full">
        <div className="relative h-64 overflow-hidden group">
          <img
            src={celebrity.imageUrl}
            alt={celebrity.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
          
          <Badge className={`absolute top-3 right-3 bg-gradient-to-r ${borderColor} text-white border-0 shadow-lg`}>
            {celebrity.category}
          </Badge>

          <div className="absolute top-3 left-3 flex items-center gap-2 text-white text-sm bg-black/50 backdrop-blur-sm px-2 py-1 rounded-md">
            <Icon name="Eye" size={14} />
            {celebrity.views}
          </div>

          <div className="absolute bottom-3 left-3 right-3">
            <h3 className="text-white font-bold text-lg mb-1">{celebrity.name}</h3>
            <p className="text-cyan-400 text-sm">{celebrity.username}</p>
          </div>
        </div>

        <div className="p-3">
          <Button
            size="sm"
            variant="outline"
            className="w-full border-pink-500/50 hover:bg-pink-500/10 hover:border-pink-500 group"
            onClick={() => onLike(celebrity.id)}
          >
            <Icon name="Heart" size={16} className="mr-2 group-hover:fill-pink-500 transition-all" />
            <span className="text-pink-500">{celebrity.likes}</span>
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default CelebrityCard;
