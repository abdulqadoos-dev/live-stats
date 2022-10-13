import api from "./api";

export const getGames = profileId => {
    return api.get(`/games/${profileId}`)
    // return api.get(`/games`)
}

export const createGame = (formData) => {
    return api.post('/game/create', formData)
}

export const updateGame = (formData) => {
    return api.put(`/game/update/${formData.id}`, formData)
}

export const updateGameDetails = (formData) => {
    return api.put(`/game/update/${formData.id}/details`, {details:formData.details})
}

export const verifyGameScheduleTime = (formData) => {
    return api.post('/games/verify-schedule-time', formData)
}

export const getAllTeams = () => {
    return api.get('/teams');
}

export const getGamesBySportId = (sportId) => {
    return api.get('/games/sport/'+sportId);
}

export const getGameById = (id) => {
    return api.get('/game/'+id);
}

export const endGame = (id, data) => {
    return api.post(`/game/end-game/${id}`, data)
}