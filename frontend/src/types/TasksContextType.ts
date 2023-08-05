import { Dispatch, SetStateAction } from "react";

export type TasksContextType = {
  tasks: any[]; // Substitua 'any' pelo tipo adequado para seus objetos de tarefas
  setTasks: Dispatch<SetStateAction<any[]>>;
  filter: string;
  setFilter: Dispatch<SetStateAction<string>>;
};