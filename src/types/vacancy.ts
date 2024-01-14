import { Departments } from '../enums/Departments.enum';
import { WorkingHours } from '../enums/WorkingHours.enum';
import { BusinessObject } from './businessObject';

// TODO: Change the type of the createdAt and updatedAt fields to Date once the database is set up
export type Vacancy = BusinessObject & {
  title: string;
  department: Departments;
  working_time: WorkingHours;
  description: string;
};
