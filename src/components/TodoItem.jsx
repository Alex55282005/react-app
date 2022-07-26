import { Component } from "react";


export default function TodoItem({onItemClick,onDeleteButtonClick, item}) {
  const { completed, title, id } = item;
  return (
    <li
      style={{ 
        backgroundColor: getStyle(completed), 
        height: "30px", 
        marginTop: "10px", 
        borderRadius: "10px" }}
      onClick={() => onItemClick(id)}
    >
      {title}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onDeleteButtonClick(id);
        }}
        title="Delete item"
      >
        Delete
      </button>
    </li>
  );
}

function getStyle(completed) {
  return completed ? "yellow" : "lightgreen";
}
