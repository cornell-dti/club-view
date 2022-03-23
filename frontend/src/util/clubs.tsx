import { ClubType, StatusType } from '../../../backend/types/types';

const getStatus = async (cid: string) => {
  const club = await fetch(`https://localhost:8000/clubs/${cid}`)
    .then((res) => res.json())
    .then((data) => {
      return data as ClubType;
    });
  return club.status as StatusType;
};

export { getStatus };
