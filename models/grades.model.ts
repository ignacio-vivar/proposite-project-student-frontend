type Task = {
  id: number;
  description: string;
  deadtime: string;
  type_of_evaluation: string;
};
export type StudentCalifications = {
  id: number;
  grade: number;
  observation: string;
  status: string;
  task: Task;
};
