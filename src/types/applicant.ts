import { BusinessObject } from './businessObject';
import { Skill } from './skill';

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
};
