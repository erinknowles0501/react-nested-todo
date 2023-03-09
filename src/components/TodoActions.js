import { MdClose, MdEdit, MdAdd } from "react-icons/md";

export default function TodoActions({
  task,
  setIsEditing,
  updateTask,
  removeTask
}) {
  return (
    <div className="actions">
      <MdEdit className="icon" onClick={() => setIsEditing(true)} />
      <MdAdd className="icon" onClick={() => updateTask(task, { tasks: [] })} />

      <MdClose className="icon remove" onClick={() => removeTask(task)} />
    </div>
  );
}
