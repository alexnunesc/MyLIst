import 'tailwindcss/tailwind.css';

interface Task {
  title: string;
  userId: string;
  content: string;
  _id: string;
  date: string;
}

interface CardProps {
  task: Task; // ao invés de item
}

const Card: React.FC<CardProps> = ({task}) => {  

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
            <button className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-md'> Edit </button>
            <button className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-md'> Delete </button>
            {/* button in progresso */}
            <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md'> Done </button>
          </div>

        </div>

      {/* ))} */}
    </div>
  );
}

export default Card;
