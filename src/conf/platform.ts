import { CapabilitiesData } from './capabilities.ts';

export type Platform = 'ios' | 'android';

export const getPlatformForDevice = (
  device: string,
  capabilities: CapabilitiesData,
): Platform => {
  const platformName = capabilities[device]['platformName'];
  if (!platformName) {
    throw new Error(`Platform name is missing for device: ${device}`);
  }

  return platformName.toLowerCase() === 'android' ? 'android' : 'ios';
};
