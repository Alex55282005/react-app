import { Component, useEffect, useState } from "react";
import TodoItem from "./TodoItem";

import React from "react";

const axios = require("axios").default;

export default function TodoList() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState([]);


  useEffect(() => {
      axios.get("https://612687da3ab4100017a68fd8.mockapi.io/todos")
        .then((resp) => setTodos(resp.data));
  }, [])

  

  const onInputChange = (e) => {
    setTitle(e.target.value );
  }

  const onSubmitButtonClick =(e) =>{
    e.preventDefault();
    const newItem = {
      title: title,
      completed: false,
    };
    axios.post("https://612687da3ab4100017a68fd8.mockapi.io/todos", newItem
    ).then(({data}) =>
    setTodos((prevTodos) => [...prevTodos, data])
    );
      
  }

  const onItemClick =(id) =>{
    const item = todos.find((todo) => todo.id === id);
    const newItem = { ...item, completed: !item.completed };
    axios.put("https://612687da3ab4100017a68fd8.mockapi.io/todos" + "/" + id, newItem);
    setTodos(
      todos.map((item) => (item.id === id ? newItem : item)),
    );
  }

  const onDeleteButtonClick = (id) =>{
    fetch("https://612687da3ab4100017a68fd8.mockapi.io/todos" + "/" + id, {
      method: "DELETE",
    });
    const newTodos = todos.filter((todo) => todo.id !== id);
    setTodos(newTodos);
  }

  

  return (
    <>
      <ul>
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            item={todo}
            onDeleteButtonClick={onDeleteButtonClick}
            onItemClick={onItemClick}
          />
        ))}
      </ul>
      <form action="">
        <fieldset>
          <legend>Enter new todo</legend>
          <input
            type="text"
            value={title}
            onChange={onInputChange}
          />
          <button onClick={onSubmitButtonClick}>Add</button>
        </fieldset>
      </form>
    </>
  );
}



