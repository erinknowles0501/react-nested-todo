import { MdClose, MdEdit, MdAdd, MdRemove } from "react-icons/md";

export default function TodoActions({
    task,
    setIsEditing,
    createNest,
    removeNest,
    removeTask,
}) {
    return (
        <div className="actions">
            <MdEdit className="icon" onClick={() => setIsEditing(true)} />
            {!task.tasks ? (
                <MdAdd className="icon" onClick={() => createNest(task)} />
            ) : (
                <MdRemove className="icon" onClick={() => removeNest(task)} />
            )}
            <MdClose className="icon remove" onClick={() => removeTask(task)} />
        </div>
    );
}
