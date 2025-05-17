import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { TodoList } from '../TodoList';

describe('TodoList Component', () => {
  it('renders the todo list with empty state', () => {
    render(<TodoList />);

    expect(screen.getByText('Todo App')).toBeDefined();
    expect(screen.getByText('Add New Todo')).toBeDefined();
    expect(screen.getByText('Your Todos')).toBeDefined();
    expect(screen.getByText('No todos yet. Add one above!')).toBeDefined();
  });

  it('allows adding a new todo', () => {
    render(<TodoList />);

    // Fill in the form
    const titleInput = screen.getByPlaceholderText(
      'Todo title'
    ) as HTMLInputElement;
    const descInput = screen.getByPlaceholderText(
      'Description (optional)'
    ) as HTMLInputElement;

    fireEvent.change(titleInput, { target: { value: 'New Test Todo' } });
    fireEvent.change(descInput, { target: { value: 'New Test Description' } });

    // Submit the form
    fireEvent.click(screen.getByText('Add Todo'));

    // Check if the todo was added
    expect(screen.getByText('New Test Todo')).toBeDefined();
    expect(screen.getByText('New Test Description')).toBeDefined();

    // Form should be cleared
    expect(titleInput.value).toBe('');
    expect(descInput.value).toBe('');
  });

  it('allows toggling todo completion', async () => {
    render(<TodoList />);

    // Add a todo first
    const titleInput = screen.getByPlaceholderText('Todo title');
    fireEvent.change(titleInput, { target: { value: 'Toggle Test Todo' } });
    fireEvent.click(screen.getByText('Add Todo'));

    // Find the checkbox and toggle it
    const checkbox = screen.getByRole('checkbox') as HTMLInputElement;
    expect(checkbox.checked).toBe(false);

    fireEvent.click(checkbox);
    expect(checkbox.checked).toBe(true);

    // Title should have line-through style
    const titleElement = screen.getByText('Toggle Test Todo');
    expect(titleElement.className).toContain('line-through');
  });

  it('allows editing a todo', () => {
    render(<TodoList />);

    // Add a todo first
    const titleInput = screen.getByPlaceholderText('Todo title');
    fireEvent.change(titleInput, { target: { value: 'Original Todo' } });
    fireEvent.click(screen.getByText('Add Todo'));

    // Click edit button
    fireEvent.click(screen.getByText('Edit'));

    // Change the title
    const editTitleInput = screen.getByDisplayValue('Original Todo');
    fireEvent.change(editTitleInput, { target: { value: 'Updated Todo' } });

    // Save changes
    fireEvent.click(screen.getByText('Save'));

    // Check if the todo was updated
    expect(screen.getByText('Updated Todo')).toBeDefined();
    expect(screen.queryByText('Original Todo')).toBeNull();
  });

  it('allows deleting a todo', () => {
    render(<TodoList />);

    // Add a todo first
    const titleInput = screen.getByPlaceholderText('Todo title');
    fireEvent.change(titleInput, { target: { value: 'Todo to Delete' } });
    fireEvent.click(screen.getByText('Add Todo'));

    // Verify todo exists
    expect(screen.getByText('Todo to Delete')).toBeDefined();

    // Delete the todo
    fireEvent.click(screen.getByText('Delete'));

    // Todo should be gone, and we should see the empty state message
    expect(screen.queryByText('Todo to Delete')).toBeNull();
    expect(screen.getByText('No todos yet. Add one above!')).toBeDefined();
  });
});
