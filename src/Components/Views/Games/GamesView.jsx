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
            <div className="bg-secondary pb-8 lg:p-10 text-white">
                <div className="grid lg:grid-cols-3 gap-4 items-center justify-center">

                    <div className="mx-auto">
                        <div className="w-64 h-64 bg-white rounded-full my-10 relative overflow-hidden">
                            {/*<img src={creatingFeed} className="w-56 lg:w-64 mt-10"/>*/}
                            <span
                                className="absolute bottom-0 w-full rounded-full bg-secondary-light py-4 cursor-pointer flex items-center justify-center button-default-svg">
                                 <ReactSVG src={plus}/> <p aria-readonly={true}>Image</p>
                            </span>
                        </div>
                    </div>

                    <div className="col-span-2 text-center lg:text-left w-64 lg:w-full">
                        <h2 className="text-2xl lg:text-3xl">{user.profile.name}</h2>
                        <h1 className="text-4xl lg:text-5xl">Cavemen</h1>
                        <p className="mt-5">American fork, UT</p>
                    </div>
                </div>
            </div>

            <div className="mx-2">

                <Breadcrumbs/>

                <PageMainNavigation
                    heading="Games"
                />


                <main className="grid grid-cols-1 lg:grid-cols-3 my-5 gap-10">

                    {games?.length ? games.map((game, i) => (
                        <section className="w-full col-span-2 d gap-8 flex items-center" key={i}>
                            <div className="lg:text-xl lg:w-14 font-bold text-secondary-light">12/7</div>
                            <div className="text-lg w-full flex items-center gap-5">
                                <div className="rounded-full h-10 w-10 lg:h-20 lg:w-20 bg-light"/>
                                <h4 className="lg:text-2xl font-semibold text-secondary">{game.location}</h4>
                            </div>
                            <div className="lg:text-lg w-52 font-bold text-right text-secondary-light">Preview</div>
                        </section>
                    )) : null}

                    <div className="">
                        <DarkButton
                            label="Add Game"
                            className="w-full text-2xl my-2 py-5"
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