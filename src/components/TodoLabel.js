import { MdCheck, MdUndo } from "react-icons/md";
import { useState } from "react";

export default function TodoLabel({
    task,
    signalChange,
    isEditing,
    setIsEditing,
    setSignalIncomplete,
    freezeCompleted,
}) {
    const [newLabel, setNewLabel] = useState(task.label);

    function handleKeyDown(event) {
        if (event.key === "Enter" && newLabel.trim() !== "") {
            event.target.blur();
        }
    }

    function tryUpdateLabel() {
        if (newLabel.trim() !== "") {
            signalChange({ ...task, label: newLabel });
        }
        setIsEditing(false);
    }

    function checkCanComplete() {
        if (freezeCompleted) {
            return;
        }
        if (!task.tasks || task.tasks.every((item) => item.complete)) {
            signalChange({ ...task, complete: !task.complete });
        } else {
            setSignalIncomplete(true);
        }
    }

    return (
        <div className="label-wrap" onClick={() => checkCanComplete()}>
            {!freezeCompleted &&
                (task.complete ? (
                    <MdUndo className="icon status undo" />
                ) : (
                    <MdCheck className={`icon status`} />
                ))}

            {isEditing ? (
                <input
                    type="text"
                    value={newLabel}
                    onChange={(event) => setNewLabel(event.target.value)}
                    onClick={(event) => event.stopPropagation()}
                    onKeyDown={(event) => handleKeyDown(event)}
                    onBlur={() => tryUpdateLabel()}
                    autoFocus
                />
            ) : (
                <div className="label">{task.label}</div>
            )}
        </div>
    );
}
