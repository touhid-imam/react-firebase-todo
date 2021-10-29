import React, { Fragment, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import clock from "./images/clock.jpg";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/font-awesome/css/font-awesome.min.css";
import "./App.css";
import NavBar from "./components/navBar";
import Todos from "./components/todos";
import { dataStore } from "./firebase";
import {
  collection,
  getDocs,
  addDoc,
  doc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import TodoForm from "./components/todoForm";

function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");
  const [currentTodo, setCurrentTodo] = useState({});
  const [loading, setLoading] = useState(true);
  const todosCollectionRef = collection(dataStore, "todos");

  useEffect(() => {
    const getTodos = async () => {
      const data = await getDocs(todosCollectionRef);
      const todoDocs = data.docs.map((doc) => {
        return { ...doc.data(), id: doc.id };
      });
      setTodos(todoDocs);
      if (todos.length >= 0) setLoading(false);
    };
    getTodos();
  }, [todosCollectionRef, todos]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input) {
      return true;
    }
    await addDoc(todosCollectionRef, { text: input, close: false });
    setInput("");
  };

  const handleEditClick = (todo) => {
    setCurrentTodo({ ...todo });
  };

  const handleEditForm = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (currentTodo.text.length !== 0) {
      const todoDoc = doc(dataStore, "todos", currentTodo.id);
      if (todoDoc.id) {
        updateDoc(todoDoc, currentTodo);
        setLoading(false);
      }

      setCurrentTodo({});
    } else {
      alert("Updated Text Should not be empty!");
    }
  };

  const editChange = (e) => {
    setCurrentTodo({ ...currentTodo, text: e.target.value });
  };

  const handleClose = async (todo) => {
    const todoDoc = doc(dataStore, "todos", todo.id);
    const updatedItem = { ...todo, close: !todo.close };
    await updateDoc(todoDoc, updatedItem);
    setCurrentTodo({});
  };
  const handleDelete = async (todoItem) => {
    const deleteItem = doc(dataStore, "todos", todoItem.id);
    await deleteDoc(deleteItem);
  };

  return (
    <Fragment>
      <NavBar />
      <div className="todo-app pt-5">
        <div className="container">
          <div className="row">
            <TodoForm
              clock={clock}
              onSubmit={handleSubmit}
              input={input}
              onInput={setInput}
            />
            <Todos
              todos={todos}
              onEditForm={handleEditForm}
              onEditChange={editChange}
              onClose={handleClose}
              editForm={currentTodo}
              onEditClick={handleEditClick}
              onDelete={handleDelete}
              loading={loading}
            />
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default App;
