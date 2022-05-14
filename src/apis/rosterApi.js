import api from "./api";

export const getRosters = profileId => {
    return api.get(`/players/${profileId}`, )
}

export const saveRosters = (profileId, rosters) => {
    return api.post('/players',{teamId:profileId, rosters})
}
