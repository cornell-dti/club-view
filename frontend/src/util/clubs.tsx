import { Club } from './types';

const getStatus = (club: Club) => {
  const now = new Date();
  const startDate = club.openDate ? new Date(club.openDate) : undefined;
  const weekBefore = startDate ? new Date(startDate.getDate() - 7) : undefined;

  const endDate = club.closeDate ? new Date(club.closeDate) : undefined;

  if (!startDate) {
    if (!endDate) {
      // startDate === endDate === undefined
      return 'ALWAYS_OPEN';
    }
  } else {
    // start date is defined, if enddate is not defined or is after today, mark club as currently open
    if (!endDate || (startDate <= now && endDate >= now)) {
      if (!weekBefore) {
        console.log('week before is not a valid date');
      } else if (weekBefore <= now && now <= startDate) {
        return 'APPROACHING';
      }
      return 'OPEN';
    }
    // start date is defined, if it is after now, or enddate is before now, mark club as closed
    else if (startDate >= now || endDate <= now) {
      return 'CLOSED';
    }
  }
};

export { getStatus };
