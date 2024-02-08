import { Departments } from '../enums/Departments.enum';
import { WorkingHours } from '../enums/WorkingHours.enum';
import { BusinessObject } from './businessObject';

/**
 * The vacancy type.
 */
export type Vacancy = BusinessObject & {
  title: string;
  department: Departments;
  working_time: WorkingHours;
  description: string;
};
