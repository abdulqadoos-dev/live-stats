import React, {useEffect} from "react";

import {useNavigate} from "react-router-dom";
import {capitalizeFirstLetter} from "../../../Services/Helper";
import DefaultModal from "../../Ui/Modals/DefaultModal";
import {
    LOCAL_STORAGE_AUTH_USER,
    GAMES,
    OPPONENTS_TEAM_ROSTERS,
    TEAM_ROSTERS,
} from "../../../state/constants/Constans";


export default function StartGame({
                                      getRostersRequest,
                                      changeGameSate,
                                      games,
                                      rosters,
                                      startGameModal,
                                      selectedGame,
                                      teamRosters,
                                      dragEventObject,
                                      createMatchRequest,
                                      selectedTeamRosters,
                                      selectedOpponentRosters
                                  }) {

    const {user} = JSON.parse(window.localStorage.getItem(LOCAL_STORAGE_AUTH_USER));

    const navigate = useNavigate();

    useEffect(() => {
        selectedGame && changeGameSate("startGameModal", {...startGameModal, isDisabledButton: false})
    }, [selectedGame])

    const _handleModelClickEvent = (action) => {
        switch (action) {
            case GAMES :
                return _handelPlayersModel(selectedGame?.mainTeamId || null, "Team 1 Players", TEAM_ROSTERS)
            case TEAM_ROSTERS :
                return _handelPlayersModel(selectedGame?.opponentTeamId || null, "Team 2 Players", OPPONENTS_TEAM_ROSTERS)
            case OPPONENTS_TEAM_ROSTERS:
                let formData = {
                    gameId: selectedGame.id,
                    matchDuration: {},
                    matchPlayers: {
                        mainTeamRosters: selectedTeamRosters,
                        opponentTeamRosters: selectedOpponentRosters
                    },
                    matchDetails: {}
                }

                changeGameSate("startGameModal", null)
                changeGameSate("dragEventObject", null)

                changeGameSate("teamRosters", [])
                changeGameSate("selectedTeamRosters", [])
                changeGameSate("selectedOpponentRosters", [])
                createMatchRequest(formData, navigate)
        }
    }


    const _handelPlayersModel = (profileId, title, content) => {
        let promise = getRostersRequest(profileId, navigate)
        promise.then((result) => {
            result?.data?.players && changeGameSate("teamRosters", result.data.players)
        })
        changeGameSate("startGameModal", {...startGameModal, isDisabledButton: false, title: title, content: content})
    }


    const rosterDragStart = ({target}) => {
        target.classList.add("opacity-70")
        target.classList.add('dragging');
        changeGameSate("dragEventObject", {
            ...dragEventObject,
            rosterId: target.id,
            closestLane: target.closest("div.line").id
        })
    }

    const rosterDragEnd = ({target}) => {
        target.classList.remove("opacity-70")
        target.classList.remove("dragging")
        let arr = [];
        let roster = null;
        if (dragEventObject.closestLane === "teamRosters") {

            teamRosters.map(item => item.id === parseInt(target.id) ? roster = item : arr.push(item))

            if (startGameModal.content === TEAM_ROSTERS) {
                selectedTeamRosters.push(roster)
                changeGameSate("selectedTeamRosters", selectedTeamRosters)
            }

            if (startGameModal.content === OPPONENTS_TEAM_ROSTERS) {
                selectedOpponentRosters.push(roster)
                changeGameSate("selectedOpponentRosters", selectedOpponentRosters)
            }

            changeGameSate("teamRosters", arr)
        }
        if (dragEventObject.closestLane === "selectedRosters") {

            if (startGameModal.content === TEAM_ROSTERS) {
                selectedTeamRosters.map(item => item.id === parseInt(target.id) ? roster = item : arr.push(item))
                changeGameSate("selectedTeamRosters", arr)
            }

            if (startGameModal.content === OPPONENTS_TEAM_ROSTERS) {
                selectedOpponentRosters.map(item => item.id === parseInt(target.id) ? roster = item : arr.push(item))
                changeGameSate("selectedOpponentRosters", arr)
            }

            teamRosters.push(roster)
            changeGameSate("teamRosters", teamRosters)
        }
    }


    return (
        <DefaultModal
            title={startGameModal.title}
            isDisabledButton={startGameModal.isDisabledButton}
            clickEvent={() => _handleModelClickEvent(startGameModal.content)}>
            <div className="my-3">
                {startGameModal.content === GAMES ? _renderGames(games, changeGameSate, selectedGame) : _renderPlayers(teamRosters, startGameModal.content === TEAM_ROSTERS ? selectedTeamRosters : selectedOpponentRosters, {
                    rosterDragStart,
                    rosterDragEnd
                })}
            </div>
        </DefaultModal>
    )
}


const _renderGames = (games, changeGameSate, selectedGame) => games?.length ? games.map(game => (
    <div className="grid grid-cols-3 gap-2 mb-2 " key={game.id}>
        <div className="col-span-2 p-3 bg-light rounded-md">
            <span
                className="font-bold text-lg mr-2">{new Date(game.dateTime).getMonth() + 1}/{new Date(game.dateTime).getDate()}</span> {capitalizeFirstLetter(game?.team1?.gender || '')} {capitalizeFirstLetter(game?.sport?.name || '')}
        </div>
        <button
            onClick={() => changeGameSate("selectedGame", games.filter(item => item.id === game.id).shift())}
            className={`col-span-1 p-3 ${selectedGame?.id === game.id ? "bg-primary text-white" : "bg-light"}  text-center hover:bg-primary cursor-pointer hover:text-white rounded-md `}>
            Select
        </button>
    </div>
)) : null

const _renderPlayers = (teamRosters, selectedRosters, {rosterDragStart, rosterDragEnd}) =>
    <div className="my-3">
        <div className="grid grid-cols-2 gap-2 ">

            <div
                id="selectedRosters"
                className="mb-2 line">
                {selectedRosters?.length ? selectedRosters.map((roster, key) => (
                    <div
                        draggable={true}
                        onDragStart={rosterDragStart}
                        onDragEnd={rosterDragEnd}
                        key={key}
                        id={roster.id}
                        className="mb-2 p-3 bg-secondary text-center rounded-md text-light hover:bg-primary cursor-move roster">
                        {roster.name}
                    </div>
                )) : null}
            </div>

            <div
                id="teamRosters"
                className="mb-2 line">
                {teamRosters?.length ? teamRosters.map((roster, key) => (
                    <div
                        id={roster.id}
                        key={key}
                        draggable={true}
                        onDragStart={rosterDragStart}
                        onDragEnd={rosterDragEnd}
                        className="mb-2 col-span-1 p-3 bg-light text-center hover:bg-primary cursor-move hover:text-white rounded-md roster">
                        {roster.name}
                    </div>
                )) : null}
            </div>
        </div>
    </div>


