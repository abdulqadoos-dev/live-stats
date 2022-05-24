import React, {useEffect} from 'react';
import {ReactSVG} from "react-svg";
import plus from "../../../Media/icons/plus.svg";
import chevronRight from "../../../Media/icons/chevron-right.svg";

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
        getGamesRequest(user.profile.id || null, navigate)
    }, [])

    console.log(games)

    return (
        <Wrapper>
            <PageHeader
                title={user?.profile?.name || null}
                subTitle="Cavemen"
                description={(user?.profile?.school?.name || '') + ', ' + (user?.profile?.school?.state || '')}
                uploadedImage={user.image}
            />

            <div className="mx-2">

                <Breadcrumbs/>

                <PageMainNavigation
                    heading="Games"
                />


                <main className="grid grid-cols-1 lg:grid-cols-3 my-5 gap-y-5 lg:gap-10">

                    {games?.length ? games.map((game, i) => (
                        <section className="w-full col-span-2 gap-3 lg:gap-8 flex items-center" key={i}>
                            <div className="lg:text-xl lg:w-14 font-bold text-secondary-light">12/7</div>
                            <div className="text-lg w-full flex items-center gap-2 lg:gap-5">
                                <div className="rounded-full h-10 w-10 lg:h-20 lg:w-20 bg-light"/>
                                <h4 className="lg:text-2xl font-semibold text-secondary">{game.location}</h4>
                            </div>
                            <div className="lg:text-lg w-30 lg:w-52 font-bold text-right text-secondary-light">Preview</div>
                        </section>
                    )) : null}

                    <div className="">
                        <DarkButton
                            label="Add Game"
                            className="w-full lg:text-2xl lg:py-5"
                            clickEvent={() => navigate(GAMES_FORM_PATH)}
                        />
                    </div>
                </main>
            </div>


            <Footer/>

        </Wrapper>
    )
}

export default GamesView;