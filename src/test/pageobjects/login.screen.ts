import { $ } from '@wdio/globals';
import Locators from '../../helpers/locators.ts';
import WdCommands from '../../wd/wdCommands.ts';

class LoginScreen extends Locators {
  private wdCommands: WdCommands;

  constructor(locatorsFile: string) {
    super(locatorsFile);
    this.wdCommands = new WdCommands(); // Initialize WdCommands instance
  }

  public get loginScreen() {
    return $(this.getLocator('login_screen')).getElement();
  }

  public get emailInput() {
    return $(this.getLocator('email_input')).getElement();
  }

  public get passwordInput() {
    return $(this.getLocator('password_input')).getElement();
  }

  public get submitButton() {
    return $(this.getLocator('submit_button')).getElement();
  }

  public get emailError() {
    return $(this.getLocator('email_error')).getElement();
  }

  public get loginFailed() {
    return $(this.getLocator('login_failed')).getElement();
  }

  public async isLoginScreenDisplayed(): Promise<boolean> {
    return this.wdCommands.isDisplayed(await this.loginScreen);
  }

  public async isEmailErrorDisplayed(): Promise<boolean> {
    return this.wdCommands.isDisplayed(await this.emailError);
  }

  public async getEmailErrorValue(): Promise<string> {
    return this.wdCommands.getText(await this.emailError);
  }

  public async isLoginFailedDisplayed(): Promise<boolean> {
    return this.wdCommands.isDisplayed(await this.loginFailed);
  }

  public async typeEmail(email: string): Promise<void> {
    await this.wdCommands.setValue(await this.emailInput, email);
  }

  public async typePassword(password: string): Promise<void> {
    await this.wdCommands.setValue(await this.passwordInput, password);
  }

  public async clickSubmitButton(): Promise<void> {
    await this.wdCommands.click(await this.submitButton);
  }

  public async isSubmitButtonEnabled(): Promise<boolean> {
    return await this.wdCommands.isEnabled(await this.submitButton);
  }
}

export default new LoginScreen('login_screen_locators.json');
