export interface Task {
  title: string;
  userId: string;
  content: string;
  _id?: any;
  date: string;
}

export interface TasksContextType {
  setGetAllTasks: React.Dispatch<React.SetStateAction<Task[] | { title: string; content: string }>>;
  getAllTasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
  setAddTask: React.Dispatch<React.SetStateAction<{ title: '', content: '' }>>;
  // const [addTask, setAddTask] = useState<{ title: string; content: string }>({ title: '', content: '' });

  addTask: { title: string; content: string };
}

export interface AddTaskForm {
  title: string;
  content: string;
}
