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

export function createVacancy(vacancies: Vacancy) {
  let result = [];
  if (Array.isArray(vacancies)) {
    vacancies.forEach((vacancy) => {
      vacancy.id = vacancy.id;
      vacancy.vacancyTitle = vacancy.vacancyTitle.toString();
      vacancy.department = vacancy.department.toString();
      vacancy.fullTime = vacancy.fullTime;
      vacancy.description = vacancy.description.toString();
      vacancy.salary = vacancy.salary;
      vacancy.company = vacancy.company.toString();
      vacancy.createdAt = vacancy.createdAt.toString();
      vacancy.updatedAt = vacancy.updatedAt.toString();
      result.push(vacancy);
    });
  } else {
    vacancies.id = vacancies.id;
    vacancies.vacancyTitle = vacancies.vacancyTitle.toString();
    vacancies.department = vacancies.department.toString();
    vacancies.fullTime = vacancies.fullTime;
    vacancies.description = vacancies.description.toString();
    vacancies.salary = vacancies.salary;
    vacancies.company = vacancies.company.toString();
    vacancies.createdAt = vacancies.createdAt.toString();
    vacancies.updatedAt = vacancies.updatedAt.toString();
    result.push(vacancies);
  }
  return result;
}
