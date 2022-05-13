import api from "./api";

export const getRosters = data => {
    return api.get('/players', data)
}
