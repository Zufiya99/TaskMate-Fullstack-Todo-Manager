import React from "react";

const Todo = ({
  id,
  title,
  description,
  mongoId,
  complete,
  deleteTodos,
  completeTodos,
}) => {
  return (
    <tr className="bg-white border-b hover:bg-gray-50 transition duration-150">
      <th
        scope="row"
        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
      >
        {id + 1}
      </th>
      <td
        className={`px-6 py-4 ${complete ? "line-through text-gray-500" : ""}`}
      >
        {title}
      </td>
      <td
        className={`px-6 py-4 ${complete ? "line-through text-gray-500" : ""}`}
      >
        {description}
      </td>
      <td className="px-6 py-4">{complete ? "Completed" : "Pending"}</td>
      <td className="px-6 py-4 flex gap-2">
        <button
          onClick={() => deleteTodos(mongoId)}
          className="py-2 px-4 bg-red-500 text-white rounded-md hover:bg-red-600 transition duration-200"
        >
          Delete
        </button>
        {!complete && (
          <button
            onClick={() => completeTodos(mongoId)}
            className="py-2 px-4 bg-green-500 text-white rounded-md hover:bg-green-600 transition duration-200"
          >
            Done
          </button>
        )}
      </td>
    </tr>
  );
};

export default Todo;
