import React, {useEffect} from 'react';
import Footer from "../../Ui/Footer";
import Wrapper from "../../Ui/Form/Wrapper";
import DarkButton from "../../Ui/Buttons/DarkButton";
import PageMainNavigation from "../../Ui/PageMainNavigation";
import {FAN_ROLE_ID, GAMES_FORM_PATH, LOCAL_STORAGE_AUTH_USER, TEAMS_PATH} from "../../../state/constants/Constans";
import {useNavigate} from "react-router-dom";
import Breadcrumbs from "../../Ui/Breadcrumbs";
import PageHeader from "../../Ui/PageHeader";

const GamesView = ({getGamesRequest, games}) => {

    const {user} = JSON.parse(window.localStorage.getItem(LOCAL_STORAGE_AUTH_USER));
    const navigate = useNavigate();

    useEffect(() => {
        if (user.roleId === FAN_ROLE_ID) navigate(TEAMS_PATH)
    }, [])

    useEffect(() => {
        getGamesRequest(user?.profile?.id || null, navigate)
    }, [])

    return (
        <>
            <PageHeader
                title={user?.profile?.name || null}
                subTitle={user.name}
                description={(user?.profile?.school?.name || '') + ', ' + (user?.profile?.school?.state || '')}
                uploadedImage={user.image}
            />
            <Wrapper>
                <div className="mx-2">

                    <Breadcrumbs
                        currentPage="Game"
                    />

                    <PageMainNavigation
                        heading="Games"
                    />
                    <main className="grid grid-cols-3 gap-x-3 mt-2">
                        <div className="md:col-span-2 col-span-3">
                        {games?.length ? games.map((game, i) => (
                            <section className="w-full col-span-2 gap-3 lg:gap-8 flex items-center bg-light rounded p-4 mb-3" key={i}>
                                <div
                                    className="lg:text-xl lg:w-14 font-bold text-secondary-light">{new Date(game.dateTime).getMonth() + 1}/{new Date(game.dateTime).getDate()}</div>
                                <div className="text-lg w-full flex items-center gap-2 lg:gap-5">
                                    <div className="rounded-full h-10 w-10 lg:h-20 lg:w-20 bg-white"/>
                                    <h4 className="lg:text-2xl font-semibold text-secondary">{game.opponentTeam.name}</h4>
                                </div>
                                <div
                                    className="lg:text-lg w-30 lg:w-52 font-bold text-right text-secondary-light">
                                    {game?.details?.matchDuration?.isMatchEnd && (<p>FINAL</p>)}
                                    {game?.details?.matchDuration?.isMatchStarted && (<p className="text-green-700 font-extrabold">LIVE</p>)}
                                    {game?.details && !game?.details?.matchDuration?.isMatchEnd && !game?.details?.matchDuration?.isMatchStarted && (<p>PREVIEW</p>)}
                                </div>
                            </section>
                        )) : null}
                        </div>

                        <div className="md:col-span-1 col-span-3">
                            <DarkButton
                                label="Add Game"
                                className="w-full lg:text-2xl lg:py-5"
                                clickEvent={() => navigate(GAMES_FORM_PATH)}
                            />
                        </div>
                    </main>
                </div>
            </Wrapper>
            <Footer/>
        </>

    )
}

export default GamesView;