import { useCallback, useState } from "react";
import "./todo-list.css";
import TodoCard from "./TodoCard";
function TodoList(props) {
  const [idDetail, setIdDetail] = useState();
  const [callback, setCallback] = useState(false);
  const [todoList, setTodoList] = useState(
    JSON.parse(localStorage.getItem("listTodo"))
  );
  console.log(todoList);
  const handleKeyDown = useCallback((event) => {
    setTodoList(JSON.parse(localStorage.getItem("listTodo")));
    if (event.key === "Enter") {
      console.log(typeof event.target.value);
      if (event.target.value == "") {
        setTodoList(JSON.parse(localStorage.getItem("listTodo")));
        return;
      } else {
        setTodoList(
          todoList.filter((todo) => todo.task_title == event.target.value)
        );
      }

      event.target.value = "";
    }
  });

  function handleCheckboxChange(e, itemId) {
    console.log("value of checkbox : ", e.target.checked);
    todoList.map((todo) => {
      if (todo.id == itemId) {
        todo.checked = e.target.checked;
      }
    });
    console.log(todoList);
  }
  console.log("render ");
  return (
    <>
      <header className="center-text">
        <h1>To Do List</h1>
      </header>
      <section className="section-margin">
        <input
          onKeyDown={handleKeyDown}
          className="new-todo input-todo-borderColor"
          placeholder="search..."
        ></input>
      </section>
      {todoList != null ? (
        todoList.map((item) => (
          <section>
            <ul
              role="list"
              className="todo-list stack-large stack-exception"
              aria-labelledby="list-heading"
            >
              <li className="todo stack-small">
                <div className="c-cb">
                  <input
                    id="todo-2"
                    type="checkbox"
                    onClick={(e) => handleCheckboxChange(e, item.id)}
                  />
                  <label className="todo-label" htmlFor="todo-2">
                    {item.task_title}
                  </label>
                </div>
                <div className="btn-group">
                  <button
                    type="button"
                    className="btn"
                    onClick={() => {
                      if (item.id == idDetail) {
                        setIdDetail("");
                      } else {
                        setIdDetail(item.id);
                      }
                    }}
                  >
                    Detail
                  </button>
                  <button
                    type="button"
                    className="btn btn__danger"
                    onClick={() => {
                      // setIdRemove(item.id);
                      console.log(item.id);
                      let newTodoList = todoList.filter(
                        (todo) => todo.id !== item.id
                      );

                      setTodoList(newTodoList);
                      localStorage.setItem(
                        "listTodo",
                        JSON.stringify(newTodoList)
                      );
                    }}
                  >
                    Remove
                  </button>
                </div>
              </li>
              {idDetail === item.id ? (
                <li className="border-only">
                  <div className="detail-todo">
                    <TodoCard
                      todoItem={item}
                      callback={() => setCallback(!callback)}
                      setTodoList={setTodoList}
                    />
                  </div>
                </li>
              ) : (
                <></>
              )}
            </ul>
          </section>
        ))
      ) : (
        <></>
      )}
      <footer className="footer ">
        <label className="bulk-label">Bulk Action</label>

        <div className="btn-group">
          <button type="button " className="btn btn_done">
            Done
          </button>
          <button
            type="button"
            className="btn btn__danger"
            onClick={() => {
              let newTodoList = todoList.filter(
                (todo) => todo.checked !== true
              );

              setTodoList(newTodoList);
              localStorage.setItem("listTodo", JSON.stringify(newTodoList));
            }}
          >
            Remove
          </button>
        </div>
      </footer>
    </>
  );
}
export default TodoList;
