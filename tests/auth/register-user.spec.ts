import { attachScreenshot } from '../../src/utils/evidence.util';
import { test } from '../../src/fixtures/test-fixtures';

test.describe('Authentication - register user', () => {
  test('registers a new user', async ({
    authWorkflow,
    page,
    registrationUser
  }, testInfo) => {
    await authWorkflow.registerUser(registrationUser, testInfo);
    await attachScreenshot(page, testInfo, 'registered-user-home');
    await authWorkflow.deleteCurrentUser();
  });
});
