import api from "./api";

export const createMatch = (formData) => {
    return api.post('/match/create', formData)
}

export const updateMatch = (formData) => {
    return api.post(`/match/update/${formData.id}`, formData)
}

export const getMatchByGameId = (id) => {
    return api.get(`/matches/game/${id}`)
}

export const endMatch = (id, data) => {
    return api.post(`/match/end-match/${id}`, data)
}

