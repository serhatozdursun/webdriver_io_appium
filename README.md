# Tutorial Project For WebdriverIO & Appium

This repository demonstrates a test automation project built using **WebDriverIO** for UI testing and **Appium** for mobile device automation. It includes a streamlined test framework with linting, formatting, and reporting capabilities to deliver robust and maintainable automation solutions. The project follows the **Page Object Model (POM)** design pattern for better maintainability and scalability.

## Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Setup and Installation](#setup-and-installation)
- [Usage](#usage)
- [Scripts](#scripts)
- [Allure Reports](#allure-reports)
- [Locator Management](#locator-management)
- [License](#license)

---

## Features

- Built with WebDriverIO for modern UI and mobile automation testing.
- Supports **Appium** for cross-platform mobile testing.
- Configured with **TypeScript** for type safety.
- **Allure Reporting** for detailed, interactive test reports.
- **ESLint** and **Prettier** for linting and code formatting.
- Follows **Page Object Model (POM)** design pattern for better test maintainability.
- Easy customization for running tests on different devices using environment variables.

---

## Prerequisites

To run this project, ensure the following tools are installed on your machine:

1. **Node.js** (v16 or above)
2. **Yarn** (preferred package manager)
3. **Java** (required for Appium)
4. **Appium Server** (version 2.x.x or later)

---

## Setup and Installation

1. Clone this repository:

   ```bash
   git clone git@github.com:feeld-hiring/qe-take-home-serhat.git
   ```

2. Navigate to the project directory:

   ```bash
   cd qe-take-home-serhat
   ```

3. Install dependencies:
   ```bash
   yarn install
   ```

---

## Usage

### Running Tests

You can run the tests using the following command:

```bash
yarn wdio:test --device=<device_name>
```

Replace `<device_name>` with the desired device configuration, e.g., `xiaomi_note_8_pro_android_11`.

Device capabilities should be defined in the `~/src/resources/capabilities.json` file.

### Customizing Test Runs

The device can also be specified by editing the `wdio.conf.ts` file or using the `--device` flag directly in the CLI.

---

## Scripts

The following scripts are available in the project:

- **Run Tests:**

  ```bash
  yarn wdio:test --device=<device_name>
  ```

  Executes the WebDriverIO test suite.

- **Lint Code:**

  ```bash
  yarn lint
  ```

  Checks the code for linting issues using ESLint.

- **Fix Lint Issues:**

  ```bash
  yarn lint:fix
  ```

  Automatically fixes linting issues.

- **Format Code:**

  ```bash
  yarn format
  ```

  Formats the codebase using Prettier.

- **Check Code Formatting:**

  ```bash
  yarn format:check
  ```

  Checks if the code is formatted correctly.

- **Generate Report:**

  ```bash
  yarn report:generate
  ```

  Generates an Allure report from the test results.

- **Open Report:**
  ```bash
  yarn report:open
  ```
  Opens the generated Allure report in a browser.

---

## Allure Reports

This project integrates **Allure Reporting** to visualize test results.

1. To generate a report after running the tests:

   ```bash
   yarn report:generate
   ```

2. To view the report:
   ```bash
   yarn report:open
   ```

The report includes detailed logs, screenshots (if enabled), and test execution results.

---

## Locator Management

Since this project is designed to support both **iOS** and **Android** testing, locators for UI elements are stored in a JSON format, allowing for easy management and access across both platforms. The JSON file contains specific locators for both **iOS** and **Android**, ensuring the tests work on both platforms seamlessly.

### Example of Locator JSON Format:

The locators for various UI elements are stored in the `helper/locator.json` file. Here is a simplified version of the JSON:

```json
{
  "order_status_message": {
    "ios": "~orderStatusMessage",
    "android": "android=new UiSelector().resourceId("orderStatusMessage")"
  },
  "item_1": {
    "ios": "-ios class chain:**/XCUIElementTypeOther[`label == "item-1"`][3]",
    "android": "~item-1"
  }
}
```

### Usage Example (in Page Object Model):

In a **Page Object Model (POM)** project, locators are accessed in the page objects as shown below:

```typescript
public get orderStatusMessage() {
  return $(this.getLocator('order_status_message')).getElement();
}
```

By using this approach, you can easily manage and update locators for both platforms without modifying the test scripts directly. The **POM** structure ensures maintainability, as locators are abstracted away from the tests.

---

## Testing Considerations

### Invalid Email Format (iOS)

For the **Invalid Email Format** test, it was noted that the text associated with invalid email input validation was not accessible in the Appium source for iOS. After downloading the source as XML via Appium Inspector, it was confirmed that the text is not retrievable through Appium's standard methods.

As a workaround, **Tesseract.js** was utilized to perform Optical Character Recognition (OCR) on the visual content of the app. This allowed the text to be verified as an image, enabling the test to check the email input validation more effectively for iOS.

### Order Status Message (iOS)

Similarly, the **Order Status Message** was not readable for iOS as the text could not be retrieved from the source (verified through Appium Inspector). As a result, **Tesseract.js** was used to visually capture and verify the order status message, ensuring the functionality was properly tested.

---

## License

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for details.
