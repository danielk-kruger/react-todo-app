import React, { useState, useEffect } from 'react';
import './App.css';

// Import components
import Form from './components/Form';
import TodoList from './components/TodoList';

function App() {
  // State setups
  const [inputText, setInputText] = useState('');
  const [todos, setTodos] = useState([]);
  const [status, setStatus] = useState('all');
  const [filteredTodos, setFilteredTodos] = useState([]);

  // RUN ONCE THE APP STARTS
  useEffect(() => {
    if (localStorage.getItem('todos') === null) {
      localStorage.setItem('todos', JSON.stringify([]));
    } else {
      let todoStorage = JSON.parse(localStorage.getItem('todos'));
      setTodos(todoStorage);
    }
  }, []);

  // useEffect -> run a function whenever a specified state changes
  useEffect(() => {
    switch (status) {
      case 'completed':
        setFilteredTodos(todos.filter((todo) => todo.completed === true));
        break;
      case 'uncompleted':
        setFilteredTodos(todos.filter((todo) => todo.completed === false));
        break;
      default:
        setFilteredTodos(todos);
        break;
    }
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos, status]);

  return (
    <div className='App'>
      <header>
        <h1>Daniel's Todo List</h1>
      </header>
      <Form
        todos={todos}
        setTodos={setTodos}
        setInputText={setInputText}
        inputText={inputText}
        setStatus={setStatus}
      />
      <TodoList setTodos={setTodos} todos={todos} filteredTodos={filteredTodos} />
    </div>
  );
}

export default App;
