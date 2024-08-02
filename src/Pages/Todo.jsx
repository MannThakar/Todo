/* eslint-disable react/no-unknown-property */
import { useEffect, useState } from "react";
import localforage from "localforage";

const Todo = () => {
  const [userInput, setUserInput] = useState({ name: "", completed: false });
  const [allTasks, setAllTasks] = useState([]);
  const [showToast, setShowToast] = useState(false);
  const [isEditing, setIsEditing] = useState(null);
  const [editInput, setEditInput] = useState("");
  const [draggingIndex, setDraggingIndex] = useState(null);

  useEffect(() => {
    localforage.getItem("tasks", (err, value) => {
      if (value) {
        setAllTasks(value);
      }
    });
  }, []);

  function allTask() {
    return allTasks?.map((task, index) => (
      <div
        key={index}
        className={`card bg-base-300 w-96 shadow-2xl ${
          draggingIndex === index ? "dragging" : ""
        }`}
        draggable
        onDragStart={() => setDraggingIndex(index)}
        onDragOver={(e) => e.preventDefault()}
        onDragEnd={() => setDraggingIndex(null)}
        onDrop={() => handleDrop(index)}
      >
        <div className="card-body flex flex-row items-center">
          <div className="w-1/4">
            <input
              type="checkbox"
              className="checkbox"
              checked={task.completed}
              onChange={() => updateTasks(index)}
            />
          </div>
          <div className="w-full">
            <div className="card-actions justify-end">
              {isEditing === index ? (
                <input
                  type="text"
                  value={editInput}
                  onChange={(e) => setEditInput(e.target.value)}
                  className="input input-bordered grow"
                />
              ) : (
                <p className={task.completed ? "line-through" : ""}>
                  {task.name}
                </p>
              )}
              <button
                className="btn btn-square btn-sm"
                onClick={() => deleteTask(index)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-trash-2"
                >
                  <path d="M3 6h18" />
                  <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                  <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                  <line x1="10" x2="10" y1="11" y2="17" />
                  <line x1="14" x2="14" y1="11" y2="17" />
                </svg>
              </button>

              <button
                className="btn btn-square btn-sm"
                onClick={() => startEditing(index)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="lucide lucide-pencil"
                >
                  <path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z" />
                  <path d="m15 5 4 4" />
                </svg>
              </button>

              {isEditing === index && (
                <button
                  className="btn btn-square btn-sm"
                  onClick={() => saveEdit(index)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    ));
  }

  function addTask(t) {
    if (t.name === "") {
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
      return;
    }

    const newTask = [...allTasks];
    newTask.push(t);
    saveTask(newTask);
    setUserInput({ name: "", completed: false });
  }

  function deleteTask(index) {
    const newTask = allTasks.filter((_, i) => i !== index);
    saveTask(newTask);
  }

  function updateTasks(index) {
    const newTask = [...allTasks];
    newTask[index].completed = !newTask[index].completed;
    saveTask(newTask);
  }

  function startEditing(index) {
    setIsEditing(index);
    setEditInput(allTasks[index].name);
  }

  function saveEdit(index) {
    const updatedTasks = [...allTasks];
    updatedTasks[index].name = editInput;
    saveTask(updatedTasks);
    setIsEditing(null);
    setEditInput("");
  }

  function handleDrop(targetIndex) {
    if (draggingIndex === null) return;
    const newTasks = [...allTasks];
    const [draggedTask] = newTasks.splice(draggingIndex, 1);
    newTasks.splice(targetIndex, 0, draggedTask);
    saveTask(newTasks);
    setDraggingIndex(null);
  }

  function saveTask(localstorageTask) {
    setAllTasks(localstorageTask);
    localforage.setItem("tasks", localstorageTask, (err) => {
      console.log("task saved");
    });
  }

  return (
    <>
      <div className="flex justify-center gap-5">
        <label className="input input-bordered flex items-center gap-2 w-9/12">
          <input
            type="text"
            className="grow"
            placeholder="Add Productive Task...."
            value={userInput.name}
            onChange={(e) =>
              setUserInput({ ...userInput, name: e.target.value })
            }
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-badge-plus"
          >
            <path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z" />
            <line x1="12" x2="12" y1="8" y2="16" />
            <line x1="8" x2="16" y1="12" y2="12" />
          </svg>
        </label>
        <button
          className="btn bg-purple-400 text-black btn-active"
          onClick={() => addTask(userInput)}
        >
          Add Task
        </button>
      </div>
      {showToast && (
        <div className="toast toast-top toast-center">
          <div className="alert alert-error">
            <span>Please Add Value</span>
          </div>
        </div>
      )}
      <div className="flex flex-col items-start gap-y-3 mt-12 ml-36 ">
        {allTask()}
      </div>
    </>
  );
};

export default Todo;
