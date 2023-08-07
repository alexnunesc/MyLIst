'use client'
import { ChangeEvent, useContext, useState } from 'react';
import 'tailwindcss/tailwind.css';
import { TasksContext } from '../hooks/TasksProvider';
import { EditedTask, Task, TasksContextType } from '../interfaces/iProvider';


export default function CardEditTask({ task }: { task: Task }): JSX.Element {
  const { getAllTasks, setGetAllTasks } = useContext(TasksContext) as TasksContextType;

  const [editaTask, setEditaTask] = useState<EditedTask>({
    title: task.title,
    content: task.content,
  });

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setEditaTask((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // const newTask = {
    //   userId: localStorage.getItem('userId') as string,
    //   date: new Date().toISOString(),
    //   ...editaTask,
    // };

    // // edit task in frontend
    // const newTasks = getAllTasks.map((item: Task) => {
    //   if (item._id === task._id) {
    //     return newTask;
    //   }
    // });
    // setGetAllTasks(newTasks);
    // console.log('editaTask', editaTask);
    
    
    // edit task in backend
    await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/edittask/${task._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'authorization': `${localStorage.getItem('token')}`,
      },
      body: JSON.stringify({
        title: editaTask.title,
        content: editaTask.content,
      }),
    });

    setEditaTask({ title: '', content: '' }); // Limpa os campos de input
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
            value={editaTask.title}
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
            value={editaTask.content}
            placeholder="content"
            className="border-2 border-gray-300 rounded-md p-2 h-16 resize-none w-full"
          />
        </label>

        <button type="submit" className="bg-blue-500 text-white rounded-md p-2">
          Edit Task
        </button>
      </form>
    </div>
  )
}
