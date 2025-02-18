import LoginScreen from '../pageobjects/login.screen.ts';
import { getTestData } from '../../helpers/testData.ts';
import OrderScreen from '../pageobjects/order.screen.ts';
import WdCommands from '../../wd/wdCommands.ts';

const wdCommands = new WdCommands();

const loginTestData = getTestData().user_credentials;
const orderTestData = getTestData().order_messages;

beforeEach(async () => {
  await wdCommands.activateApp();
});

afterEach(async () => {
  await wdCommands.closeApp();
});
describe('Login Functionality', () => {
  // Task: Testing email input validation
  it('should keep submit button disabled when email is missing', async () => {
    expect(await LoginScreen.isLoginScreenDisplayed()).toBe(true);

    await LoginScreen.typePassword(loginTestData.valid_password);
    expect(await LoginScreen.isSubmitButtonEnabled()).toBe(false);
  });

  // Task: Testing invalid email format
  it('should display invalid email message when invalid email format is entered', async () => {
    expect(await LoginScreen.isLoginScreenDisplayed()).toBe(true);

    await LoginScreen.typeEmail(loginTestData.invalid_format_email);
    expect(await LoginScreen.isEmailErrorDisplayed()).toBe(true);
  });

  // Task: Testing "Go" button state when password is missing
  it('should keep submit button disabled when password is missing', async () => {
    expect(await LoginScreen.isLoginScreenDisplayed()).toBe(true);

    await LoginScreen.typeEmail(loginTestData.valid_email);
    expect(await LoginScreen.isSubmitButtonEnabled()).toBe(false);
  });

  // Extra: Testing login with invalid credentials
  it('should not log in with invalid credentials and display login failed message', async () => {
    expect(await LoginScreen.isLoginScreenDisplayed()).toBe(true);

    await LoginScreen.typeEmail(loginTestData.invalid_email);
    await LoginScreen.typePassword(loginTestData.invalid_password);
    await LoginScreen.clickSubmitButton();

    expect(await LoginScreen.isLoginFailedDisplayed()).toBe(true);
  });

  // Task: Testing login with valid credentials
  it('should log in successfully with valid credentials and display logout button', async () => {
    expect(await LoginScreen.isLoginScreenDisplayed()).toBe(true);

    await LoginScreen.typeEmail(loginTestData.valid_email);
    await LoginScreen.typePassword(loginTestData.valid_password);
    await LoginScreen.clickSubmitButton();

    expect(await OrderScreen.isLogoutButtonDisplayed()).toBe(true);
  });
});

describe('App Functionality', () => {
  // Task: Testing persistence of login state after app restart
  it('should persist login state after app restart', async () => {
    expect(await OrderScreen.isLogoutButtonDisplayed()).toBe(true);
  });
});

describe('Order Items Functionality', () => {
  // Task: Test order status message for invalid order
  it('should display invalid order status message for invalid order', async () => {
    expect(
      await OrderScreen.isExpectedMessageDisplayed(orderTestData.invalid_order),
    ).toBe(true);
  });

  // Task: Test rearranging items into correct order and status message change
  it('should display correct status after rearranging items into the correct order', async () => {
    await OrderScreen.arrangeTheItems();
    expect(
      await OrderScreen.isExpectedMessageDisplayed(orderTestData.valid_order),
    ).toBe(true);
  });
  // Task: Test logout
  it('should log out successfully', async () => {
    await OrderScreen.clickLogoutButton();
    expect(await LoginScreen.isLoginScreenDisplayed()).toBe(true);
  });

  // Extra test: Test persistence of logout state after app restart
  it('should persist logout state after app restart', async () => {
    expect(await LoginScreen.isLoginScreenDisplayed()).toBe(true);
  });
});
