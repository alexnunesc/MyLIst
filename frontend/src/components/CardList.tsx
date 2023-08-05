'use client'
import { getResultApi } from '@/utils/api';
import { ChangeEvent, useContext, useEffect, useState } from 'react';
import 'tailwindcss/tailwind.css';
import { TasksContext } from '../hooks/TasksProvider';
import { Task, TasksContextType } from '../interfaces/iProvider';
import Card from './Card';

export default function CardList(): JSX.Element {
  const { getAllTasks, setAddTask, addTask, setGetAllTasks } = useContext(TasksContext) as TasksContextType;

  const [shouldReload, setShouldReload] = useState(false);

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setAddTask((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }

  // UseEffect para atualizar a página quando shouldReload mudar
  useEffect(() => {
    if (shouldReload) {
      const task = async () => {
        setGetAllTasks(await getResultApi());
        setAddTask({ title: '', content: '' });
      };
      task();
      setShouldReload(false); // Reseta o estado para evitar loop
    }
  }, [shouldReload, getAllTasks, setGetAllTasks ,setAddTask]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    await fetch('http://localhost:3333/addtask', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'authorization': `${localStorage.getItem('token')}`,
      },
      body: JSON.stringify({...addTask}),
    });
    setShouldReload(true);
  };
  
  return (
    <div className="flex flex-col max-w-xl items-center justify-center p-5 gap-5">
      <form onSubmit={handleSubmit} method="POST" className="flex flex-col justify-center gap-2 w-full">
        <label htmlFor="title">
          <input
            onChange={handleChange}
            type="text"
            name="title"
            id="title"
            minLength={3}
            value={addTask.title}
            placeholder="Title"
            className="border-2 border-gray-300 rounded-md p-2 w-full"
          />
        </label>
        <label htmlFor="content">
          <textarea
            onChange={handleChange}
            name="content"
            id="content"
            minLength={3}
            value={addTask.content}
            placeholder="content"
            className="border-2 border-gray-300 rounded-md p-2 h-16 resize-none w-full"
          />
        </label>

        <button type="submit" className="bg-blue-500 text-white rounded-md p-2">
          Add Task
        </button>
      </form>

      {/* Slice criar uma copia do array e o reverse reverte ele */}
      {getAllTasks?.slice().reverse().map((task: Task) => (
        <Card key={task._id} task={task} />
      ))}
    </div>
  );
}

