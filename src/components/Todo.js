import { useState, useEffect } from "react";
import TodoActions from "./TodoActions";
import TodoList from "./TodoList";
import TodoLabel from "./TodoLabel";
import { MdRemove, MdAdd } from "react-icons/md";

export default function Todo({
    task,
    removeTask,
    signalChange,
    freezeCompleted,
}) {
    const [isEditing, setIsEditing] = useState(false);
    const [signalIncomplete, setSignalIncomplete] = useState(false);
    const [isCollapsed, setIsCollapsed] = useState(false);

    useEffect(() => {
        if (signalIncomplete === true) {
            setTimeout(() => {
                setSignalIncomplete(false);
            }, 500);
        }
    }, [signalIncomplete]);

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

    return (
        <>
            <div
                className={`Todo ${task.complete ? "complete" : ""} ${
                    freezeCompleted && "frozen"
                }`}
            >
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

                <TodoLabel
                    task={task}
                    signalChange={signalChange}
                    isEditing={isEditing}
                    setIsEditing={setIsEditing}
                    setSignalIncomplete={setSignalIncomplete}
                    freezeCompleted={freezeCompleted}
                />

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
                    freezeCompleted={!!task.complete}
                />
            )}
        </>
    );
}
