import apiUrl from '../apiConfig';
import axios from 'axios';

// index function
export const getAllSoccerTeams = () => {
  return axios(`${apiUrl}/soccerTeams`);
};

// show function
export const getOneSoccerTeam = (teamId) => {
  return axios(`${apiUrl}/soccerTeams/${teamId}`);
};

// POST -> create function
export const createSoccerTeam = (user, newTeam) => {
  console.log('user', user);
  console.log('this is newTeam', newTeam);
  return axios({
    url: `${apiUrl}/soccerTeams`,
    method: 'POST',
    headers: {
      Authorization: `Token token=${user.token}`,
    },
    data: { soccerTeam: newTeam },
  });
};

// PATCH -> update function
export const updateSoccerTeam = (user, updatedTeam) => {
  console.log('user', user);
  console.log('this is newTeam', updatedTeam);
  return axios({
    url: `${apiUrl}/soccerTeams/${updatedTeam.id}`,
    method: 'PATCH',
    headers: {
      Authorization: `Token token=${user.token}`,
    },
    data: { soccerTeam: updatedTeam },
  });
};

// DELETE -> remove function
export const removeSoccerTeam = (user, teamId) => {
  console.log('user', user);
  return axios({
    url: `${apiUrl}/soccerTeams/${teamId}`,
    method: 'DELETE',
    headers: {
      Authorization: `Token token=${user.token}`,
    },
  });
};
