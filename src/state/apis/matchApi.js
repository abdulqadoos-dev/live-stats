import api from "./api";

export const createMatch = (formData) => {
    return api.post('/match/create', formData)
}

export const updateMatch = (formData) => {
    return api.post(`/match/update/${formData.matchId}`, formData)
}
//
// export const getGameById = (id) => {
//     return api.get(`/matches/game/${id}`)
// }

export const getMatchByGameId = (id) => {
    return api.get(`/matches/game/${id}`)
}

export const agetMatch = (id) => {
    // return api.post('/match/create', id)
    return {
        data: {
            match: {
                "gameId": 21,
                "matchDuration": {},
                "matchPlayers": {
                    "mainTeamRosters": [{
                        "id": 8,
                        "teamId": 2,
                        "name": "jarry",
                        "number": "90",
                        "height": "6'56\"",
                        "weight": "95 lb",
                        "position": " top right",
                        "createdAt": "2022-07-05T07:15:07.258Z",
                        "updatedAt": "2022-07-05T07:15:07.258Z"
                    }, {
                        "id": 9,
                        "teamId": 2,
                        "name": "hike",
                        "number": "10",
                        "height": "5'77\"",
                        "weight": "70 lb",
                        "position": "top left",
                        "createdAt": "2022-07-05T07:15:07.268Z",
                        "updatedAt": "2022-07-05T07:15:07.268Z"
                    }, {
                        "id": 11,
                        "teamId": 2,
                        "name": "sharied",
                        "number": "68",
                        "height": "6'85\"",
                        "weight": "90 lb",
                        "position": "right",
                        "createdAt": "2022-07-05T07:15:07.277Z",
                        "updatedAt": "2022-07-05T07:15:07.277Z"
                    }, {
                        "id": 10,
                        "teamId": 2,
                        "name": "votson",
                        "number": "25",
                        "height": "6'70\"",
                        "weight": "85 lb",
                        "position": "left",
                        "createdAt": "2022-07-05T07:15:07.273Z",
                        "updatedAt": "2022-07-05T07:15:07.273Z"
                    }, {
                        "id": 13,
                        "teamId": 2,
                        "name": "forgy",
                        "number": "12",
                        "height": "9'10\"",
                        "weight": "130 lb",
                        "position": "bottom",
                        "createdAt": "2022-07-05T07:15:07.286Z",
                        "updatedAt": "2022-07-05T07:15:07.286Z"
                    }],
                    "opponentTeamRosters": [{
                        "id": 1,
                        "teamId": 1,
                        "name": "abdul qadoos",
                        "number": "100",
                        "height": "6'53\"",
                        "weight": "78 lb",
                        "position": " top right",
                        "createdAt": "2022-07-05T07:04:18.227Z",
                        "updatedAt": "2022-07-05T07:04:18.227Z"
                    }, {
                        "id": 3,
                        "teamId": 1,
                        "name": "faisal",
                        "number": "102",
                        "height": "6'70\"",
                        "weight": "85 lb",
                        "position": "left",
                        "createdAt": "2022-07-05T07:04:18.274Z",
                        "updatedAt": "2022-07-05T07:04:18.274Z"
                    }, {
                        "id": 5,
                        "teamId": 1,
                        "name": "ali",
                        "number": "104",
                        "height": "7'89\"",
                        "weight": "112 lb",
                        "position": "bottom",
                        "createdAt": "2022-07-05T07:04:18.295Z",
                        "updatedAt": "2022-07-05T07:04:18.295Z"
                    }, {
                        "id": 6,
                        "teamId": 1,
                        "name": "raza",
                        "number": "105",
                        "height": "9'10\"",
                        "weight": "130 lb",
                        "position": "bottom",
                        "createdAt": "2022-07-05T07:04:18.305Z",
                        "updatedAt": "2022-07-05T07:04:18.305Z"
                    }, {
                        "id": 7,
                        "teamId": 1,
                        "name": "rehman",
                        "number": "106",
                        "height": "5'80\"",
                        "weight": "95 lb",
                        "position": "right bottom",
                        "createdAt": "2022-07-05T07:04:18.314Z",
                        "updatedAt": "2022-07-05T07:04:18.314Z"
                    }]
                },
                "matchDetails": {}
            }
        }

    }
}