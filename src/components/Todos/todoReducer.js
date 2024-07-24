// Constants
export const ACTIONS = {
  ADD_TODO: "ADD_TODO",
  TOGGLE_TODO: "TOGGLE_TODO",
  EDIT_TODO: "EDIT_TODO",
  REMOVE_TODO: "REMOVE_TODO",
};

// Initial state
export const initialTodos = [
  { id: 1, todo: "Go to Gym", done: false },
  { id: 2, todo: "Go to School", done: false },
];

// Reducer function
export function todoReducer(state, action) {
  switch (action.type) {
    case ACTIONS.ADD_TODO:
      return [{ id: Date.now(), todo: action.payload, done: false }, ...state];
    case ACTIONS.TOGGLE_TODO:
      return state.map((todo) =>
        todo.id === action.payload ? { ...todo, done: !todo.done } : todo
      );
    case ACTIONS.EDIT_TODO:
      return state.map((todo) =>
        todo.id === action.payload.id
          ? { ...todo, todo: action.payload.todo }
          : todo
      );
    case ACTIONS.REMOVE_TODO:
      return state.filter((todo) => todo.id !== action.payload);
    default:
      return state;
  }
}
