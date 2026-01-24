import { Search, FileQuestion, Inbox } from 'lucide-react';
import { Button } from './Button';

export interface EmptyStateProps {
  icon?: 'search' | 'file' | 'inbox';
  title: string;
  description?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export function EmptyState({ icon = 'inbox', title, description, action }: EmptyStateProps) {
  const icons = {
    search: Search,
    file: FileQuestion,
    inbox: Inbox,
  };

  const Icon = icons[icon];

  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
      <div className="w-16 h-16 rounded-full bg-cosmos-card border border-cosmos-border flex items-center justify-center mb-4">
        <Icon className="w-8 h-8 text-gray-500" />
      </div>
      <h3 className="text-lg font-medium text-white mb-2">{title}</h3>
      {description && (
        <p className="text-gray-400 text-sm max-w-md mb-4">{description}</p>
      )}
      {action && (
        <Button variant="secondary" onClick={action.onClick}>
          {action.label}
        </Button>
      )}
    </div>
  );
}
