import { Object } from './object';
import { Applicant } from './applicant';

export type Skill = Object & {
  category: string;
  rating: number;
  applicantId: Applicant['id'];
};
