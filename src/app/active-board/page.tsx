'use client';
import TaskColumn from '@/components/ui/taskCard';
import React, { useState } from 'react';

type Task = {
  id: number;
  title: string;
  description: string;
  status: 'Pending' | 'In Progress' | 'Completed';
  dueDate: string;
};

const Page = () => {
  const [tasks] = useState<Task[]>([
    { id: 1, title: 'Task 1', description: 'Lorem ipsum dolor sit amet', status: 'Pending', dueDate: '2025-03-10' },
    { id: 2, title: 'Task 2', description: 'Consectetur adipisicing elit', status: 'Pending', dueDate: '2025-03-15' },
    { id: 3, title: 'Task 3', description: 'Voluptatem molestias tempora', status: 'Completed', dueDate: '2025-02-28' },
    { id: 4, title: 'Task 4', description: 'Voluptatem molestias tempora', status: 'Completed', dueDate: '2025-02-28' },
  ]);

  // Explicitly define the type for groupedTasks
  const groupedTasks: Record<Task['status'], Task[]> = {
    Pending: [],
    'In Progress': [],
    Completed: [],
  };

  // Populate groupedTasks
  tasks.forEach((task) => {
    groupedTasks[task.status].push(task);
  });

  return (
    <div className="text-black p-6">
      <h1 className="text-3xl font-bold mb-6">Active Board</h1>

      <div className="flex gap-6">
        <TaskColumn title="Pending" tasks={groupedTasks['Pending']} statusColor="bg-yellow-500" />
        <TaskColumn title="In Progress" tasks={groupedTasks['In Progress']} statusColor="bg-blue-500" />
        <TaskColumn title="Completed" tasks={groupedTasks['Completed']} statusColor="bg-green-500" />
      </div>
    </div>
  );
};

export default Page;
