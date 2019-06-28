export default interface BeautySalon {
  id: string;
  name: string;
  schedule: Array<{
    open: string;
    close: string;
  }>;
  shiftBasedOnCalendar: boolean;
  shiftBasedOnSchedule: boolean;
}
