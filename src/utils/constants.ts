export const ADMIN_USERNAME = '@miynp';

export const categories = ['Все', 'главный фейм', 'фейм', 'средний фейм', 'малый фейм', 'новичок', 'скамер'];

export const categoryColors: Record<string, string> = {
  'главный фейм': 'from-fuchsia-500 to-pink-500',
  'фейм': 'from-purple-500 to-violet-500',
  'средний фейм': 'from-cyan-500 to-blue-500',
  'малый фейм': 'from-blue-400 to-cyan-400',
  'новичок': 'from-gray-500 to-gray-600',
  'скамер': 'from-red-500 to-pink-600',
};

export interface Celebrity {
  id: number;
  name: string;
  username: string;
  category: string;
  views: number;
  likes: number;
  imageUrl: string;
}

export interface User {
  username: string;
  password: string;
}
