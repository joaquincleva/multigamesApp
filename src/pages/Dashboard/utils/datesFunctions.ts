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

export function getLastMonthsData(
  data: any,
  currentDate: Date,
  monthNames: string[],
  count: number
) {
  return Array.from({ length: count }, (_, index) => {
    const startDate = new Date(currentDate);
    startDate.setMonth(startDate.getMonth() - index);
    const endDate = new Date(currentDate);
    endDate.setMonth(endDate.getMonth() - (index - 1));

    const monthData = data.filter((item: any) => {
      const itemDate = new Date(item.date);
      return itemDate >= startDate && itemDate < endDate;
    });

    const monthLabel = monthNames[currentDate.getMonth() - index];

    if (monthData.length > 0) {
      const maxScore = Math.max(...monthData.map((item: any) => item.score));
      return [monthLabel, maxScore];
    } else {
      return [monthLabel, null];
    }
  }).reverse();
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

export const dayNames = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];
export const monthNames = [
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
