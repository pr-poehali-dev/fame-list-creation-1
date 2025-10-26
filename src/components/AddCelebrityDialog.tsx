import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Icon from '@/components/ui/icon';

interface AddCelebrityDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  newCeleb: {
    name: string;
    username: string;
    category: string;
    imageUrl: string;
  };
  onNewCelebChange: (celeb: { name: string; username: string; category: string; imageUrl: string }) => void;
  onAdd: () => void;
  categories: string[];
}

const AddCelebrityDialog = ({ 
  isOpen, 
  onOpenChange, 
  newCeleb, 
  onNewCelebChange, 
  onAdd, 
  categories 
}: AddCelebrityDialogProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
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
              onChange={(e) => onNewCelebChange({...newCeleb, name: e.target.value})}
              className="bg-background/50 border-primary/30"
            />
          </div>
          <div>
            <Label htmlFor="username">Юзернейм</Label>
            <Input
              id="username"
              placeholder="@username"
              value={newCeleb.username}
              onChange={(e) => onNewCelebChange({...newCeleb, username: e.target.value})}
              className="bg-background/50 border-primary/30"
            />
          </div>
          <div>
            <Label htmlFor="category">Категория</Label>
            <Select value={newCeleb.category} onValueChange={(value) => onNewCelebChange({...newCeleb, category: value})}>
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
              onChange={(e) => onNewCelebChange({...newCeleb, imageUrl: e.target.value})}
              className="bg-background/50 border-primary/30"
            />
          </div>
          <Button 
            onClick={onAdd}
            className="w-full bg-gradient-to-r from-fuchsia-600 to-purple-600 hover:opacity-90 text-white border-0"
          >
            Добавить
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddCelebrityDialog;
