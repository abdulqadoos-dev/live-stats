import React, {useEffect} from "react";

import {useNavigate} from "react-router-dom";
import {capitalizeFirstLetter} from "../../../Services/Helper";
import DefaultModal from "../../Ui/Modals/DefaultModal";
import {
    GAMES_BOARD_PATH, LOCAL_STORAGE_AUTH_USER,
    MODEL_CONTENT_GAMES,
    MODEL_CONTENT_OPPONENTS_TEAM_PLAYERS,
    MODEL_CONTENT_TEAM_PLAYERS
} from "../../../state/constants/Constans";


export default function StartGame({
                                      getGamesRequest,
                                      getRostersRequest,
                                      changeGameSate,
                                      games,
                                      rosters,
                                      startGameModal,
                                      selectedGame,
                                      dragEventObject,
                                      selectedTeamRosters,
                                      selectedOpponentRosters
                                  }) {

    const {user} = JSON.parse(window.localStorage.getItem(LOCAL_STORAGE_AUTH_USER));

    const navigate = useNavigate();

    useEffect(() => {
        // console.log("RERENDER", games, selectedGame, dragEventObject)
        console.log("RERENDER", rosters, selectedTeamRosters)
    })

    useEffect(() => {
        selectedGame && changeGameSate("startGameModal", {...startGameModal, isDisabledButton: false})
    }, [selectedGame])

    const _handleModelClickEvent = (action) => {
        switch (action) {
            case MODEL_CONTENT_GAMES :
                return _handelPlayersModel(selectedGame?.team1Id || null, "Team 1 Players", MODEL_CONTENT_TEAM_PLAYERS)
            case MODEL_CONTENT_TEAM_PLAYERS :
                return _handelPlayersModel(selectedGame?.team2Id || null, "Team 2 Players", MODEL_CONTENT_OPPONENTS_TEAM_PLAYERS)
            case MODEL_CONTENT_OPPONENTS_TEAM_PLAYERS:
                navigate(GAMES_BOARD_PATH)
        }
    }


    const _handelPlayersModel = (profileId, title, content) => {
        getRostersRequest(profileId, navigate)
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

    const rosterDragOver = (event) => {
        const target = event.target
        let draggingRoster = document.getElementById(dragEventObject.rosterId);
        // let targetRoster = target.closest('div.roster:not(.dragging)');
        let targetLane = target.closest("div.line");
        targetLane.append(draggingRoster)
        // const offset = targetRoster ? event.clientY - targetRoster.getBoundingClientRect().top - 100 / 2 : 0;
        // targetRoster ? (offset < 0 ? targetRoster.after(draggingRoster) : targetRoster.before(draggingRoster)) : targetLane.append(draggingRoster);
    }

    const rosterDragEnd = ({target}) => {
        target.classList.remove("opacity-70")
        target.classList.remove("dragging")
        let targetLane = target.closest("div.line");
        let arr = [];
        let roster = null;

        if (dragEventObject.closestLane === "rosters") {
            rosters.map(item => item.id === parseInt(target.id) ? roster = item : arr.push(item))
            selectedTeamRosters.push(roster)
        }

        // if (dragEventObject.closestLane === "selectedRosters") {
        //     selectedTeamRosters.map(item => item.id === parseInt(target.id) ? roster = item : arr.push(item))
        // }

        console.log({rosters}, {selectedTeamRosters})
        changeGameSate("selectedTeamRosters", selectedTeamRosters)
    }

    return (
        <DefaultModal
            title={startGameModal.title}
            isDisabledButton={startGameModal.isDisabledButton}
            clickEvent={() => _handleModelClickEvent(startGameModal.content)}>
            <div className="my-3">
                {/*{startGameModal.content === MODEL_CONTENT_GAMES ? _renderGames(games, changeGameSate, selectedGame) : _renderPlayers(rosters, selectedTeamRosters)}*/}
                {startGameModal.content === MODEL_CONTENT_GAMES ? _renderGames(games, changeGameSate, selectedGame) : _renderPlayers(rosters, selectedTeamRosters, {
                    rosterDragOver,
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

const _renderPlayers = (rosters, selectedRosters, {rosterDragOver, rosterDragStart, rosterDragEnd}) =>
    <div className="my-3">
        <div className="grid grid-cols-2 gap-2 ">

            <div
                id="selectedRosters"
                onDragOver={rosterDragOver}
                className="mb-2 line">
                {selectedRosters?.length ? selectedRosters.map(roster => (
                    <div
                        draggable={true}
                        key={roster.id}
                        id={roster.id}
                        className="mb-2 p-3 bg-secondary text-center rounded-md text-light hover:bg-primary cursor-move roster">
                        {roster.position + " " + roster.name}
                    </div>
                )) : null}
            </div>

            <div
                id="rosters"
                onDragOver={rosterDragOver}
                className="mb-2 line">
                {rosters?.length ? rosters.map(roster => (
                    <div
                        id={roster.id}
                        key={roster.id}
                        draggable={true}
                        onDragStart={rosterDragStart}
                        onDragEnd={rosterDragEnd}
                        className="mb-2 col-span-1 p-3 bg-light text-center hover:bg-primary cursor-move hover:text-white rounded-md roster">
                        {roster.position + " " + roster.name}
                    </div>
                )) : null}
            </div>
        </div>
    </div>


