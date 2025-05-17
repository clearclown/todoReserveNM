import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Todo } from '../Todo';

describe('Todo Component', () => {
  const mockProps = {
    id: 1,
    title: 'Test Todo',
    description: 'Test Description',
    isCompleted: false,
    onToggleComplete: vi.fn(),
    onUpdate: vi.fn(),
    onDelete: vi.fn(),
  };

  it('renders todo item correctly', () => {
    render(<Todo {...mockProps} />);

    expect(screen.getByText('Test Todo')).toBeDefined();
    expect(screen.getByText('Test Description')).toBeDefined();
    expect((screen.getByRole('checkbox') as HTMLInputElement).checked).toBe(
      false
    );
  });

  it('calls onToggleComplete when checkbox is clicked', () => {
    render(<Todo {...mockProps} />);

    fireEvent.click(screen.getByRole('checkbox'));
    expect(mockProps.onToggleComplete).toHaveBeenCalledWith(1);
  });

  it('shows edit form when edit button is clicked', () => {
    render(<Todo {...mockProps} />);

    fireEvent.click(screen.getByText('Edit'));

    expect(screen.getByDisplayValue('Test Todo')).toBeDefined();
    expect(screen.getByDisplayValue('Test Description')).toBeDefined();
    expect(screen.getByText('Save')).toBeDefined();
    expect(screen.getByText('Cancel')).toBeDefined();
  });

  it('calls onUpdate with new values when save button is clicked', () => {
    render(<Todo {...mockProps} />);

    // Enter edit mode
    fireEvent.click(screen.getByText('Edit'));

    // Change the title
    const titleInput = screen.getByDisplayValue('Test Todo');
    fireEvent.change(titleInput, { target: { value: 'Updated Todo' } });

    // Save changes
    fireEvent.click(screen.getByText('Save'));

    expect(mockProps.onUpdate).toHaveBeenCalledWith(
      1,
      'Updated Todo',
      'Test Description'
    );
  });

  it('calls onDelete when delete button is clicked', () => {
    render(<Todo {...mockProps} />);

    fireEvent.click(screen.getByText('Delete'));
    expect(mockProps.onDelete).toHaveBeenCalledWith(1);
  });

  it('renders completed todo with line-through style', () => {
    render(<Todo {...mockProps} isCompleted={true} />);

    const titleElement = screen.getByText('Test Todo');
    expect(titleElement.className).toContain('line-through');
    expect((screen.getByRole('checkbox') as HTMLInputElement).checked).toBe(
      true
    );
  });
});
