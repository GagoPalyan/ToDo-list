import { useState, useReducer } from "react";
import "./App.css";
import TodoForm from "./TodoForm";
import TodoList from "./TodoList";
import TodoFooter from "./TodoFooter";

// 1. datark enter vochmiban complated
// 2. text duble ylni chani
// 3. ptichken
// 4. yes / no
// 5. edit
// debugger;

function reducer(state, action) {
  if (action.type === "add") {
    if (action.payload.text.length !== 0) {
      return [
        ...state,
        {
          id: Math.random(),
          text: action.payload.text,
          isCompleted: false,
        },
      ];
    } else {
      return [...state];
    }
  } else if (action.type === "delete") {
    return state.filter((t) => t.id !== action.payload.id);
  } else if (action.type === "clear-completed") {
    return state.filter((todo) => !todo.isCompleted);
  } else if (action.type === "update") {
    return state.map((todo) => {
      if (todo.id === action.payload.updatedTodo.id) {
        return action.payload.updatedTodo;
      }
      return todo;
    });
  }
}

function App() {
  const [input, setInput] = useState("");
  const [todos, dispatch] = useReducer(reducer, [
    {
      id: Math.random(),
      text: "Learn JS",
      isCompleted: false,
    },
    {
      id: Math.random(),
      text: "Learn CSS",
      isCompleted: false,
    },
    {
      id: Math.random(),
      text: "Learn React",
      isCompleted: false,
    },
  ]);

  return (
    <div className="App">
      <header>
        <h1 className="todoAppTitle">todos</h1>
      </header>

      <TodoForm
        onAdd={(text) => {
          dispatch({
            type: "add",
            payload: {
              text: text,
            },
          });
        }}
      />
      <TodoList
        todos={todos}
        onDelete={(todo) => {
          dispatch({
            type: "delete",
            payload: {
              id: todo.id,
            },
          });
        }}
        onChange={(newTodo) => {
          dispatch({
            type: "update",
            payload: {
              updatedTodo: newTodo,
            },
          });
        }}
      />
      <TodoFooter
        todos={todos}
        onClearCompleted={() => {
          dispatch({
            type: "clear-completed",
          });
        }}
      />
    </div>
  );
}

export default App;
