export default function isDateAfterTomorrow(inputDate: string): boolean {
  // Crea una instancia de fecha de "mañana"
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);
  tomorrow.setHours(0, 0, 0, 0);

  // Convierte la fecha de entrada si es una cadena
  const dateToCheck = new Date(inputDate);
  dateToCheck.setHours(0, 0, 0, 0); // Establece también a medianoche

  // Retorna true si la fecha de entrada es igual o después de mañana
  return dateToCheck >= tomorrow;
}