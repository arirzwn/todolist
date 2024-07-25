import { useState } from "react";

const todoData = [
  { id: 1, activity: "Membaca", completed: false },
  { id: 2, activity: "Menulis jurnal", completed: false },
];

function App() {
  return (
    <>
      <div className=" mx-auto w-[390px] bg-slate-200 py-2">
        <TodoList />
      </div>
    </>
  );
}

function TodoList() {
  const [itemTodo, setItemTodo] = useState([]);
  const [complete, setComplete] = useState([]);

  function handleAddTask(item) {
    setItemTodo((itemTodo) => [...itemTodo, item]);
  }

  function handleToggleItem(id) {
    const item = itemTodo.find((item) => item.id === id);
    setComplete([...complete, { ...item, completed: true }]);
    setItemTodo(itemTodo.filter((item) => item.id !== id));
  }

  return (
    <>
      <Header />
      <AddTodo onAddTask={handleAddTask} />
      <Todo itemTodo={itemTodo} onToggle={handleToggleItem} />
      <Complete completedItems={complete} />
    </>
  );
}

function Header() {
  return (
    <>
      <h1 className="text-center font-semibold text-xl ">To Do App</h1>
    </>
  );
}

function AddTodo({ onAddTask }) {
  const [task, setTask] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    if (!task) return;

    const newTask = { activity: task, completed: false, id: Date.now() };

    onAddTask(newTask);
    setTask("");
  }

  return (
    <>
      <form
        className="mt-4 flex justify-center items-center relative"
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          name="tambah"
          className="p-2 focus:outline-0 rounded-sm placeholder:text-sm"
          placeholder="Tambah aktifitas"
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
        <button type="submit" className="flex items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="#52a7ff"
            className="h-9 w-9 absolute right-8"
          >
            <path
              fill-rule="evenodd"
              d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 9a.75.75 0 0 0-1.5 0v2.25H9a.75.75 0 0 0 0 1.5h2.25V15a.75.75 0 0 0 1.5 0v-2.25H15a.75.75 0 0 0 0-1.5h-2.25V9Z"
              clip-rule="evenodd"
            />
          </svg>
        </button>
      </form>
    </>
  );
}

function Todo({ itemTodo, onToggle }) {
  return (
    <>
      <div className="ml-[35px]">
        <h3 className=" mt-4 font-semibold ">To Do</h3>
        <ul>
          {itemTodo.map((item) => (
            <Item item={item} key={item.id} onToggle={onToggle} />
          ))}
        </ul>
      </div>
    </>
  );
}

function Item({ item, onToggle }) {
  return (
    <li key={item.id} className="flex justify-between mr-[35px] mb-1">
      <div className="">
        <input
          type="checkbox"
          value={item.completed}
          checked={item.completed}
          onChange={() => onToggle(item.id)}
          className="mr-2"
        />
        {item.activity}
      </div>
      <button className="text-sm">❌</button>
    </li>
  );
}

function Complete({ completedItems }) {
  return (
    <>
      <div className="ml-[35px]">
        <h3 className="mt-4 font-semibold">Complete</h3>
        <ul>
          {completedItems.map((item) => (
            <li key={item.id} className="flex justify-between mr-[35px] mb-1">
              <div>{item.activity}</div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default App;
