export function getLastWeeksData(
  data: any,
  currentDate: Date,
  _: string[],
  count: number
) {
  return Array.from({ length: count }, (_, index) => {
    const startDate = new Date(currentDate);
    startDate.setDate(startDate.getDate() - (index + 1) * 7); // Restar semanas completas
    const endDate = new Date(currentDate);
    endDate.setDate(endDate.getDate() - index * 7); // Fin de la semana actual

    const weekData = data.filter((item: any) => {
      const itemDate = item.date;
      return itemDate >= startDate && itemDate < endDate;
    });

    const weekLabel = `Semana ${4 - index}`;

    if (weekData.length > 0) {
      const maxScore = Math.max(...weekData.map((item: any) => item.score));
      return [weekLabel, maxScore];
    } else {
      return [weekLabel, null];
    }
  }).reverse();
}

export function getLastMonthsData(data:any, months:any) {
  // Inicializar un objeto para almacenar el máximo de cada mes
  const maxScoresByMonth:any = {};

  const currentDate = new Date();

  // Iterar sobre los datos y actualizar el máximo de cada mes
  data.forEach((entry:any) => {
    const entryDate = new Date(entry.date);
    const monthKey = months[entryDate.getMonth()];

    if (!maxScoresByMonth[monthKey] || entry.score > maxScoresByMonth[monthKey]) {
      maxScoresByMonth[monthKey] = entry.score;
    }
  });

  // Obtener los últimos 5 meses (hacia atrás desde la fecha actual)
  const lastFiveMonths = [];
  let monthsCounter = 0;
  let currentMonthIndex = currentDate.getMonth();

  while (monthsCounter < 5) {
    const currentMonthKey = months[currentMonthIndex];
    const maxScore = maxScoresByMonth[currentMonthKey] || null;

    lastFiveMonths.unshift([currentMonthKey, maxScore]);

    currentMonthIndex = (currentMonthIndex - 1 + 12) % 12; // Manejar el cambio de año
    monthsCounter++;
  }

  return lastFiveMonths;
}




export function getLastDaysData(
  data: any,
  currentDate: Date,
  dayNames: string[],
  count: number
) {
  return Array.from({ length: count }, (_, index) => {
    const date = new Date(currentDate);
    date.setDate(date.getDate() - index);
    const formattedDate = date.toLocaleDateString();
    const dayName = dayNames[date.getDay()];
    const dayData = data.filter(
      (item: any) => item.date.toLocaleDateString() === formattedDate
    );

    if (dayData.length > 0) {
      const maxScore = Math.max(...dayData.map((item: any) => item.score));
      return [dayName, maxScore];
    } else {
      return [dayName, null];
    }
  }).reverse();
}

export const dayNamesSp = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];
export const monthNamesSp = [
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Septiembre",
  "Octubre",
  "Noviembre",
  "Diciembre",
];
export const dayNamesEn = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
export const monthNamesEn = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
