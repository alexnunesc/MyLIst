'use client'
import { getResultApi } from '@/utils/api';
import { ChangeEvent, useContext, useEffect } from 'react';
import 'tailwindcss/tailwind.css';
import { TasksContext } from '../hooks/TasksProvider';
import { Task, TasksContextType } from '../interfaces/iProvider';
import Card from './Card';

export default function CardList(): JSX.Element {
  const { getAllTasks, setAddTask, addTask, setGetAllTasks } = useContext(TasksContext) as TasksContextType;
  

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setAddTask((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  useEffect(() => {
    const task = async () => {
      const result = await getResultApi();
      setGetAllTasks(result);
    };
    task();
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newTask = {
      userId: localStorage.getItem('userId') as string,
      date: new Date().toISOString(),
      ...addTask,
    };

    setAddTask({ title: '', content: '' }); // Limpa os campos de input

    setGetAllTasks([...getAllTasks, newTask]); // Adiciona a nova task no array de tasks para renderizar na tela antes de enviar para o backend e assim evitar o delay de requisição e renderização na tela
    await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/addtask`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'authorization': `${localStorage.getItem('token')}`,
      },
      body: JSON.stringify({...addTask}),
    });
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
      {getAllTasks?.slice().reverse().map((task: Task, i) => (
        task && <Card key={task._id + i} task={task} />
      ))}
    </div>
  );
}

