"use client"
import { TasksProviderProps } from '@/types/ChildrenTypes';
import { getResultApi } from '@/utils/api';
import React, { createContext, useEffect, useMemo, useState } from 'react';

interface Task {
  title: string;
  userId: string;
  content: string;
  _id: string;
  date: string;
}

const TasksContext = createContext({});

const TasksProvider: React.FC<TasksProviderProps> = ({ children }) => {
  const [getAllTasks, setGetAllTasks] = useState<Task[]>([]);
  const [addTask ,setAddTask] = useState({
    title: '',
    content: '',
  });

  useEffect(() => {
    const task = async () => {
      const result = await getResultApi();
      console.log('takkk', result);
      setGetAllTasks(result);
    };
    task();
  }, []);

  const contextValue = useMemo(() => ({
    getAllTasks,
    setGetAllTasks,
    addTask,
    setAddTask,
  }), [getAllTasks, addTask,]);
  
  return (
    <TasksContext.Provider value={contextValue}>
      {children}
    </TasksContext.Provider>
  );
};

export { TasksContext, TasksProvider };

