import { attachScreenshot } from '../../src/utils/evidence.util';
import { test } from '../../src/fixtures/test-fixtures';
import type { RegistrationUser } from '../../src/types/user';

test.describe('Authentication - login user', () => {
  let registeredUser: RegistrationUser;

  test.beforeEach(async ({ authWorkflow, registrationUser }, testInfo) => {
    registeredUser = registrationUser;
    await authWorkflow.registerUser(registeredUser, testInfo);
    await authWorkflow.logoutUser();
  });

  test.afterEach(async ({ authWorkflow }) => {
    // A failed test may have left the session logged out (e.g. the "incorrect password" case),
    // so attempt deletion directly and re-login only if that throws.
    try {
      await authWorkflow.deleteCurrentUser();
    } catch {
      try {
        await authWorkflow.loginUser(registeredUser.email, registeredUser.password);
        await authWorkflow.deleteCurrentUser();
      } catch (fallbackError) {
        console.error(`[afterEach] Cleanup failed for ${registeredUser.email}:`, fallbackError);
      }
    }
  });

  test('logs in with correct email and password', async ({ authWorkflow, homePage, page }, testInfo) => {
    await authWorkflow.loginUser(registeredUser.email, registeredUser.password);
    await homePage.expectLoggedInAs(registeredUser.name);
    await attachScreenshot(page, testInfo, 'logged-in-user-home');
  });

  test('fails to log in with incorrect password', async ({
    authWorkflow,
    loginPage,
    page
  }, testInfo) => {
    await authWorkflow.loginUser(registeredUser.email, 'wrongpassword');
    await loginPage.expectIncorrectLoginError();
    await attachScreenshot(page, testInfo, 'login-error');
  });
});
