import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

interface EmptyStateProps {
  isAdmin: boolean;
  onAddClick: () => void;
}

const EmptyState = ({ isAdmin, onAddClick }: EmptyStateProps) => {
  return (
    <div className="text-center py-20 animate-fade-in">
      <Icon name="Users" className="mx-auto mb-4 text-muted-foreground" size={64} />
      <h3 className="text-2xl font-bold mb-2 text-foreground">Список пуст</h3>
      <p className="text-muted-foreground mb-6">
        {isAdmin ? 'Начните добавлять участников в свой фейм-лист' : 'Пока нет участников в списке'}
      </p>
      {isAdmin && (
        <Button 
          onClick={onAddClick}
          className="bg-gradient-to-r from-fuchsia-600 to-purple-600 hover:opacity-90 text-white border-0"
        >
          <Icon name="Plus" size={18} className="mr-2" />
          Добавить первого участника
        </Button>
      )}
    </div>
  );
};

export default EmptyState;
