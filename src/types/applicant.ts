import { Skill } from './skill';

export type Applicant = Object & {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  street: string;
  postalCode: number;
  city: string;
  email: string;
  phoneNumber: string;
  skills: Skill[];
  rating: number;
  img: string;
};
