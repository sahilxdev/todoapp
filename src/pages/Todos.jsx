import { ArrowUpCircle, ArrowUpNarrowWide, ArrowUpSquare, Check, Pencil, UserPen } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";

const detodos = [
  {
    todo: "Go to Gym",
    id: 1,
    done: false,
  },
  {
    todo: "Go to School",
    id: 2,
    done: false,
  },
];

const Todos = () => {
  const [todos, setTodos] = useState(detodos);
  const [editTodo, setEditTodo] = useState("");
  const [currTodo, setCurrTodo] = useState("");
  const [editValue, setEditValue] = useState("");

  const inputRef = useRef(null);

  useEffect(() => {
    if (editTodo !== "" && inputRef.current) {
      inputRef.current.focus();
    }
  }, [editTodo]);

  const handleDone = (index) => {
    const AllTodos = todos;
    AllTodos[index]["done"] = !AllTodos[index]["done"];
    const doneTodos = AllTodos.filter((ele) => ele.done == true);
    const unDoneTodos = AllTodos.filter((ele) => ele.done == false);
    setTodos([...unDoneTodos, ...doneTodos]);
  };

  const handleEditTodos = (id) => {
    setEditTodo(id);
    setEditValue(todos.filter((todo) => todo.id == id)[0].todo || "");
  };

  const handleEdit = (id, index) => {
    if (editValue === "") {
      setTodos(todos.filter((todo) => todo.id !== id));
      return;
    }
    const AllTodos = [...todos];
    AllTodos[index] = { ...AllTodos[index], todo: editValue };
    setTodos(AllTodos);
    setEditTodo("");
    setEditValue("");
  };

  const handleAddTodo = () => {
    if (currTodo != "") {
      const newTodo = {
        todo: currTodo,
        id: Math.round(Math.random() * 1000),
        done: false,
      };
      setTodos((e) => [newTodo, ...e]);
      setCurrTodo("");
    }
  };

  const handleRemove = (id) => {
    const filteredTodos = todos.filter((todo) => todo.id !== id);
    setTodos(filteredTodos);
  };

  return (
    <div className="bg-[#565151]">
      <h1 className="text-center pt-2 text-4xl">Todos</h1>
      <div className="flex justify-center gap-4 p-6">
        <input
          onChange={(e) => setCurrTodo(e.target.value)}
          onKeyDown={(e) => {
            e.key === "Enter" ? handleAddTodo() : "";
          }}
          value={currTodo}
          className="py-2 px-4 w-96 rounded  focus:outline-transparent text-black text-base font-medium"
          type="text"
        />
        <button
          onClick={() => handleAddTodo()}
          className="text-base font-medium p-2 rounded bg-green-500 hover:bg-green-600 text-black"
        >
          Add
        </button>
      </div>
      {todos.map((todos, index) => {
        return editTodo === todos.id ? (
          <div
            key={todos.id}
            className="flex justify-between items-center w-72 mx-auto pt-4 "
          >
            <input
              ref={inputRef}
              onChange={(e) => setEditValue(e.target.value)}
              onKeyDown={(e) => {
                e.key === "Enter" ? handleEdit(todos.id, index) : "";
              }}
              value={editValue}
              type="text"
              className="text-black"
            />
            <div className="flex gap-2">
              <button
                onClick={() => handleEdit(todos.id, index)}
                className="rounded-full bg-green-500 hover:bg-green-600 h-8 w-8 flex items-center justify-center"
              >
                <Check className="w-[15px]" />
              </button>
              <button
                onClick={() => setEditTodo("")}
                className="rounded-full bg-red-400 hover:bg-red-500 h-8 w-8"
              >
                X
              </button>
            </div>
          </div>
        ) : (
          <div
            key={todos.id}
            className="flex justify-between items-center w-72 mx-auto pt-4 "
          >
            <p
              className={`${
                todos.done ? "line-through text-red-300 text-[15px]" : ""
              } text-lg`}
            >
              {todos.todo}
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => handleEditTodos(todos.id)}
                className="rounded-full bg-blue-500 hover:bg-blue-600 h-8 w-8 flex items-center justify-center"
              >
                <Pencil className="w-[15px]" />
              </button>
              <button
                onClick={() => handleRemove(todos.id)}
                className="rounded-full bg-red-500 hover:bg-red-600 h-8 w-8"
              >
                X
              </button>
              {!todos?.done ? (
                <button
                  onClick={() => handleDone(index)}
                  className="flex items-center justify-center text-[20px] rounded-full bg-violet-500 hover:bg-violet-600 h-8 w-8"
                >
                  <Check />
                </button>
              ) : (
                <button
                  onClick={() => handleDone(index)}
                  className="flex items-center justify-center text-[20px] rounded-full bg-violet-500 hover:bg-violet-600 h-8 w-8"
                >
                  <ArrowUpCircle/>
                </button>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Todos;
