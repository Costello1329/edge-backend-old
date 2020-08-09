export function addMinutes(minutes: number): Date {
  const today = new Date();
  return new Date(today.getTime() + minutes * 60000);
}

export function minutesInMillis(minutes: number): number {
  return minutes * 60 * 1000;
}

export function timestampInSeconds(): number {
  return Math.floor(Date.now() / 1000);
}

export function secondsBetweenDates(start: Date, end: Date): number {
  return (end.getTime() - start.getTime()) / 1000;
}
