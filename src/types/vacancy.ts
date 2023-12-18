import { BusinessObject } from './businessObject';
// TODO: Change the type of the createdAt and updatedAt fields to Date once the database is set up
export type Vacancy = BusinessObject & {
  vacancyTitle: string;
  department: string;
  fullTime: boolean;
  description: string;
  salary: number;
  company: string;
  updatedAt: string;
};
