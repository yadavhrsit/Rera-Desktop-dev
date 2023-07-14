import { faker } from '@faker-js/faker';
import { sample } from 'lodash';

// ----------------------------------------------------------------------

const staff = [...Array(10)].map((_, index) => ({
    id: faker.datatype.uuid(),
    name: faker.name.fullName(),
    email: 'email@example.com',
    phone: faker.phone.number('+91 ### ### ## ##'),
    empty: '',
}));

export default staff;
