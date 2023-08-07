export interface Task {
  title: string;
  userId: string;
  content: string;
  _id?: any;
  date: string;
}

export interface EditedTask {
  title: string;
  content: string;
}
export interface TasksContextType {
  setGetAllTasks: React.Dispatch<React.SetStateAction<Task[] | { title: string; content: string } | any>>;
  getAllTasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
  setAddTask: React.Dispatch<React.SetStateAction<{ title: '', content: '' }>>;
  editBol: boolean;
  setEditBol: React.Dispatch<React.SetStateAction<boolean>>;
  // const [addTask, setAddTask] = useState<{ title: string; content: string }>({ title: '', content: '' });

  addTask: { title: string; content: string };
}

export interface AddTaskForm {
  title: string;
  content: string;
}
