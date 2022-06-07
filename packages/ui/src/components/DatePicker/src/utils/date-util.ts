export const getStartDateOfMonth = (year: number, month: number) => {
  const result = new Date(year, month, 1);
  const day = result.getDay();

  if (day === 0) {
    return prevDate(result, 7);
  } else {
    return prevDate(result, day);
  }
};

export const prevDate = (date: Date, amount = 1) => {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate() - amount);
};

export const nextDate = (date: Date, amount = 1) => {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate() + amount);
};

export const getFirstDayOfMonth = (date: Date) => {
  const temp = new Date(date.getTime());
  temp.setDate(1);
  return temp.getDay();
};

export const getDayCountOfMonth = (year: number, month: number) => {
  if (month === 3 || month === 5 || month === 8 || month === 10) {
    return 30;
  }

  if (month === 1) {
    if (year % 4 === 0 && year % 100 !== 0 || year % 400 === 0) {
      return 29;
    } else {
      return 28;
    }
  }

  return 31;
}

export const clearTime = (date: Date) => {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}