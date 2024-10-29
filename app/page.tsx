"use client";

import Todo from "@/Components/Todo";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

// Define interfaces for your todo data
interface TodoItem {
  _id: string;
  title: string;
  description: string;
  isCompleted: boolean;
}

const Page = () => {
  const [formData, setFormData] = useState<{ title: string; description: string }>({
    title: "",
    description: "",
  });

  const [todoData, setTodoData] = useState<TodoItem[]>([]);

  const fetchTodos = async () => {
    const response = await axios("/api");
    setTodoData(response.data.todos);
  };

  const deleteTodos = async (id: string) => { // Change id type to string
    const response = await axios.delete("/api", {
      params: {
        mongoId: id,
      },
    });
    toast.success(response.data.msg);
    fetchTodos();
  };

  const completeTodos = async (id: string) => { // Change id type to string
    const response = await axios.put(
      "/api",
      {},
      {
        params: {
          mongoId: id,
        },
      }
    );
    toast.success(response.data.msg);
    fetchTodos();
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target; // Destructure name and value directly
    setFormData((form) => ({ ...form, [name]: value }));
  };

  const onSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => { // Specify the event type
    e.preventDefault();

    try {
      const response = await axios.post("/api", formData);
      toast.success(response.data.msg);
      setFormData({
        title: "",
        description: "",
      });
      await fetchTodos();
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-orange-600 text-white py-6 shadow-md">
        <h1 className="text-center text-3xl font-bold">Todo Manager</h1>
        <p className="text-center mt-1">Organize your tasks with ease</p>
      </header>

      <main className="flex-grow">
        <ToastContainer theme="dark" />
        <form
          onSubmit={onSubmitHandler}
          className="flex items-center flex-col gap-2 w-[80%] max-w-[600px] mt-16 px-2 mx-auto"
        >
          <input
            type="text"
            name="title"
            placeholder="Enter the title"
            value={formData.title}
            onChange={onChangeHandler}
            className="px-3 py-2 border-2 w-full my-2 rounded-lg shadow-sm"
          />
          <textarea
            name="description"
            placeholder="Enter the description"
            className="px-3 py-2 border-2 w-full rounded-lg shadow-sm"
            value={formData.description}
            onChange={onChangeHandler}
          ></textarea>
          <button
            type="submit"
            className="bg-orange-600 py-3 px-8 rounded-lg text-white font-semibold shadow-md hover:bg-orange-700 transition"
          >
            Add todo
          </button>
        </form>

        <div className="relative overflow-x-auto mt-16 w-[60%] mx-auto">
          <table className="w-full text-sm text-left rtl:text-right text-gray-700 dark:text-gray-400 bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden">
            <thead className="text-xs uppercase bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">ID</th>
                <th scope="col" className="px-6 py-3">Title</th>
                <th scope="col" className="px-6 py-3">Description</th>
                <th scope="col" className="px-6 py-3">Status</th>
                <th scope="col" className="px-6 py-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {todoData.map((item, index) => (
                <Todo
                  key={item._id} // Use item._id as the unique key
                  id={index} // Optional if you don't need the index
                  title={item.title}
                  description={item.description}
                  complete={item.isCompleted}
                  mongoId={item._id}
                  deleteTodos={deleteTodos}
                  completeTodos={completeTodos}
                />
              ))}
            </tbody>
          </table>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-200 text-gray-600 dark:bg-gray-800 dark:text-gray-400 py-4 text-center">
        <p>© 2024 Zufiya Idrisi. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Page;
