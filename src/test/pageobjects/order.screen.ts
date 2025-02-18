import Locators from '../../helpers/locators.ts';
import WdCommands from '../../wd/wdCommands.ts';
import { $ } from '@wdio/globals';
import { PLATFORM } from '../../conf/platformConfig.ts';

class OrderScreen extends Locators {
  constructor(locatorsFile: string) {
    super(locatorsFile);
    this.wdCommands = new WdCommands(); // Correct initialization
  }

  private wdCommands: WdCommands;

  public get orderStatusMessage() {
    return $(this.getLocator('order_status_message')).getElement();
  }

  public get logoutButton() {
    return $(this.getLocator('logout_button')).getElement();
  }

  public getItem1() {
    return $(this.getLocator('item_1'));
  }
  public async isLogoutButtonDisplayed(): Promise<boolean> {
    return this.wdCommands.isDisplayed(await this.logoutButton);
  }

  public async isExpectedMessageDisplayed(message: string): Promise<boolean> {
    if (PLATFORM === 'ios') {
      return this.wdCommands.visuallyCheckForText(message);
    } else {
      const actuallyMessage: string = await this.wdCommands.getText(
        await this.orderStatusMessage,
      );
      return message === actuallyMessage;
    }
  }

  public async arrangeTheItems(): Promise<void> {
    const sourceSize = await this.getItem1().getSize();
    const sourceLocation = await this.getItem1().getLocation();

    const sourceCenter = {
      x: Math.floor(sourceLocation.x + sourceSize.width / 2),
      y: Math.floor(sourceLocation.y + sourceSize.height / 2),
    };

    const targetCenter = {
      x: Math.floor((sourceLocation.x + sourceSize.width / 2) * 0.1),
      y: Math.floor(sourceLocation.y + sourceSize.height / 2),
    };
    if (PLATFORM === 'ios') {
      await this.wdCommands.longPress(await this.getItem1().getElement());
    }
    // Perform the drag and drop
    await this.wdCommands.dragAndDropByCoordinates(sourceCenter, targetCenter);
  }

  public async clickLogoutButton(): Promise<void> {
    await this.wdCommands.click(await this.logoutButton);
  }
}

export default new OrderScreen('order_screen_locators.json');
