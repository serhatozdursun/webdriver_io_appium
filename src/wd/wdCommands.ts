import { appId } from '../conf/platformConfig.ts';
import Tesseract from 'tesseract.js';
import path from 'path';
import * as fs from 'node:fs';

class WdCommands {
  private readonly WAIT_TIME: number = 20000;

  /**
   * Waits for an element to exist within the specified timeout period.
   * @param element The WebdriverIO element to wait for.
   * @returns The element after it is confirmed to exist.
   * @throws Error if the element does not exist within the timeout period.
   */
  public async waitForExists(
    element: WebdriverIO.Element,
  ): Promise<WebdriverIO.Element> {
    try {
      await element.waitForExist({ timeout: this.WAIT_TIME });
      return element;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(
          `Failed to find element within ${this.WAIT_TIME}ms. Error: ${error.message}`,
        );
      }
      throw new Error(`Failed to find element within ${this.WAIT_TIME}ms.`);
    }
  }

  /**
   * Checks if an element is displayed after waiting for it to exist.
   * @param element The WebdriverIO element to check.
   * @returns A boolean indicating whether the element is displayed.
   * @throws Error if the element is not displayed or an error occurs while checking.
   */
  public async isDisplayed(element: WebdriverIO.Element): Promise<boolean> {
    try {
      const existingElement = await this.waitForExists(element);
      return existingElement.isDisplayed();
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(
          `Failed to check if element is displayed. Error: ${error.message}`,
        );
      }
      throw new Error('Failed to check if element is displayed.');
    }
  }

  /**
   * Checks if an element is displayed after waiting for it to exist.
   * @param element The WebdriverIO element to check.
   * @returns A boolean indicating whether the element is displayed.
   * @throws Error if the element is not displayed or an error occurs while checking.
   */
  public async isEnabled(element: WebdriverIO.Element): Promise<boolean> {
    try {
      const existingElement = await this.waitForExists(element);
      return existingElement.isEnabled();
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(
          `Failed to check if element is displayed. Error: ${error.message}`,
        );
      }
      throw new Error('Failed to check if element is displayed.');
    }
  }

  /**
   * Checks if an element is clickable after waiting for it to exist.
   * @param element The WebdriverIO element to check.
   * @returns A boolean indicating whether the element is clickable.
   * @throws Error if the element is not clickable or an error occurs while checking.
   */
  public async waitForDisplayed(
    element: WebdriverIO.Element,
  ): Promise<boolean> {
    try {
      await element.waitForDisplayed({ timeout: this.WAIT_TIME });
      return true;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(
          `Failed to check if element is clickable. Error: ${error.message}`,
        );
      }
      throw new Error('Failed to check if element is clickable.');
    }
  }

  /**
   * Checks if an element is clickable after waiting for it to exist.
   * @param element The WebdriverIO element to check.
   * @returns A boolean indicating whether the element is clickable.
   * @throws Error if the element is not clickable or an error occurs while checking.
   */
  public async waitForClickable(
    element: WebdriverIO.Element,
  ): Promise<boolean> {
    try {
      await driver.waitUntil(
        async function () {
          return await element.isEnabled();
        },
        {
          timeout: 5000,
          timeoutMsg: 'expected text to be different after 5s',
        },
      );
      return true;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(
          `Failed to check if element is clickable. Error: ${error.message}`,
        );
      }
      throw new Error('Failed to check if element is clickable.');
    }
  }

  /**
   * Clicks an element after waiting for it to be clickable.
   * @param element The WebdriverIO element to click.
   * @throws Error if the element is not clickable or an error occurs while clicking.
   */
  public async click(element: WebdriverIO.Element): Promise<void> {
    try {
      await this.waitForClickable(element);
      await element.click();
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to click element. Error: ${error.message}`);
      }
      throw new Error('Failed to click element.');
    }
  }

  /**
   * Sets a value to an input element after waiting for it to be clickable.
   * @param element The WebdriverIO element to set the value to.
   * @param value The value to set on the element (can be a string or number).
   * @throws Error if the element is not clickable, or an error occurs while setting the value.
   */
  public async setValue(
    element: WebdriverIO.Element,
    value: string | number,
  ): Promise<void> {
    try {
      await this.waitForClickable(element);
      await element.setValue(value);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(
          `Failed to set value on element. Error: ${error.message}`,
        );
      }
      throw new Error('Failed to set value on element.');
    }
  }

  /**
   * Gets the text of a specified element after waiting for it to be visible.
   * @param element The WebdriverIO element from which to get the text.
   * @returns The text content of the element.
   * @throws Error if the element is not visible, or an error occurs while getting the text.
   */
  public async getText(element: WebdriverIO.Element): Promise<string> {
    try {
      await this.waitForDisplayed(element);
      return await element.getText();
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(
          `Failed to get text from element. Error: ${error.message}`,
        );
      }
      throw new Error('Failed to get text from element.');
    }
  }

  /**
   * Queries the current state of the app on the device.
   *
   * @returns A Promise that resolves to a numeric app state:
   * - `0`: App is not installed.
   * - `1`: App is not running.
   * - `2`: App is running in the background (or suspended).
   * - `3`: App is running in the background.
   * - `4`: App is running in the foreground.
   *
   * @throws Error if querying the app state fails.
   */
  public async queryAppState(): Promise<number> {
    try {
      const appState = await driver.queryAppState(appId);
      console.log(`App state for ${appId}: ${appState}`);
      return appState;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(
          `Failed to query app state for ${appId}. Error: ${error.message}`,
        );
      }
      throw new Error(`Failed to query app state for ${appId}.`);
    }
  }

  /**
   * Terminates the app on the device.
   *
   * @returns Void. Logs a message if the app is already not running or terminated successfully.
   * @throws Error if an error occurs while terminating the app.
   */
  public async closeApp(): Promise<void> {
    // Check the app state and return early if it is already not running
    if ((await this.queryAppState()) === 1) {
      console.log(`App is already not running.`);
      return;
    }

    try {
      const result = await driver.terminateApp(appId);
      console.log(`App ${appId} terminated successfully: ${result}`);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(
          `Failed to terminate the app with ID: ${appId}. Error: ${error.message}`,
        );
      }
      throw new Error(`Failed to terminate the app with ID: ${appId}.`);
    }
  }

  /**
   * Activates the app on the device.
   * If the app state is not 4, it skips activation.
   * @throws Error if an error occurs while activating the app.
   */
  public async activateApp(): Promise<void> {
    // Check app state and return early if it is 4
    if ((await this.queryAppState()) === 4) {
      console.log(`App state is already running in foreground`);
      return;
    }

    try {
      // Proceed with activation only if the app state is 4
      await driver.activateApp(appId);
      console.log(`App ${appId} activated successfully.`);
    } catch (error) {
      // Handle errors during activation
      if (error instanceof Error) {
        throw new Error(
          `Failed to activate the app with ID: ${appId}. Error: ${error.message}`,
        );
      }
      throw new Error(`Failed to activate the app with ID: ${appId}.`);
    }
  }

  /**
   * Visually checks the screen for a specified text using OCR.
   * @param text The text to search for in the screenshot.
   * @returns True if the text is found, false otherwise.
   * @throws Error if an error occurs during the OCR process or screenshot capture.
   */
  public async visuallyCheckForText(text: string): Promise<boolean> {
    const screenshotDir = path.resolve(__dirname, '../../screenshot/');
    const screenshotPath = path.join(screenshotDir, 'screenshot.png');

    try {
      // Ensure the screenshot directory exists
      if (!fs.existsSync(screenshotDir)) {
        fs.mkdirSync(screenshotDir);
      }

      // Capture a screenshot
      await driver.saveScreenshot(screenshotPath);

      // Use Tesseract.js for OCR
      const result = await Tesseract.recognize(screenshotPath, 'eng', {
        logger: (m) => console.log(m),
      });

      // Extract text and verify
      const recognizedText = result.data.text;
      return recognizedText.includes(text);
    } catch (error) {
      console.error('Error during OCR process:', error);
      throw error;
    } finally {
      // Cleanup: Delete the screenshot
      if (fs.existsSync(screenshotPath)) {
        fs.unlinkSync(screenshotPath);
        console.log('Deleted screenshot file.');
      }
    }
  }

  public async longPress(
    element: WebdriverIO.Element,
    duration: number = 1000,
    offset: { x: number; y: number } = { x: 30, y: 10 },
  ): Promise<void> {
    try {
      // Wait for the element to be displayed
      await element.waitForDisplayed({ timeout: this.WAIT_TIME });

      // Ensure the element is interactable
      if (!(await element.isDisplayed())) {
        console.warn('Element is not displayed on the screen.');
      }

      if (!(await element.isEnabled())) {
        console.warn('Element is not enabled for interaction.');
      }

      // Perform the long press action
      await element.longPress({
        x: offset.x,
        y: offset.y,
        duration: duration,
      });

      console.log(
        `Long press action performed on element with duration ${duration}ms at offset {x: ${offset.x}, y: ${offset.y}}.`,
      );
    } catch (error) {
      // Log the error for debugging purposes
      console.error(
        `Failed to perform long press on element. Duration: ${duration}ms, Offset: {x: ${offset.x}, y: ${offset.y}}.`,
      );

      if (error instanceof Error) {
        throw new Error(
          `Long press action failed: ${error.message}. Ensure the element is interactable and visible.`,
        );
      } else {
        throw new Error(
          'An unknown error occurred during the long press action.',
        );
      }
    }
  }

  /**
   * Drags an element and drops it onto a target element with platform-specific logic.
   * @param sourceCenter The starting point for the touch action, defined by `x` and `y` coordinates.
   * @param targetCenter The target point for the touch action, defined by `x` and `y` coordinates.
   * @returns A Promise that resolves once the drag and drop operation is completed.
   * @throws Error if an error occurs during the drag and drop operation.
   */
  public async dragAndDropByCoordinates(
    sourceCenter: { x: number; y: number },
    targetCenter: { x: number; y: number },
  ): Promise<void> {
    const duration: number = 800;
    try {
      await driver
        .action('pointer', {
          parameters: { pointerType: 'touch' },
        })
        .move({ duration: duration, x: sourceCenter.x, y: sourceCenter.y })
        .down()
        .pause(duration)
        .move({ duration: duration, x: targetCenter.x, y: targetCenter.y })
        .up()
        .perform();
    } catch (error) {
      console.error('Error during drag and drop operation:', error);
      if (error instanceof Error) {
        throw new Error(
          `Failed to perform drag and drop. Error: ${error.message}`,
        );
      } else {
        throw new Error(
          'An unknown error occurred during the drag and drop operation.',
        );
      }
    }
  }
}

export default WdCommands;
