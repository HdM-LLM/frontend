import { UUID } from 'crypto';

export type BusinessObject = {
  id: UUID;
  dateCreated: string; // TODO: Change this later to Date once the backend is connected
};
