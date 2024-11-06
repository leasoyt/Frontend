export default function isDateAfterTomorrow(inputDate: string): boolean {
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);
  tomorrow.setHours(0, 0, 0, 0);

  const dateToCheck = new Date(inputDate);
  dateToCheck.setHours(0, 0, 0, 0);

  return dateToCheck >= tomorrow;
}