import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';

interface AuthDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  authData: {
    username: string;
    password: string;
  };
  onAuthDataChange: (data: { username: string; password: string }) => void;
  onLogin: () => void;
  onRegister: () => void;
}

const AuthDialog = ({ 
  isOpen, 
  onOpenChange, 
  authData, 
  onAuthDataChange, 
  onLogin, 
  onRegister 
}: AuthDialogProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:opacity-90 text-white border-0">
          <Icon name="User" size={18} className="mr-2" />
          Войти
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-card border-primary/30">
        <DialogHeader>
          <DialogTitle className="text-2xl bg-gradient-to-r from-fuchsia-500 to-purple-500 bg-clip-text text-transparent">
            Авторизация
          </DialogTitle>
        </DialogHeader>
        <Tabs defaultValue="login" className="mt-4">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Вход</TabsTrigger>
            <TabsTrigger value="register">Регистрация</TabsTrigger>
          </TabsList>
          <TabsContent value="login" className="space-y-4">
            <div>
              <Label htmlFor="login-username">Юзернейм</Label>
              <Input
                id="login-username"
                placeholder="@username"
                value={authData.username}
                onChange={(e) => onAuthDataChange({...authData, username: e.target.value})}
                className="bg-background/50 border-primary/30"
              />
            </div>
            <div>
              <Label htmlFor="login-password">Пароль</Label>
              <Input
                id="login-password"
                type="password"
                placeholder="••••••••"
                value={authData.password}
                onChange={(e) => onAuthDataChange({...authData, password: e.target.value})}
                className="bg-background/50 border-primary/30"
              />
            </div>
            <Button 
              onClick={onLogin}
              className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:opacity-90 text-white border-0"
            >
              Войти
            </Button>
          </TabsContent>
          <TabsContent value="register" className="space-y-4">
            <div>
              <Label htmlFor="register-username">Юзернейм</Label>
              <Input
                id="register-username"
                placeholder="@username"
                value={authData.username}
                onChange={(e) => onAuthDataChange({...authData, username: e.target.value})}
                className="bg-background/50 border-primary/30"
              />
            </div>
            <div>
              <Label htmlFor="register-password">Пароль</Label>
              <Input
                id="register-password"
                type="password"
                placeholder="••••••••"
                value={authData.password}
                onChange={(e) => onAuthDataChange({...authData, password: e.target.value})}
                className="bg-background/50 border-primary/30"
              />
            </div>
            <Button 
              onClick={onRegister}
              className="w-full bg-gradient-to-r from-fuchsia-600 to-purple-600 hover:opacity-90 text-white border-0"
            >
              Зарегистрироваться
            </Button>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default AuthDialog;
