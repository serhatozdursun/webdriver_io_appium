import { DeviceNotDefined, InvalidCapabilities } from '../errors/errors.ts';
import { CapabilitiesData, loadCapabilitiesData } from './capabilities.ts';
import { getPlatformForDevice, Platform } from './platform.ts';
import path from 'node:path';

const extractDeviceFromArgs = (): string => {
  const deviceArg = process.argv.find((arg) => arg.startsWith('--device='));
  const device = deviceArg?.split('=')[1]?.toLowerCase();

  if (!device) {
    throw new DeviceNotDefined(
      'Please define a device with this pattern: --device={device_name}',
    );
  }

  return device;
};

const validateDevice = (
  device: string,
  capabilities: CapabilitiesData,
): void => {
  if (!capabilities[device]) {
    throw new InvalidCapabilities(
      `Invalid capabilities; ${device} not found in ./capabilities.json`,
    );
  }
};

const device = extractDeviceFromArgs();
const capabilitiesData = loadCapabilitiesData();

console.log(`Device: ${device}`);
console.log(`Capabilities Data: ${JSON.stringify(capabilitiesData, null, 2)}`);

validateDevice(device, capabilitiesData);

export const PLATFORM: Platform = getPlatformForDevice(
  device,
  capabilitiesData,
);

export const appId: string =
  PLATFORM === 'ios'
    ? capabilitiesData[device]['appium:bundleId']
    : capabilitiesData[device]['appium:appWaitPackage'];

const app: string = PLATFORM === 'ios' ? 'qetest.app' : 'android.apk';
const appPath: string = path.resolve(__dirname, `../../aut/${PLATFORM}`, app);

capabilitiesData[device]['appium:app'] = appPath;

export const deviceCapabilities = capabilitiesData[device];
