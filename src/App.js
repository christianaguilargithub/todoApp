import React, {useState, useEffect} from "react";

import Form from './components/Form';
import TodoList from "./components/TodoList";
import getLocalTodos from "./utils/api/todos";

import './App.css';

function App() {

  const[inputText, setInputText]= useState("");
  const[todos, setTodos] = useState([]);
  const [status, setStatus] = useState("all");
  const [filteredTodos, setFilteredTodos] = useState([]);
  useEffect(()=>{
    const todos = getLocalTodos();
    setTodos(todos);
  }, []);
   useEffect(
    () => {
       function filterHandler() {
         switch (status) {
           case 'completed':
             setFilteredTodos(todos.filter(todo => todo.completed === true));
             break;
           case 'uncompleted':
             setFilteredTodos(todos.filter(todo => todo.completed === false));
             break;
           default:
             setFilteredTodos(todos);
         }
       }
       filterHandler();
     },[todos,status]);

  return (
    <div className="App">
      <header>
        <h1>To Do List </h1>
      </header>
      <Form
         inputText={inputText}
         todos={todos}
         setTodos={setTodos}
         setInputText={setInputText}
         setStatus={setStatus}
      />
      <TodoList
          filteredTodos={filteredTodos}
          setTodos={setTodos}
          todos={todos}
      />
    </div>
  );
}

export default App;
