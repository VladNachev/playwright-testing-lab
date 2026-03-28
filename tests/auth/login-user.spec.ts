import { attachScreenshot } from '../../src/utils/evidence.util';
import { test } from '../../src/fixtures/test-fixtures';

test.describe('Authentication - login user', () => {
  test('logs in with correct email and password', async ({
    authWorkflow,
    homePage,
    page,
    registrationUser
  }, testInfo) => {
    await authWorkflow.registerUser(registrationUser, testInfo);
    await authWorkflow.logoutUser();
    await authWorkflow.loginUser(registrationUser.email, registrationUser.password);
    await homePage.expectLoggedInAs(registrationUser.name);
    await attachScreenshot(page, testInfo, 'logged-in-user-home');
    await authWorkflow.deleteCurrentUser();
  });
});
