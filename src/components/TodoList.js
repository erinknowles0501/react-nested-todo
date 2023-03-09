/* ERIN: Todos possibly contain TodoLists, not TodoLists render either Todos or more lists!! */

import { useState } from "react";
import InsertTodo from "./InsertTodo";
import Todo from "./Todo";

export default function TodoList({
    tasks,
    className,
    signalChange,
    removeTask,
    addTask,
}) {
    function removeTask(task) {
        const newTasks = tasks.filter((item) => item.id !== task.id);
        signalChange(newTasks);
    }

    function addTask(task) {
        const newTasks = [...tasks];
        newTasks.push(task);
        signalChange(newTasks);
    }

    // function updateTask(task, updateObj) {
    //   const newTasks = [...tasks];
    //   const oldTaskIndex = newTasks.findIndex((item) => item.id === task.id);
    //   newTasks[oldTaskIndex] = { ...newTasks[oldTaskIndex], ...updateObj };
    //   setTasks(newTasks);
    // }

    function updateTasks(task) {
        signalChange(generateNewTasks(task));
    }

    function generateNewTasks(updatedTask) {
        const newTasks = [...tasks];
        const updatedTaskIndex = newTasks.findIndex(
            (task) => task.id === updatedTask.id
        );
        newTasks[updatedTaskIndex] = updatedTask;
        return newTasks;
    }

    return (
        <div className={`TodoList ${className}`}>
            {tasks.map((task, index) => {
                return (
                    <Todo
                        task={task}
                        removeTask={removeTask}
                        key={index}
                        signalChange={updateTasks}
                        generateNewTasks={generateNewTasks}
                    />
                );
            })}

            <InsertTodo addTask={addTask} />
        </div>
    );
}
