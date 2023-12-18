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

export function createApplicant(applicants: Applicant) {
  let result = [];
  if (Array.isArray(applicants)) {
    applicants.forEach((applicant) => {
      applicant.id = applicant.id;
      applicant.firstName = applicant.firstName.toString();
      applicant.lastName = applicant.lastName.toString();
      applicant.dateOfBirth = applicant.dateOfBirth.toString();
      applicant.street = applicant.street.toString();
      applicant.postalCode = applicant.postalCode;
      applicant.city = applicant.city.toString();
      applicant.email = applicant.email.toString();
      applicant.phoneNumber = applicant.phoneNumber.toString();
      applicant.skills = applicant.skills;
      applicant.rating = applicant.rating;
      result.push(applicant);
    });
  } else {
    applicants.id = applicants.id;
    applicants.firstName = applicants.firstName.toString();
    applicants.lastName = applicants.lastName.toString();
    applicants.dateOfBirth = applicants.dateOfBirth.toString();
    applicants.street = applicants.street.toString();
    applicants.postalCode = applicants.postalCode;
    applicants.city = applicants.city.toString();
    applicants.email = applicants.email.toString();
    applicants.phoneNumber = applicants.phoneNumber.toString();
    applicants.skills = applicants.skills;
    applicants.rating = applicants.rating;
    result.push(applicants);
  }
  return result;
}
