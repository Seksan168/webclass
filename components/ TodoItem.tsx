"use client";

type TodoType = {
  index: number;
  id: string;
  title: string;
  done: boolean;
  deleteTask: (id: string) => void;
  toggleTask: (id: string, done: boolean) => void;
};

export default function TodoItem({
  index,
  id,
  title,
  done,
  deleteTask,
  toggleTask,
}: TodoType) {
  return (
    <div>
      {index + 1}: {title} : {done ? "Yes" : "No"}
      <button
        onClick={() => deleteTask(id)}
        className="border-2 border-black m-2 p-1"
      >
        {" "}
        x{" "}
      </button>
      <input
        id={id}
        type="checkbox"
        className="cursor-pointer peer"
        defaultChecked={done}
        onChange={(e) => toggleTask(id, e.target.checked)}
      />
    </div>
  );
}
