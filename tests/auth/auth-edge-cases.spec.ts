import { test } from '../../src/fixtures/test-fixtures';

test.describe('Authentication - edge cases and session flow', () => {
  test('Test Case 3: Login User with incorrect email and password', async ({
    authWorkflow,
    homePage,
    loginPage
  }) => {
    await homePage.open();
    await homePage.expectLoaded();
    await homePage.goToSignupLogin();
    await loginPage.expectLoginVisible();
    await authWorkflow.loginFromCurrentPage('incorrect_user@example.com', 'WrongPassword123!');
    await loginPage.expectIncorrectLoginError();
  });

  test('Test Case 4: Logout User', async ({
    authWorkflow,
    homePage,
    registrationUser
  }) => {
    await authWorkflow.registerUser(registrationUser);
    await homePage.expectLoggedInAs(registrationUser.name);
    await authWorkflow.logoutUser();
  });

  test('Session persists after page reload', async ({
    authWorkflow,
    homePage,
    registrationUser
  }) => {
    await authWorkflow.registerUser(registrationUser);
    await homePage.expectLoggedInAs(registrationUser.name);
    await homePage.reload();
    await homePage.expectLoggedInAs(registrationUser.name);
    await authWorkflow.deleteCurrentUser();
  });

  test('Test Case 5: Register User with existing email', async ({
    authWorkflow,
    homePage,
    loginPage,
    registrationUser
  }) => {
    await authWorkflow.registerUser(registrationUser);
    await authWorkflow.logoutUser();
    await loginPage.signup(registrationUser.name, registrationUser.email);
    await loginPage.expectExistingEmailError();
    await authWorkflow.loginFromCurrentPage(registrationUser.email, registrationUser.password);
    await homePage.expectLoggedInAs(registrationUser.name);
    await authWorkflow.deleteCurrentUser();
  });
});
