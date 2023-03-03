export function experienceCalculator(startDate) {
  startDate = new Date(startDate);
  let endDate = new Date();

  let years = endDate.getFullYear() - startDate.getFullYear();
  let months = endDate.getMonth() - startDate.getMonth();
  if (months < 0) {
    years--;
    months += 12;
  }
  if (years !== 0) {
    return `${years} year ${months} months`;
  } else {
    return `${months} months`;
  }
}
