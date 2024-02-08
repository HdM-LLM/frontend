import { BusinessObject } from './businessObject';
import { Applicant } from './applicant';

/**
 * The skill type.
 */
export type Skill = BusinessObject & {
  category: string;
  rating: number;
  applicantId: Applicant['id'];
};
