import { Club, StatusType } from './types';

const getStatus = async (
  cid: string,
  callback: (status: StatusType) => void
) => {
  const club = await fetch(`https://localhost:8000/clubs/${cid}`)
    .then((res) => res.json())
    .then((data) => {
      return data as Club;
    });
  const status = club.status as StatusType;
  callback(status);
};

export { getStatus };
