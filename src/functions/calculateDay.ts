export const calculateDayFromDate = (d: number = 1, m: number = 1, y: number = 2000, h: number = 0): number => {
    const val = 367 * y - 7 * ( y + (m + 9)/12 ) / 4 - 3 * ( ( y + (m - 9)/7 ) / 100 + 1 ) / 4 + 275 * m/9 + d - 730515;
    return val + h / 24;
};
