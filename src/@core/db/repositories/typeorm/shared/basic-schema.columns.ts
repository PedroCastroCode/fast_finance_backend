import { EntitySchemaColumnOptions } from 'typeorm';

export const BasicColumnsSchema = {
  id: {
    type: 'uuid',
    primary: true,
  } as EntitySchemaColumnOptions,
};
