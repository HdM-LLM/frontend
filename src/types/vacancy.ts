import { UUID } from 'crypto';

// TODO: Change the type of the createdAt and updatedAt fields to Date once the database is set up
export type Vacancy = {
  id: UUID;
  vacancyTitle: string;
  department: string;
  fullTime: boolean;
  description: string;
  salary: number;
  company: string;
  createdAt: string;
  updatedAt: string;
};
