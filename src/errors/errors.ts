export class DeviceNotDefined extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'DeviceNotDefined';
  }
}

export class InvalidCapabilities extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'InvalidCapabilities';
  }
}

export class PlatformNotDefined extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'PlatformNotDefined';
  }
}
