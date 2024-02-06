import { Inquiry } from '../types/inquiry';
import { employees } from './employees';

// Mock data for inquiries
export const inquiries: Inquiry[] = [
  {
    id: 1,
    positionTitle: 'UI/UX Designer',
    requester: employees[0],
    publishOn: new Date('2024-04-01'),
  },
  {
    id: 2,
    positionTitle: 'Java Software Engineer',
    requester: employees[1],
    publishOn: new Date('2024-05-01'),
  },
  {
    id: 3,
    positionTitle: 'Finance Manager',
    requester: employees[2],
    publishOn: new Date('2024-08-15'),
  },
  {
    id: 4,
    positionTitle: 'Recruiter for IT',
    requester: employees[3],
    publishOn: new Date('2024-04-15'),
  },
  {
    id: 5,
    positionTitle: 'Lawyer for EU Law',
    requester: employees[4],
    publishOn: new Date('2024-012-01'),
  },
  {
    id: 6,
    positionTitle: 'Key Account Manager',
    requester: employees[5],
    publishOn: new Date('2024-06-01'),
  },
];
