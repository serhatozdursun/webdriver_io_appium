import * as fs from 'fs';
import * as path from 'path';
import { PLATFORM } from '../conf/platformConfig.ts';

// Custom Exception for Locator Not Found
class LocatorNotFoundError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'LocatorNotFoundError';
  }
}

// Custom Exception for File Read Error
class FileReadError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'FileReadError';
  }
}

// Define an interface for the structure of your JSON file
interface LocatorData {
  [key: string]: {
    ios: string;
    android: string;
  };
}

class Locators {
  private readonly locators: LocatorData | null = null;
  constructor(fileName: string) {
    // Load the locators when an instance is created
    this.locators = this.loadLocators(fileName);
  }

  // Method to load locators from a JSON file
  private loadLocators(fileName: string): LocatorData | null {
    const resourcePath = path.resolve(__dirname, '../../src/locators');
    const filePath = path.join(resourcePath, fileName);

    try {
      const data = fs.readFileSync(filePath, 'utf-8');
      return JSON.parse(data);
    } catch (error) {
      const err = error as NodeJS.ErrnoException; // Explicitly cast to NodeJS.ErrnoException
      if (err.code === 'ENOENT') {
        // Handle file not found specifically
        throw new FileReadError(
          `File "${fileName}" not found under path "${resourcePath}". Please ensure the file exists.`,
        );
      } else {
        {
          // Handle general parsing or other file-related errors
          throw new FileReadError(
            `Error reading or parsing the file "${fileName}" at path "${resourcePath}": ${err.message}`,
          );
        }
      }
    }
  }

  // Method to get the locator for a specific screen and platform
  public getLocator(locator: string): string {
    if (this.locators && this.locators[locator]) {
      const platformLocator = this.locators[locator][PLATFORM];
      if (!platformLocator) {
        throw new LocatorNotFoundError(
          `Locator for screen "${locator}" and platform "${PLATFORM}" not found.`,
        );
      }
      return platformLocator;
    }
    throw new LocatorNotFoundError(
      `Locator for screen "${locator}" not found.`,
    );
  }
}

export default Locators;
