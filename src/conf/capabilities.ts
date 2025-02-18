import capabilitiesJson from '../resources/capabilities.json';

export type CapabilitiesData = {
  [key: string]: {
    [key: string]: string;
  };
};

export const loadCapabilitiesData = (): CapabilitiesData => capabilitiesJson;
