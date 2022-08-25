import React, { memo, useState } from "react";

function List({
  id,
  title,
  completed,
  todoData,
  settodoData,
  provided,
  snapshot,
  handleClick,
}) {
  const [isEditing, setisEditing] = useState(false);
  const [editTitle, seteditTitle] = useState(title);

  const handleCompleteChange = (id) => {
    let newTodoData = todoData.map((data) => {
      if (data.id === id) {
        data.completed = !data.completed;
      }
      return data;
    });
    settodoData(newTodoData);
    localStorage.setItem("todoData", JSON.stringify(newTodoData));
  };

  const handleEditChange = (event) => {
    seteditTitle(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    let newTodoData = todoData.map((data) => {
      if (data.id === id) {
        data.title = editTitle;
      }
      return data;
    });
    settodoData(newTodoData);
    localStorage.setItem("todoData", JSON.stringify(newTodoData));
    setisEditing(false);
  };

  if (isEditing) {
    return (
      <div
        key={id}
        className="bg-gray-100 flex items-center justify-between w-full px-4 py-1 my-2 text-gray-600 border rounded"
      >
        <div className="items-center">
          <form onSubmit={handleSubmit}>
            <input
              value={editTitle}
              onChange={handleEditChange}
              className="w-full px-3 py-2 mr-4 text-gray-500 rounded"
            />
          </form>
        </div>
        <div className="items-center">
          <button
            className="px-4 py-2 float-right"
            onClick={() => setisEditing(false)}
          >
            x
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 float-right"
            type="submit"
          >
            save
          </button>
        </div>
      </div>
    );
  } else {
    return (
      <div
        key={id}
        {...provided.draggableProps}
        ref={provided.innerRef}
        {...provided.dragHandleProps}
        className={`${
          snapshot.isDragging ? "bg-gray-400" : "bg-gray-100"
        } flex items-center justify-between w-full px-4 py-1 my-2 text-gray-600 border rounded`}
      >
        <div className="items-center">
          <input
            type="checkbox"
            defaultChecked={false}
            onChange={() => handleCompleteChange(id)}
          />
          <span className={completed ? "line-through" : undefined}>
            {title}
          </span>
        </div>
        <div className="items-center">
          <button
            className="px-4 py-2 float-right"
            onClick={() => handleClick(id)}
          >
            x
          </button>
          <button
            className="px-4 py-2 float-right"
            onClick={() => setisEditing(true)}
          >
            edit
          </button>
        </div>
      </div>
    );
  }
}

export default memo(List);
