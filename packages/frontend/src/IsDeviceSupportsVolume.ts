import {Device} from "@spotify/web-api-ts-sdk";

export function isDeviceSupportsVolume(device: Device) {
    let supportsVolume = (device as any)['supports_volume'];
    return [undefined, true].includes(supportsVolume);
}