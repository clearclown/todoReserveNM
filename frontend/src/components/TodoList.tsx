import { useState } from 'react';
import { Todo } from './Todo';
import { Button } from './ui/Button';
import { Input } from './ui/Input';

interface TodoItem {
  id: number;
  title: string;
  description?: string;
  isCompleted: boolean;
}

// Define API base URL - in production mode, this will be used
// to connect to the backend service through the Nginx proxy
const API_URL = '/api';

export const TodoList = () => {
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [newTodoTitle, setNewTodoTitle] = useState('');
  const [newTodoDescription, setNewTodoDescription] = useState('');

  const addTodo = () => {
    if (!newTodoTitle.trim()) return;

    const newTodo: TodoItem = {
      id: Date.now(),
      title: newTodoTitle,
      description: newTodoDescription || undefined,
      isCompleted: false,
    };

    setTodos([...todos, newTodo]);
    setNewTodoTitle('');
    setNewTodoDescription('');

    // In a real implementation, we would call the API
    // fetch(`${API_URL}/todos`, {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ title: newTodoTitle, description: newTodoDescription })
    // });
  };

  const toggleComplete = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo
      )
    );

    // In a real implementation, we would call the API
    // fetch(`${API_URL}/todos/${id}/complete`, {
    //   method: 'PATCH'
    // });
  };

  const updateTodo = (id: number, title: string, description?: string) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, title, description } : todo
      )
    );

    // In a real implementation, we would call the API
    // fetch(`${API_URL}/todos/${id}`, {
    //   method: 'PUT',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ title, description })
    // });
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));

    // In a real implementation, we would call the API
    // fetch(`${API_URL}/todos/${id}`, {
    //   method: 'DELETE'
    // });
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6 text-center">Todo App</h1>

      <div className="mb-8 p-4 bg-gray-50 dark:bg-slate-900 rounded-md shadow-sm">
        <h2 className="text-lg font-semibold mb-3">Add New Todo</h2>
        <div className="space-y-3">
          <Input
            type="text"
            value={newTodoTitle}
            onChange={(e) => setNewTodoTitle(e.target.value)}
            placeholder="Todo title"
            className="w-full"
          />
          <Input
            type="text"
            value={newTodoDescription}
            onChange={(e) => setNewTodoDescription(e.target.value)}
            placeholder="Description (optional)"
            className="w-full"
          />
          <Button onClick={addTodo} disabled={!newTodoTitle.trim()}>
            Add Todo
          </Button>
        </div>
      </div>

      <div>
        <h2 className="text-lg font-semibold mb-3">Your Todos</h2>
        {todos.length === 0 ? (
          <p className="text-gray-500 text-center py-4">
            No todos yet. Add one above!
          </p>
        ) : (
          todos.map((todo) => (
            <Todo
              key={todo.id}
              id={todo.id}
              title={todo.title}
              description={todo.description}
              isCompleted={todo.isCompleted}
              onToggleComplete={toggleComplete}
              onUpdate={updateTodo}
              onDelete={deleteTodo}
            />
          ))
        )}
      </div>
    </div>
  );
};
