import { useState } from "react";

export default function InsertTodo({ addTask }) {
  const [newTask, setNewTask] = useState("");

  function handleKeyDown(event) {
    if (event.key === "Enter" && newTask !== "") {
      addTask({
        label: newTask,
        complete: false,
        id: Date.now()
      });
      setNewTask("");
    }
  }

  return (
    <input
      className="addTodo"
      type="text"
      value={newTask}
      onChange={(event) => setNewTask(event.target.value)}
      onKeyDown={(event) => handleKeyDown(event)}
    />
  );
}
