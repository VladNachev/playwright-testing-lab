import { expect, type Locator, type Page } from '@playwright/test';

import { BasePage } from './base.page';
import type { RegistrationUser } from '../types/user';

export class SignupPage extends BasePage {
  readonly enterAccountInformationHeader: Locator;
  readonly accountCreatedHeader: Locator;
  readonly accountDeletedHeader: Locator;
  readonly titleMrRadio: Locator;
  readonly titleMrsRadio: Locator;
  readonly passwordInput: Locator;
  readonly dayDropdown: Locator;
  readonly monthDropdown: Locator;
  readonly yearDropdown: Locator;
  readonly newsletterCheckbox: Locator;
  readonly offersCheckbox: Locator;
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly companyInput: Locator;
  readonly address1Input: Locator;
  readonly address2Input: Locator;
  readonly countryDropdown: Locator;
  readonly stateInput: Locator;
  readonly cityInput: Locator;
  readonly zipcodeInput: Locator;
  readonly mobileNumberInput: Locator;
  readonly createAccountButton: Locator;
  readonly continueButton: Locator;

  constructor(page: Page) {
    super(page);
    this.enterAccountInformationHeader = page.getByRole('heading', {
      name: 'Enter Account Information'
    });
    this.accountCreatedHeader = page.getByRole('heading', { name: 'Account Created!' });
    this.accountDeletedHeader = page.getByRole('heading', { name: 'Account Deleted!' });
    this.titleMrRadio = page.locator('#id_gender1');
    this.titleMrsRadio = page.locator('#id_gender2');
    this.passwordInput = page.locator('[data-qa="password"]');
    this.dayDropdown = page.locator('[data-qa="days"]');
    this.monthDropdown = page.locator('[data-qa="months"]');
    this.yearDropdown = page.locator('[data-qa="years"]');
    this.newsletterCheckbox = page.locator('#newsletter');
    this.offersCheckbox = page.locator('#optin');
    this.firstNameInput = page.locator('[data-qa="first_name"]');
    this.lastNameInput = page.locator('[data-qa="last_name"]');
    this.companyInput = page.locator('[data-qa="company"]');
    this.address1Input = page.locator('[data-qa="address"]');
    this.address2Input = page.locator('[data-qa="address2"]');
    this.countryDropdown = page.locator('[data-qa="country"]');
    this.stateInput = page.locator('[data-qa="state"]');
    this.cityInput = page.locator('[data-qa="city"]');
    this.zipcodeInput = page.locator('[data-qa="zipcode"]');
    this.mobileNumberInput = page.locator('[data-qa="mobile_number"]');
    this.createAccountButton = page.locator('[data-qa="create-account"]');
    this.continueButton = page.locator('[data-qa="continue-button"]');
  }

  async expectEnterAccountInformationVisible(): Promise<void> {
    await expect(this.enterAccountInformationHeader).toBeVisible();
  }

  async fillRegistrationForm(user: RegistrationUser): Promise<void> {
    if (user.title === 'Mr') {
      await this.titleMrRadio.check();
    } else {
      await this.titleMrsRadio.check();
    }

    await this.fill(this.passwordInput, user.password);
    await this.dayDropdown.selectOption(user.birthDay);
    await this.monthDropdown.selectOption(user.birthMonth);
    await this.yearDropdown.selectOption(user.birthYear);
    await this.newsletterCheckbox.check();
    await this.offersCheckbox.check();
    await this.fill(this.firstNameInput, user.firstName);
    await this.fill(this.lastNameInput, user.lastName);
    await this.fill(this.companyInput, user.company);
    await this.fill(this.address1Input, user.address1);
    await this.fill(this.address2Input, user.address2);
    await this.countryDropdown.selectOption({ label: user.country });
    await this.fill(this.stateInput, user.state);
    await this.fill(this.cityInput, user.city);
    await this.fill(this.zipcodeInput, user.zipcode);
    await this.fill(this.mobileNumberInput, user.mobileNumber);
  }

  async submitCreateAccount(): Promise<void> {
    await this.click(this.createAccountButton);
  }

  async expectAccountCreatedVisible(): Promise<void> {
    await expect(this.accountCreatedHeader).toBeVisible();
  }

  async expectAccountDeletedVisible(): Promise<void> {
    await expect(this.accountDeletedHeader).toBeVisible();
  }

  async continue(): Promise<void> {
    await this.click(this.continueButton);
  }
}
