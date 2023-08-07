import 'tailwindcss/tailwind.css';

import { TasksContext } from '@/hooks/TasksProvider';
import { useContext } from 'react';
import { Task, TasksContextType } from '../interfaces/iProvider';
import CardEditTask from './CardEditTask';

interface CardProps {
  task: Task; // ao invés de item
}

const Card: React.FC<CardProps> = ({task}) => {
  // const [editaTask, setEditaTask] = useState(false)
  const { getAllTasks, setGetAllTasks, editBol, setEditBol } = useContext(TasksContext) as TasksContextType;

  // delete task
  const deleteTask = async () => {
    // delete task in frontend
    // o erro mostrado no console no memento de adicionar uma nova task é por causa da linha abaixo
    const newTasks = getAllTasks.filter((item: Task) => item._id !== task._id);
    setGetAllTasks(newTasks);
    
    // delete task in backend
    await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/deletetask/${task._id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'authorization': `${localStorage.getItem('token')}`,
      },
    });
  };

  // edit task
  const editTask = async () => {
    setEditBol(true)
  };

  return (
    <div className='flex flex-col max-w-xl items-center justify-center p-5 gap-5'>
      {/* <h1 className='font-bold text-xl text-sky-500'>TaskListed</h1> */}
      {/* {tasks?.map((item: Task, i: number) => ( */}

        <div className='flex flex-col items-center justify-center gap-3 rounded-lg bg-indigo-200 p-4 min-w-1/2  shadow-lg shadow-indigo-500/50'>

          <div className='flex flex-col items-center justify-center gap-3'>
            <h1 className='font-extrabold text-fuchsia-600 text-lg'>{task.title}</h1>
            <div>
              <p className='font-semibold'>
                {task.content}
              </p>
            </div>
            <div>{task.date.slice(0, 10)}</div>
          </div>

          <div  className='flex items-center justify-center gap-3'>
            <button onClick={ editTask } className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-md'> Edit </button>
            <button onClick={ deleteTask } className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-md'> Delete </button>
            {/* button in progresso */}
            <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md'> Done </button>
          </div>

        </div>

        {
          editBol ? <CardEditTask task={task} /> : null
        }

    </div>
  );
}

export default Card;
