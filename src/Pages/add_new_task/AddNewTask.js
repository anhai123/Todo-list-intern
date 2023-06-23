import { useCallback, useState } from "react";
import "./add-new-task.css";
import { useForm } from "react-hook-form";
const moment = require("moment");
function AddNewTask(props) {
  const [day, setDay] = useState(new Date().toISOString().slice(0, -14));
  const [priority, setPriority] = useState("normal");

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
      <header className="center-text">
        <h1>New Task</h1>
      </header>

      <form
        onSubmit={handleSubmit((data) => {
          // console.log(data);
          data.id = stringGenRandomId(8);
          // data.checked = false;
          let listItem = [data];

          // console.log(listItem);
          if (JSON.parse(localStorage.getItem("listTodo")) != null) {
            listItem = [
              ...JSON.parse(localStorage.getItem("listTodo")),
              ...listItem,
            ];
            sortByDate(listItem);
          }
          localStorage.setItem("listTodo", JSON.stringify(listItem));
          setPriority("normal");
        })}
      >
        <section className="section-margin">
          <input
            className="new-todo input-todo-borderColor"
            placeholder="Add new task..."
            {...register("task_title", { required: true })}
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
            {...register("task_description")}
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
        <button type="submit" className="button full-width">
          Add
        </button>
      </form>
    </>
  );
}
export default AddNewTask;
