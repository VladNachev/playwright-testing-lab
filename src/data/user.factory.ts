import { faker } from '@faker-js/faker';

import { env } from '../config/env';
import type { RegistrationUser } from '../types/user';

export const createRegistrationUser = (): RegistrationUser => {
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();

  return {
    title: 'Mr',
    name: `${firstName} ${lastName}`,
    email: `pw_${Date.now()}_${faker.string.alphanumeric(6).toLowerCase()}@example.com`,
    password: env.defaultPassword,
    birthDay: '10',
    birthMonth: '5',
    birthYear: '1995',
    firstName,
    lastName,
    company: faker.company.name(),
    address1: faker.location.streetAddress(),
    address2: `Suite ${faker.number.int({ min: 100, max: 999 })}`,
    country: 'Canada',
    state: faker.location.state(),
    city: faker.location.city(),
    zipcode: faker.location.zipCode('#####'),
    mobileNumber: `555${faker.string.numeric(7)}`
  };
};
