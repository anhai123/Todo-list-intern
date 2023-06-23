import "./navigation.css";

function NavigationBar() {
  const addItemClass = window.location.pathname === "/" ? "active" : "";
  const listTodoClass = window.location.pathname.match(/^\/todo-list/)
    ? "active"
    : "";

  return (
    <div className="topnav">
      <a className={addItemClass} href="/">
        Add To Do
      </a>
      <a className={listTodoClass} href="/todo-list">
        List To Do
      </a>
    </div>
  );
}

export default NavigationBar;
