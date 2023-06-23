import logo from "./logo.svg";
import "./App.css";
import AddNewTask from "./Pages/add_new_task/AddNewTask";
import TodoList from "./Pages/todo_list/TodoList";
import NavigationBar from "./Component/Navigation/Navigation";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <NavigationBar />
      <Router>
        <div>
          <Routes>
            <Route path="/" element={<AddNewTask />} />
            <Route path="/todo-list" element={<TodoList />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
