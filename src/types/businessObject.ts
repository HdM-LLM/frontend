import { UUID } from 'crypto';

/**
 * The business object type that all other types inherit from.
 */
export type BusinessObject = {
  id: UUID;
  dateCreated: string; // TODO: Change the type of the createdAt and updatedAt fields to Date once the database is set up
};
