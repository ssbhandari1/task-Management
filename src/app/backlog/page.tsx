'use client'
import React, { useState } from "react";
import Modal from "@/components/ui/modal";

const Page = () => {
  const [tasks, setTasks] = useState([
    { id: 1, title: "Task 1", description: "Lorem ipsum dolor sit amet", status: "Pending", dueDate: "2025-03-10" },
    { id: 2, title: "Task 2", description: "Consectetur adipisicing elit", status: "In Progress", dueDate: "2025-03-15" },
    { id: 3, title: "Task 3", description: "Voluptatem molestias tempora", status: "Completed", dueDate: "2025-02-28" },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState<any>(null);
  const [isEditing, setIsEditing] = useState(false); // Track whether adding or editing

  // Delete Task
  const deleteTask = (id: number) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  // Open Edit Modal
  const openEditModal = (task: any) => {
    setTaskToEdit(task);
    setIsEditing(true);
    setIsModalOpen(true);
  };

  // Open Add Task Modal (Empty Form)
  const openAddModal = () => {
    setTaskToEdit(null);
    setIsEditing(false);
    setIsModalOpen(true);
  };

  // Close Modal
  const closeModal = () => {
    setIsModalOpen(false);
    setTaskToEdit(null);
  };

  const saveTask = (updatedTask: any) => {
    if (isEditing) {
      setTasks(tasks.map((task) => (task.id === updatedTask.id ? updatedTask : task)));
    } else {
      const newTask = { ...updatedTask, id: tasks.length + 1 }; // Generate unique ID
      setTasks([...tasks, newTask]);
    }
    closeModal();
  };

  return (
    <div className="bg-gray-200 text-black mt-10 w-full min-h-[60vh] p-4">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-end gap-2">
          <h1 className="text-xl font-bold">Backlog</h1>
          <span className="text-base">{tasks.length} Task{tasks.length !== 1 ? "s" : ""}</span>
        </div>
        <button onClick={openAddModal} className="bg-blue-400 cursor-pointer text-white px-4 py-2 rounded-md hover:bg-blue-500">
          Add Task
        </button>
      </div>


      <div>
        {tasks.map((task) => (
          <div key={task.id} className="bg-white p-6 mb-6 rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl">
            <h3 className="text-xl font-semibold text-gray-800 hover:text-blue-400 transition-colors">{task.title}</h3>
            <p className="text-sm text-gray-600 mt-2">{task.description}</p>

            <div className="mt-4 flex justify-between text-sm text-gray-500">
              <div>
                <span className="font-semibold">Status:</span> {task.status}
              </div>
              <div>
                <span className="font-semibold">Due Date:</span> {task.dueDate}
              </div>
            </div>

            <div className="mt-4 flex justify-end space-x-4">
              <button
                onClick={() => openEditModal(task)}
                className="bg-gradient-to-r from-blue-400 to-blue-500 text-white px-5 py-2 rounded-md hover:from-blue-500 hover:to-blue-400 transition-all duration-300"
              >
                Edit
              </button>
              <button
                onClick={() => deleteTask(task.id)}
                className="bg-gradient-to-r from-red-400 to-red-500 text-white px-5 py-2 rounded-md hover:from-red-500 hover:to-red-400 transition-all duration-300"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <Modal
          task={taskToEdit || { title: "", description: "", status: "Pending", dueDate: "" }} // Empty task for new entries
          onClose={closeModal}
          onSave={saveTask}
        />
      )}
    </div>
  );
};

export default Page;
