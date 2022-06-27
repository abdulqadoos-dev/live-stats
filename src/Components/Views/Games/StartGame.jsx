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
                                      selectedGame
                                  }) {

    const {user} = JSON.parse(window.localStorage.getItem(LOCAL_STORAGE_AUTH_USER));

    const navigate = useNavigate();

    useEffect(() => {
        console.log("RERENDER", games, selectedGame)
    })

    useEffect(() => {
        selectedGame && changeGameSate("startGameModal", {...startGameModal, isDisabledButton: false})
    }, [selectedGame])

    const _handleModelClickEvent = (action) => {
        switch (action) {
            case MODEL_CONTENT_GAMES :
                return _handelPlayersModel(user?.profile?.id || null, "Team 1 Players", MODEL_CONTENT_TEAM_PLAYERS)
            case MODEL_CONTENT_TEAM_PLAYERS :
                return _handelPlayersModel(user?.profile?.id || null, "Team 2 Players", MODEL_CONTENT_OPPONENTS_TEAM_PLAYERS)
            case MODEL_CONTENT_OPPONENTS_TEAM_PLAYERS:
                navigate(GAMES_BOARD_PATH)
        }
    }


    const _handelPlayersModel = (profileId, title, content) => {
        getRostersRequest(profileId, navigate)
        changeGameSate("startGameModal", {...startGameModal, isDisabledButton: false, title: title, content: content})
    }

    return (
        <DefaultModal
            title={startGameModal.title}
            isDisabledButton={startGameModal.isDisabledButton}
            clickEvent={() => _handleModelClickEvent(startGameModal.content)}>
            <div className="my-3">
                {startGameModal.content === MODEL_CONTENT_GAMES ? _renderGames(games, changeGameSate, selectedGame) : _renderPlayers(rosters)}
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

const _renderPlayers = rosters =>
    rosters?.length ? rosters.map(roster => (
        <div className="my-3" key={roster.id}>
            <div className="grid grid-cols-2 gap-2 mb-2">
                <div className=" p-3 bg-secondary text-center rounded-md text-light hover:bg-primary cursor-pointer">
                    {roster.position + " " + roster.name}
                </div>
                <div
                    className="col-span-1 p-3 bg-light text-center hover:bg-primary cursor-pointer hover:text-white rounded-md">
                    {roster.position + " " + roster.name}
                </div>
            </div>
        </div>
    )) : null
