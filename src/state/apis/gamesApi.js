import api from "./api";

export const getGames = profileId => {
    // return api.get(`/games/${profileId}`)
    return api.get(`/games`)
}

export const createGame = (formData) => {
    return api.post('/game/create', formData)
}
