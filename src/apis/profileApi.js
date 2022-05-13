import api from "./api";

export const createFanProfile = data => {
    return api.post('/profile', data)
}

export const createTeamProfile = data => {
    return api.post('/team', data)
}
