"use client"
import { TasksProviderProps } from '@/types/ChildrenTypes';
// import { getResultApi } from '@/utils/api';
import React, { createContext, useMemo, useState } from 'react';

import { Task } from '../interfaces/iProvider';
// interface Task {
//   title: string;
//   userId: string;
//   content: string;
//   _id?: string;
//   date: string;
// }

const TasksContext = createContext({});

const TasksProvider: React.FC<TasksProviderProps> = ({ children }) => {
  const [getAllTasks, setGetAllTasks] = useState<Task[]>([]);
  const [addTask ,setAddTask] = useState({
    title: '',
    content: '',
  });
  const [editBol, setEditBol] = useState(false)

  const contextValue = useMemo(() => ({
    getAllTasks,
    setGetAllTasks,
    addTask,
    setAddTask,
    editBol,
    setEditBol,
  }), [getAllTasks, addTask, editBol]);
  
  return (
    <TasksContext.Provider value={contextValue}>
      {children}
    </TasksContext.Provider>
  );
};

export { TasksContext, TasksProvider };

