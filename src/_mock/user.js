import { faker } from '@faker-js/faker';
import { sample } from 'lodash';

// ----------------------------------------------------------------------

const users = [...Array(24)].map((_, index) => ({
  id: faker.datatype.uuid(),
  name: faker.name.fullName(),
  company: faker.company.name(),
  ca: faker.name.fullName(),
  architect: faker.name.fullName(),
  consultant: faker.name.fullName(),
  owner: faker.name.fullName(),
}));

export default users;
