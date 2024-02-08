import { Employee } from './employee';

/**
 * Inquiry type.
 */
export type Inquiry = {
  id: number;
  positionTitle: string;
  requester: Employee;
  publishOn: Date;
};
