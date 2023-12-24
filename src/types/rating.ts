import { BusinessObject } from './businessObject';
import { Vacancy } from './vacancy';
import { Applicant } from './applicant';
import { Category } from './category';

export type Rating = BusinessObject & {
  categoryId: Category['id'];
  vacancyId: Vacancy['id'];
  applicantId: Applicant['id'];
  score: number;
  justification: string;
  quote: string;
};
