import api from "./api";

export const createMatch = (formData) => {
    return api.post('/match/create', formData)
}