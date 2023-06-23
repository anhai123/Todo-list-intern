import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import "./todo-list.css";
const moment = require("moment");
function TodoCard(props) {
  const [todoItem, setTodoItem] = useState(props.todoItem);
  const [day, setDay] = useState(props.todoItem.due_date);
  const [priority, setPriority] = useState(props.todoItem.priority);
  const [description, setDescription] = useState(props.todoItem.description);
  const [task_title, setTaskTitle] = useState(props.todoItem.task_title);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  function stringGenRandomId(number) {
    var text = "";
    var possible =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < number; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
  }
  function sortByDate(listItemTodo) {
    listItemTodo.sort((a, b) => {
      if (a.due_date < b.due_date) return -1;

      if (a.due_date > b.due_date) return 1;

      if (a.due_date == b.due_date) {
        return 0;
      }
    });
  }
  const onChangeDate = (e) => {
    const newDate = moment(new Date(e.target.value)).format("YYYY-MM-DD");
    setDay(newDate);
    console.log(newDate); //value picked from date picker
  };

  const onChangePriority = (e) => {
    setPriority(e.target.value);
  };

  return (
    <>
      <form
        onSubmit={handleSubmit((data) => {
          console.log(data);
          // data.id = stringGenRandomId(8);

          let todoList = JSON.parse(localStorage.getItem("listTodo"));
          var newTodoItem;
          let newListTodo = todoList.map((todo, index) => {
            if (todo.id == todoItem.id) {
              let todo1 = {
                ...todoItem,
                ...data,
              };
              newTodoItem = todo1;
              // console.log(data);
              // console.log("he", todoItem);
              return todo1;
            }
            return todo;
          });

          sortByDate(newListTodo);
          console.log(newListTodo);
          localStorage.setItem("listTodo", JSON.stringify(newListTodo));
          setTodoItem(newTodoItem);
          props.setTodoList(newListTodo);
        })}
      >
        <section className="section-margin">
          <input
            className="new-todo input-todo-borderColor"
            placeholder="Add new task..."
            value={task_title}
            {...register("task_title", { required: true })}
            onChange={(e) => {
              setTaskTitle(e.target.value);
            }}
          />
          {errors.task_title && (
            <p className="red-text">Task title is required.</p>
          )}
        </section>
        <section className="section-margin">
          <label htmlFor="description" className="bold">
            Description
          </label>
          <br></br>
          <textarea
            id="description"
            name="description"
            className="item-margin"
            rows="15"
            cols="50"
            value={description}
            {...register("task_description")}
            onChange={(e) => {
              setDescription(e.target.value);
            }}
          />
        </section>
        <section className="section-margin">
          <table className="full-width">
            <tr>
              <th>
                <label htmlFor="due_date" className="bold padding-right ">
                  Due Date
                </label>
              </th>
              <label htmlFor="priority" className="bold padding-left">
                Priority
              </label>
            </tr>
            <tbody>
              <tr>
                <td className="padding-right ">
                  <input
                    className="padding-item margin-top"
                    type="date"
                    id="due_date"
                    name="due_date"
                    value={day}
                    min={new Date().toISOString().slice(0, -14)}
                    {...register("due_date")}
                    onChange={onChangeDate}
                  />
                </td>
                <td className="padding-left">
                  <select
                    className="padding-item margin-top"
                    value={priority}
                    {...register("priority")}
                    onChange={onChangePriority}
                  >
                    <option value="low">Low</option>
                    <option value="normal">Normal</option>
                    <option value="high">High</option>
                  </select>
                </td>
              </tr>
            </tbody>
          </table>
        </section>
        <button type="submit" class="button full-width">
          Update
        </button>
      </form>
    </>
  );
}
export default TodoCard;
