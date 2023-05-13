import { VARIANT_ID_TO_SUBSCRIPTION } from './checkout';

export function getPipelineLimitForSubscription(variantId: string) {
  const subscriptionName = VARIANT_ID_TO_SUBSCRIPTION[variantId];
  if (!subscriptionName) {
    return 0;
  }

  switch (subscriptionName) {
    case 'basic-500':
      return 2;
    case 'scale-1000':
    case 'scale-2500':
    case 'scale-5000':
    case 'scale-10000':
      return 25;
    case 'business-50000':
      return 100;
    default:
      return 0;
  }
}

export function prettyBytes(bytes: number, siUnits = true, decimalPlaces = 1) {
  const thresh = siUnits ? 1000 : 1024;

  if (Math.abs(bytes) < thresh) {
    return bytes + ' B';
  }

  const units = siUnits
    ? ['kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
    : ['KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB'];
  let u = -1;
  const r = 10 ** decimalPlaces;

  do {
    bytes /= thresh;
    ++u;
  } while (Math.round(Math.abs(bytes) * r) / r >= thresh && u < units.length - 1);

  return bytes.toFixed(decimalPlaces) + ' ' + units[u];
}

export function getPipelineFilesizeLimitForSubscription(variantId: string) {
  const subscriptionName = VARIANT_ID_TO_SUBSCRIPTION[variantId];
  if (!subscriptionName) {
    return 5_000_000; // bytes == 5 Mb
  }

  switch (subscriptionName) {
    case 'basic-500':
      return 50_000_000; // bytes == 50 Mb
    case 'scale-1000':
    case 'scale-2500':
    case 'scale-5000':
    case 'scale-10000':
      return 500_000_000; // bytes == 500 Mb
    case 'business-50000':
      return 1_000_000_000; // bytes == 1 Gb
    default:
      return 5_000_000; // bytes == 5 Mb
  }
}

export function getConcurrentJobLimitForSubscription(variantId: string) {
  const subscriptionName = VARIANT_ID_TO_SUBSCRIPTION[variantId];
  if (!subscriptionName) {
    return 1;
  }

  switch (subscriptionName) {
    case 'basic-500':
      return 5;
    case 'scale-1000':
    case 'scale-2500':
    case 'scale-5000':
    case 'scale-10000':
      return 25;
    case 'business-50000':
      return 100;
    default:
      return 1;
  }
}

export function getJobPriorityForSubscription(variantId: string) {
  const subscriptionName = VARIANT_ID_TO_SUBSCRIPTION[variantId];
  if (!subscriptionName) {
    return 5;
  }

  switch (subscriptionName) {
    case 'basic-500':
      return 4;
    case 'scale-1000':
    case 'scale-2500':
    case 'scale-5000':
    case 'scale-10000':
      return 3;
    case 'business-50000':
      return 2;
    default:
      return 5;
  }
}
