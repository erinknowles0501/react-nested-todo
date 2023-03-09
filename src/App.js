import "./styles.css";
import TodoList from "./components/TodoList";
import { useState } from "react";

const defaultTasks = [
  {
    id: Date.now(),
    label: "Take out trash",
    complete: false
  },
  {
    id: Date.now() + 1,
    label: "Take out compost",
    complete: false,
    tasks: [
      {
        id: Date.now() + 2,
        label: "Transfer compost to bin",
        complete: false
      },
      {
        id: Date.now() + 3,
        label: "Dump in compost pile",
        complete: false
      },
      {
        id: Date.now() + 4,
        label: "Cover",
        complete: false
      }
    ]
  }
];

export default function App() {
  const [tasks, setTasks] = useState(defaultTasks);

  function updateTasks(updatedTasks) {
    console.log("app signalChange", updatedTasks);
    setTasks(updatedTasks);
  }

  return (
    <div className="App">
      <TodoList tasks={tasks} signalChange={updateTasks} />
    </div>
  );
}
