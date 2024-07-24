import { useReducer, useMemo, useCallback } from 'react';
import TodoInput from './TodoInput';
import TodoItem from './TodoItem';
import { todoReducer, ACTIONS, initialTodos } from './todoReducer';

const Todos = () => {
  const [todos, dispatch] = useReducer(todoReducer, initialTodos);

  const sortedTodos = useMemo(() => {
    const undoneTodos = todos.filter(todo => !todo.done);
    const doneTodos = todos.filter(todo => todo.done);
    return [...undoneTodos, ...doneTodos];
  }, [todos]);

  const handleAddTodo = useCallback((todo) => {
    dispatch({ type: ACTIONS.ADD_TODO, payload: todo });
  }, []);

  const handleToggleTodo = useCallback((id) => {
    dispatch({ type: ACTIONS.TOGGLE_TODO, payload: id });
  }, []);

  const handleEditTodo = useCallback((id, newTodo) => {
    dispatch({ type: ACTIONS.EDIT_TODO, payload: { id, todo: newTodo } });
  }, []);

  const handleRemoveTodo = useCallback((id) => {
    dispatch({ type: ACTIONS.REMOVE_TODO, payload: id });
  }, []);

  return (
    <div className="bg-[#565151] min-h-screen text-white">
      <h1 className="text-center pt-8 pb-4 text-4xl font-bold">Todos</h1>
      <TodoInput onAddTodo={handleAddTodo} />
      {sortedTodos.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={handleToggleTodo}
          onEdit={handleEditTodo}
          onRemove={handleRemoveTodo}
        />
      ))}
    </div>
  );
};

export default Todos;
