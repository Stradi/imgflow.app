export const PRODUCT_TO_ID: Record<string, string> = {
  subscription: '74511',
};

export const SUBSCRIPTION_VARIANT_TO_ID: Record<string, string> = {
  'basic-500': '76468',
  'scale-1000': '76483',
  'scale-2500': '76487',
  'scale-5000': '76488',
  'scale-10000': '76489',
  'business-50000': '76490',
};

export const SUBSCRIPTION_VARIANT_TO_READABLE: Record<string, string> = {
  'basic-500': 'Basic Plan (500 Credits)',
  'scale-1000': 'Scale Plan (1,000 Credits)',
  'scale-2500': 'Scale Plan (2,500 Credits)',
  'scale-5000': 'Scale Plan (5,000 Credits)',
  'scale-10000': 'Scale Plan (10,000 Credits)',
  'business-50000': 'Business Plan (50,000 Credits)',
};

export const SUBSCRIPTION_VARIANT_TO_DESCRIPTION: Record<string, string> = {
  'basic-500': 'This plan includes <b>500</b> credits per month.',
  'scale-1000':
    'This plan includes <b>1,000</b> credits per month. By subscribing this plan, you are saving <b>10%</b> compared to the Basic Plan.',
  'scale-2500':
    'This plan includes <b>2,500</b> credits per month. By subscribing this plan, you are saving <b>15%</b> compared to the Basic Plan.',
  'scale-5000':
    'This plan includes <b>5,000</b> credits per month. By subscribing this plan, you are saving <b>25%</b> compared to the Basic Plan.',
  'scale-10000':
    'This plan includes <b>10,000</b> credits per month. By subscribing this plan, you are saving <b>40%</b> compared to the Basic Plan.',
  'business-50000':
    'This plan includes <b>50,000</b> credits per month. By subscribing this plan, you are saving <b>50%</b> compared to the Basic Plan.',
};

export const SUBSCRIPTION_VARIANT_TO_CREDITS: Record<string, number> = {
  'basic-500': 500,
  'scale-1000': 1000,
  'scale-2500': 2500,
  'scale-5000': 5000,
  'scale-10000': 10000,
  'business-50000': 50000,
};
