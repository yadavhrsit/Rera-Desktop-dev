import { faker } from '@faker-js/faker';
import { sample } from 'lodash';

// ----------------------------------------------------------------------

const users = [...Array(24)].map((_, index) => ({
  id: faker.datatype.uuid(),
  name: faker.name.fullName(),
  company: faker.company.name(),
  owner: faker.name.fullName(),
  ca: faker.name.fullName(),
  architect: faker.name.fullName(),
  consultant: faker.name.fullName(),
  staff: faker.name.fullName(),
  empty: ''
}));

export default users;
