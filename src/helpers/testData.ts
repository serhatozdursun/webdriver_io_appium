import capabilitiesJson from '../resources/test_data.json';

type TestData = {
  user_credentials: {
    valid_email: string;
    valid_password: string;
    invalid_email: string;
    invalid_format_email: string;
    invalid_password: string;
  };
  initial_order: number[];
  order_messages: {
    valid_order: string;
    invalid_order: string;
  };
};

/**
 * Reads and returns the entire TestData object.
 * @returns {TestData} The full test data object.
 */
export function getTestData(): TestData {
  return capabilitiesJson as TestData;
}
