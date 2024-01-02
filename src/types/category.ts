import { UUID } from 'crypto';

export type Category = {
  id: UUID;
  name: string;
  chip: string;
  weight?: number;
  locked?: boolean;
};
