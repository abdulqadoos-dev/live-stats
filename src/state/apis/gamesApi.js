import api from "./api";

export const getGames = profileId => {
    // return api.get(`/games/${profileId}`)
    return api.get(`/games`)
}

export const createGame = (formData) => {
    return api.post('/game/create', formData)
}

export const verifyGameScheduleTime = (formData) => {
    return api.post('/games/verify-schedule-time', formData)
}
