import api from "./api";

export const getRosters = profileId => {
    return api.get(`/players/${profileId}`, )
}
