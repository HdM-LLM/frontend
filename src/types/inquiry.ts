import { Employee } from './employee';

export type Inquiry = {
  id: number;
  positionTitle: string;
  requester: Employee;
  publishOn: Date;
};
