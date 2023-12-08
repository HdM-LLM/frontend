import { UUID } from 'crypto';
import { Skill } from './skill';

export type Applicant = {
  id: UUID;
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
};
