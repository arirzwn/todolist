import { useState } from "react"; // Mengimpor hook useState dari React

function App() {
  return (
    <>
      <div className="mx-auto w-[390px] bg-slate-200 py-2">
        <TodoList /> {/* Menampilkan komponen TodoList */}
      </div>
    </>
  );
}

function TodoList() {
  const [itemTodo, setItemTodo] = useState([]); // State untuk menyimpan daftar item todo
  const [complete, setComplete] = useState([]); // State untuk menyimpan daftar item yang telah selesai
  const [task, setTask] = useState(""); // State untuk menyimpan task baru

  function handleAddTask(item) {
    setItemTodo((itemTodo) => [...itemTodo, item]); // Menambahkan item baru ke array itemTodo
  }

  function handleTaskChange(newTask) {
    setTask(newTask); // Memperbarui state task
  }

  function handleToggleItem(id) {
    const item = itemTodo.find((item) => item.id === id); // Mencari item berdasarkan id
    setComplete([...complete, { ...item, completed: true }]); // Menambahkan item yang telah selesai ke array complete
    setItemTodo(itemTodo.filter((item) => item.id !== id)); // Menghapus item yang telah selesai dari array itemTodo
  }

  function handleDelete(id) {
    const updateTodo = itemTodo.filter((item) => item.id !== id); // Memperbarui array itemTodo dengan menghapus item yang memiliki id tertentu
    setItemTodo(updateTodo); // Menyimpan array itemTodo yang telah diperbarui
  }

  function handleClear() {
    setItemTodo([]); // Mengosongkan array itemTodo
    setComplete([]); // Mengosongkan array complete
  }

  return (
    <>
      <Header /> {/* Menampilkan komponen Header */}
      <AddTodo
        onAddTask={handleAddTask}
        task={task}
        onTaskChange={handleTaskChange}
      />{" "}
      {/* Menampilkan komponen AddTodo dan mengirimkan fungsi handleAddTask sebagai prop */}
      <Todo
        itemTodo={itemTodo}
        onToggle={handleToggleItem}
        onDelete={handleDelete}
      />{" "}
      {/* Menampilkan komponen Todo dan mengirimkan state dan fungsi terkait sebagai prop */}
      <Complete completedItems={complete} />{" "}
      {/* Menampilkan komponen Complete dan mengirimkan state complete sebagai prop */}
      <ButtonClear onClear={handleClear} />{" "}
      {/* Menampilkan komponen ButtonClear dan mengirimkan fungsi handleClear sebagai prop */}
    </>
  );
}

function Header() {
  return (
    <h1 className="text-center font-semibold text-xl">To Do App</h1> // Menampilkan judul aplikasi
  );
}

function AddTodo({ onAddTask, task, onTaskChange }) {
  function handleSubmit(e) {
    e.preventDefault(); // Mencegah perilaku default form

    if (!task) return; // Jika task kosong, tidak melakukan apa-apa

    const newTask = { activity: task, completed: false, id: Date.now() }; // Membuat task baru

    onAddTask(newTask); // Menambahkan task baru ke daftar todo
    onTaskChange(""); // Mengosongkan input task
  }

  return (
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
        onChange={(e) => onTaskChange(e.target.value)} // Memperbarui state task saat input berubah
      />
      <button type="submit" className="flex items-center justify-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="#52a7ff"
          className="h-9 w-9 absolute right-8"
        >
          <path
            fillRule="evenodd"
            d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 9a.75.75 0 0 0-1.5 0v2.25H9a.75.75 0 0 0 0 1.5h2.25V15a.75.75 0 0 0 1.5 0v-2.25H15a.75.75 0 0 0 0-1.5h-2.25V9Z"
            clipRule="evenodd"
          />
        </svg>
      </button>
    </form>
  );
}

function Todo({ itemTodo, onToggle, onDelete }) {
  return (
    <div className="ml-[35px]">
      <h3 className="mt-4 font-semibold">To Do</h3>
      <ul>
        {itemTodo.map((item) => (
          <Item
            item={item}
            key={item.id}
            onToggle={onToggle}
            onDelete={onDelete}
          /> // Menampilkan komponen Item untuk setiap item dalam itemTodo
        ))}
      </ul>
    </div>
  );
}

function Item({ item, onToggle, onDelete }) {
  return (
    <li className="text-sm flex items-center justify-between mr-[35px]">
      <div className="flex items-center">
        <input
          type="checkbox"
          value={item.completed}
          checked={item.completed}
          onChange={() => onToggle(item.id)} // Menandai item sebagai selesai saat checkbox berubah
          className="mr-2"
        />
        <span>{item.activity}</span>
      </div>
      <button
        className="text-3xl text-red-800"
        onClick={() => onDelete(item.id)}
      >
        &times; {/* Tombol untuk menghapus item */}
      </button>
    </li>
  );
}

function Complete({ completedItems }) {
  return (
    <div className="ml-[35px]">
      <h3 className="mt-4 font-semibold">Complete</h3>
      <ul>
        {completedItems.map((item) => (
          <li key={item.id} className="flex justify-between mr-[35px] mb-1">
            <span className="line-through text-sm">{item.activity}</span>{" "}
            {/* Menampilkan item yang telah selesai */}
          </li>
        ))}
      </ul>
    </div>
  );
}

function ButtonClear({ onClear }) {
  return (
    <div className="text-center my-2">
      <button
        className="bg-blue-300 p-1.5 text-sm rounded-full font-semibold"
        onClick={onClear}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="size-5"
        >
          <path
            fillRule="evenodd"
            d="M8.75 1A2.75 2.75 0 0 0 6 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 1 0 .23 1.482l.149-.022.841 10.518A2.75 2.75 0 0 0 7.596 19h4.807a2.75 2.75 0 0 0 2.742-2.53l.841-10.52.149.023a.75.75 0 0 0 .23-1.482A41.03 41.03 0 0 0 14 4.193V3.75A2.75 2.75 0 0 0 11.25 1h-2.5ZM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4ZM8.58 7.72a.75.75 0 0 0-1.5.06l.3 7.5a.75.75 0 1 0 1.5-.06l-.3-7.5Zm4.34.06a.75.75 0 1 0-1.5-.06l-.3 7.5a.75.75 0 1 0 1.5.06l.3-7.5Z"
            clipRule="evenodd"
          />
        </svg>
      </button>
    </div>
  );
}

export default App; // Mengekspor komponen App sebagai komponen default
