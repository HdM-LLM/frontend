import { UUID } from 'crypto';

export type Object = {
  id: UUID;
  dateCreated: string; // TODO: Change this later to date once the backend is connected
};
