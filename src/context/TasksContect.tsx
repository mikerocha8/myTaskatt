import React, {Children} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

//Tipagem para o Provider, passar por generic
interface IProps {
  children: React.ReactElement;
}

//Tipagem para usar na Interface ITaskContext, e na função addTask.
export interface ITask {
  id: string;
  title: string;
}

//Primeira Tipagem, no createContext, passar por generic
export interface ITaskContext {
  tasks: ITask[]; //Diz que vai ter uma lista de ITask
  addTask(task: ITask): void; // tipagem para adicionar itens a lista, a função em si é criada dentro do Provider, passamos o ITask aqui tbem para tipar o que o addTask ira receber, tbem é informado na função.
  removeTask(id: string): void;
}

const tasksData = '@MyTasks:Tasks';

export const TasksContext = React.createContext<ITaskContext>(
  {} as ITaskContext,
);

export const TasksProvider: React.FunctionComponent<IProps> = ({children}) => {
  const [data, setData] = React.useState<ITask[]>([]);

  React.useEffect(() => {
    async function loadTask() {
      const taskList = await AsyncStorage.getItem(tasksData);
      if (taskList) {
        setData(JSON.parse(taskList));
      }
    }
    loadTask();
  }, []);

  //Função para adicionar item a lista
  const addTask = async (task: ITask) => {
    try {
      const newTaskList = [...data, task];
      setData(newTaskList);
      await AsyncStorage.setItem(tasksData, JSON.stringify(newTaskList));
    } catch (error) {
      throw new Error(error as string);
    }
  };

  const removeTask = async (id: string) => {
    const newTaskList = data.filter(task => task.id != id);
    setData(newTaskList);
    await AsyncStorage.setItem(tasksData, JSON.stringify(newTaskList));
  };

  // const tasks = [{id: '1', title: 'Task01'}];

  return (
    <TasksContext.Provider value={{tasks: data, addTask, removeTask}}>
      {children}
    </TasksContext.Provider>
  );
};
//hook personalizado
export function useTaskList() {
  const context = React.useContext(TasksContext);

  if (!context) {
    throw new Error('useTaskList deve ser usado em um TasksProvider');
  }
  return context;
}
