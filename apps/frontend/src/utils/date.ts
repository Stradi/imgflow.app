export function toReadableDate(date: string | Date) {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };

  return new Date(date).toLocaleDateString('en-US', options);
}

export function toRelativeDate(date: string | Date) {
  const relativeFormatter = new Intl.RelativeTimeFormat('en-us');

  const DIVISIONS = [
    { amount: 60, name: 'seconds' },
    { amount: 60, name: 'minutes' },
    { amount: 24, name: 'hours' },
    { amount: 7, name: 'days' },
    { amount: 4.34524, name: 'weeks' },
    { amount: 12, name: 'months' },
    { amount: Number.POSITIVE_INFINITY, name: 'years' },
  ];

  let duration = (new Date(date).getTime() - Date.now()) / 1000;

  for (let i = 0; i < DIVISIONS.length; i++) {
    const division = DIVISIONS[i];
    if (Math.abs(duration) < division.amount) {
      return relativeFormatter.format(Math.round(duration), division.name as Intl.RelativeTimeFormatUnit);
    }
    duration /= division.amount;
  }

  return relativeFormatter.format(Math.round(duration), 'years');
}

export function relativeTimeBetweenTwoDates(date1: Date, date2: Date) {
  const time = Math.abs(date1.getTime() - date2.getTime());
  let humanTime, units;
  if (time > 1000 * 60 * 60 * 24 * 365) {
    humanTime = parseInt((time / (1000 * 60 * 60 * 24 * 365)).toString(), 10);
    units = 'years';
  } else if (time > 1000 * 60 * 60 * 24 * 30) {
    humanTime = parseInt((time / (1000 * 60 * 60 * 24 * 30)).toString(), 10);
    units = 'months';
  } else if (time > 1000 * 60 * 60 * 24 * 7) {
    humanTime = parseInt((time / (1000 * 60 * 60 * 24 * 7)).toString(), 10);
    units = 'weeks';
  } else if (time > 1000 * 60 * 60 * 24) {
    humanTime = parseInt((time / (1000 * 60 * 60 * 24)).toString(), 10);
    units = 'days';
  } else if (time > 1000 * 60 * 60) {
    humanTime = parseInt((time / (1000 * 60 * 60)).toString(), 10);
    units = 'hours';
  } else if (time > 1000 * 60) {
    humanTime = parseInt((time / (1000 * 60)).toString(), 10);
    units = 'minutes';
  } else {
    humanTime = parseInt((time / 1000).toString(), 10);
    units = 'seconds';
  }

  return humanTime + ' ' + units;
}
