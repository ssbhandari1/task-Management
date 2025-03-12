// types.ts
export type Task = {
    id?: number;
    title: string;
    description: string;
    status: "Pending" | "In Progress" | "Completed";
    dueDate: string;
  };