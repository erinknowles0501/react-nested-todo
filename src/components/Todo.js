import { useState, useEffect } from "react";
import TodoActions from "./TodoActions";
import TodoList from "./TodoList";
import { MdCheck, MdUndo, MdRemove, MdAdd } from "react-icons/md";

export default function Todo({ task, removeTask, signalChange }) {
    const [isEditing, setIsEditing] = useState(false);
    const [newLabel, setNewLabel] = useState(task.label);
    const [signalIncomplete, setSignalIncomplete] = useState(false);
    const [isCollapsed, setIsCollapsed] = useState(false);

    useEffect(() => {
        if (signalIncomplete === true) {
            setTimeout(() => {
                setSignalIncomplete(false);
            }, 500);
        }
    }, [signalIncomplete]);

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

    function updateTasks(tasks) {
        signalChange({ ...task, tasks: tasks });
    }

    function createNest(task) {
        signalChange({ ...task, tasks: task.tasks ? [...task.tasks] : [] });
    }

    function removeNest(task) {
        delete task.tasks;
        signalChange(task);
    }

    function checkCanComplete() {
        if (!task.tasks || task.tasks.every((item) => item.complete)) {
            signalChange({ ...task, complete: !task.complete });
        } else {
            setSignalIncomplete(true);
        }
    }

    return (
        <>
            <div className={`Todo ${task.complete ? "complete" : ""}`}>
                {task.tasks &&
                    (isCollapsed ? (
                        <MdAdd
                            className="icon collapse"
                            onClick={() => setIsCollapsed(false)}
                        />
                    ) : (
                        <MdRemove
                            className="icon collapse"
                            onClick={() => setIsCollapsed(true)}
                        />
                    ))}

                <div className="label-wrap" onClick={() => checkCanComplete()}>
                    {task.complete ? (
                        <MdUndo className="icon status undo" />
                    ) : (
                        <MdCheck className={`icon status`} />
                    )}

                    {isEditing ? (
                        <input
                            type="text"
                            value={newLabel}
                            onChange={(event) =>
                                setNewLabel(event.target.value)
                            }
                            onClick={(event) => event.stopPropagation()}
                            onKeyDown={(event) => handleKeyDown(event)}
                            onBlur={() => tryUpdateLabel()}
                            autoFocus
                        />
                    ) : (
                        <div className="label">{task.label}</div>
                    )}
                </div>

                {!isEditing && !task.complete && (
                    <TodoActions
                        task={task}
                        setIsEditing={setIsEditing}
                        createNest={createNest}
                        removeNest={removeNest}
                        removeTask={removeTask}
                    />
                )}
            </div>
            {task.tasks && (
                <TodoList
                    tasks={task.tasks}
                    className={`${signalIncomplete && "signalIncomplete"} ${
                        isCollapsed && "collapsed"
                    }`}
                    signalChange={updateTasks}
                />
            )}
        </>
    );
}
