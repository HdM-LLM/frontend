import { UUID } from 'crypto';

/**
 * The category type.
 */
export type Category = {
  id: UUID;
  name: string;
  chip: string;
  weight?: number;
  locked?: boolean;
};
