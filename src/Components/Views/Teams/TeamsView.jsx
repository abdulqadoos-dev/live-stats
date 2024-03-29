import React, {useEffect} from 'react';

import {
    GAMES_FORM_PATH,
    ROSTERS_EDIT_PATH,
    LOCAL_STORAGE_AUTH_USER, GAMES, GAMES_BOARD_PATH,
} from "../../../state/constants/Constans";

import Footer from "../../Ui/Footer";
import Wrapper from "../../Ui/Form/Wrapper";
import PageHeader from "../../Ui/PageHeader";
import {useNavigate} from "react-router-dom";
import Breadcrumbs from "../../Ui/Breadcrumbs";
import DarkButton from "../../Ui/Buttons/DarkButton";
import PageMainNavigation from "../../Ui/PageMainNavigation";
import {_calculateTotalOfTeam, capitalizeFirstLetter} from "../../../Services/Helper";
import StartGameContainer from "../../Containers/Games/StartGameContainer";

const TeamsView = ({getGamesRequest, games, startGameModal, changeGameSate}) => {

    const {user} = JSON.parse(window.localStorage.getItem(LOCAL_STORAGE_AUTH_USER));
    const navigate = useNavigate();

    useEffect(() => {
        getGamesRequest(user?.profile?.id || null, navigate)
    }, [])
    return (
        <>
            <PageHeader
                title={user?.profile?.name || null}
                subTitle="Cavemen"
                description={(user?.profile?.school?.name || '') + ', ' + (user?.profile?.school?.state || '')}
                uploadedImage={user.image}
            />

            <Wrapper>
                {startGameModal?.isOpen && (<StartGameContainer/>)}
                <div className="mx-2">
                    <Breadcrumbs
                        currentPage="Teams"
                    />
                    <PageMainNavigation
                        heading="Teams"
                    />
                    <div className="grid grid-cols-3 gap-x-3 mt-2">
                        <div className="md:col-span-2 col-span-3">
                            {
                                games?.map((game, i) => <div key={i}
                                                             onClick={() => {
                                                                 if (game.details) {
                                                                     changeGameSate("selectedGame", game)
                                                                     navigate(GAMES_BOARD_PATH)
                                                                 }
                                                             }}
                                                             className={`bg-light rounded-xl p-4 mb-3 ${game.details ? "cursor-pointer hover:shadow" : ""}  transition`}>

                                        <div className="flex justify-between font-sans font-semibold text-secondary-light ">
                                            <p>{capitalizeFirstLetter(game?.mainTeam?.gender || '')} {capitalizeFirstLetter(game?.sport?.name || '')}</p>
                                            {game?.details?.matchDuration?.isMatchEnd && (<p>FINAL</p>)}
                                            {game?.details?.matchDuration?.isMatchStarted && (<p className="text-green-700 font-extrabold">LIVE</p>)}
                                            {game?.details && !game?.details?.matchDuration?.isMatchEnd && !game?.details?.matchDuration?.isMatchStarted && (<p>PREVIEW</p>)}
                                        </div>

                                        <div className="flex justify-between items-center my-2">
                                            <div className="flex items-center gap-2 lg:gap-5">
                                                <div className="rounded-full h-10 w-10 lg:h-20 lg:w-20 bg-white"><img
                                                    src="" alt=""/></div>
                                                <p className="text-sm lg:text-2xl font-bold text-secondary-light">{capitalizeFirstLetter(game?.mainTeam?.name || '')}</p>
                                            </div>
                                            <p className="font-bold text-secondary-light text-sm lg:text-2xl">
                                                {game?.details?.matchDuration?.isMatchEnd || game?.details?.matchDuration?.isMatchStarted ? _calculateTotalOfTeam(game.details.matchPlayers.mainTeamRosters) : 0}
                                            </p>
                                        </div>

                                        <div className="flex justify-between items-center">
                                            <div className="flex items-center gap-2 lg:gap-5">
                                                <div className="rounded-full h-10 w-10 lg:h-20 lg:w-20 bg-white"></div>
                                                <p className="text-sm lg:text-2xl text-secondary-light">{capitalizeFirstLetter(game?.opponentTeam?.name || '')}</p>
                                            </div>
                                            <p className="font-bold text-secondary-light text-sm lg:text-2xl">
                                                {game?.details?.matchDuration?.isMatchEnd || game?.details?.matchDuration?.isMatchStarted  ? _calculateTotalOfTeam(game.details.matchPlayers.opponentTeamRosters) : 0}
                                            </p>
                                        </div>
                                    </div>
                                )}
                        </div>
                        <div className="md:col-span-1 col-span-3">
                            {games?.length ? !games.find(game => game.details?.matchDuration?.isMatchStarted) && (
                                <DarkButton
                                    label="Start Game"
                                    className="w-full lg:text-2xl lg:py-5 mb-1"
                                    clickEvent={() => {
                                        return changeGameSate("startGameModal", {
                                                isOpen: true,
                                                title: "Select Games",
                                                content: GAMES,
                                                isDisabledButton: true
                                            })
                                    }}
                                />
                            ) : null}
                            <DarkButton
                                label="Add Game"
                                className="w-full lg:text-2xl lg:py-5 mb-1"
                                clickEvent={() => navigate(GAMES_FORM_PATH)}
                            />
                            <DarkButton
                                label="Add Roster"
                                className="w-full lg:text-2xl lg:py-5 mb-1"
                                clickEvent={() => navigate(ROSTERS_EDIT_PATH)}
                            />
                        </div>
                    </div>
                </div>
            </Wrapper>
            <Footer/>
        </>

    )
}


export default TeamsView;