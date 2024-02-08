import { BusinessObject } from './businessObject';
import { Skill } from './skill';

/**
 * The applicant type.
 */
export type Applicant = BusinessObject & {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  street: string;
  postalCode: number;
  city: string;
  email: string;
  phoneNumber: string;
  skills: Skill[];
  img: string;
  totalScore: string;
};
