import api from "./api";

export const createFanProfile = data => {
    return api.post('/profile', data)
}
