import { BusinessObject } from './businessObject';
import { Applicant } from './applicant';

export type Skill = BusinessObject & {
  category: string;
  rating: number;
  applicantId: Applicant['id'];
};
