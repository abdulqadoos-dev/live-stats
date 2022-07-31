import api from "./api";

export const createMatch = (formData) => {
    return api.post('/match/create', formData)
}

export const updateMatch = (formData) => {
    return api.post(`/match/update/${formData.id}`, formData)
}
//
// export const getGameById = (id) => {
//     return api.get(`/matches/game/${id}`)
// }

export const getMatchByGameId = (id) => {
    return api.get(`/matches/game/${id}`)
}

