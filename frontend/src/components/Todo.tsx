import { useState } from 'react';
import { Button } from './ui/Button';
import { Input } from './ui/Input';

interface TodoProps {
  id: number;
  title: string;
  description?: string;
  isCompleted: boolean;
  onToggleComplete: (id: number) => void;
  onUpdate: (id: number, title: string, description?: string) => void;
  onDelete: (id: number) => void;
}

export const Todo = ({
  id,
  title,
  description,
  isCompleted,
  onToggleComplete,
  onUpdate,
  onDelete,
}: TodoProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(title);
  const [editDescription, setEditDescription] = useState(description || '');

  const handleUpdate = () => {
    onUpdate(id, editTitle, editDescription);
    setIsEditing(false);
  };

  return (
    <div className="border border-gray-200 rounded-md p-4 mb-4 bg-white dark:bg-slate-800 dark:border-slate-700 shadow-sm">
      {isEditing ? (
        <div className="space-y-3">
          <Input
            type="text"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            placeholder="Todo title"
            className="w-full"
          />
          <Input
            type="text"
            value={editDescription}
            onChange={(e) => setEditDescription(e.target.value)}
            placeholder="Description (optional)"
            className="w-full"
          />
          <div className="flex space-x-2">
            <Button onClick={handleUpdate} disabled={!editTitle.trim()}>
              Save
            </Button>
            <Button variant="ghost" onClick={() => setIsEditing(false)}>
              Cancel
            </Button>
          </div>
        </div>
      ) : (
        <div>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={isCompleted}
                onChange={() => onToggleComplete(id)}
                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-600"
              />
              <h3
                className={`text-lg font-medium ${
                  isCompleted ? 'line-through text-gray-500' : ''
                }`}
              >
                {title}
              </h3>
            </div>
            <div className="flex space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsEditing(true)}
              >
                Edit
              </Button>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => onDelete(id)}
              >
                Delete
              </Button>
            </div>
          </div>
          {description && (
            <p className="mt-2 text-gray-600 dark:text-gray-300 pl-6">
              {description}
            </p>
          )}
        </div>
      )}
    </div>
  );
};
