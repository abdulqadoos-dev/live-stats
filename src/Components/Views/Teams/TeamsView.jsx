import React, {useEffect} from 'react';
import Wrapper from "../../Ui/Form/Wrapper";
import {ReactSVG} from "react-svg";
import chevronRight from "../../../Media/icons/chevron-right.svg";
import DarkButton from "../../Ui/Buttons/DarkButton";
import PageMainNavigation from "../../Ui/PageMainNavigation";
import {
    GAMES_BOARD_PATH,
    GAMES_FORM_PATH,
    LOCAL_STORAGE_AUTH_USER,
    ROSTERS_EDIT_PATH,

} from "../../../state/constants/Constans";
import Footer from "../../Ui/Footer";
import PageHeader from "../../Ui/PageHeader";
import {useNavigate} from "react-router-dom";
import {capitalizeFirstLetter} from "../../../Services/Helper";
import Breadcrumbs from "../../Ui/Breadcrumbs";
import DefaultModal from "../../Ui/Modals/DefaultModal";

const TeamsView = ({getGamesRequest, games}) => {
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


                {/*<DefaultModal title="Select Game">*/}
                {/*    /!*{_renderPlayers()}*!/*/}
                {/*    {_renderGames()}*/}
                {/*</DefaultModal>*/}

                <div className="mx-2">

                    <Breadcrumbs
                        currentPage="Teams"
                    />

                    <PageMainNavigation
                        heading="Teams"
                    />


                    <div className="grid lg:grid-cols-3 my-5 gap-10">

                        <div className="w-full col-span-2">
                            {
                                games?.map((game, i) => <div key={i} className="bg-light rounded-xl p-4 my-2">
                                    <div className="flex justify-between font-sans font-semibold text-secondary-light ">
                                        <p>{capitalizeFirstLetter(game?.team1?.gender || '')} {capitalizeFirstLetter(game?.sport?.name || '')}</p>
                                        <p>FINAL</p>
                                    </div>

                                    <div className="flex justify-between items-center my-2">
                                        <div className="flex items-center gap-2 lg:gap-5">
                                            <div className="rounded-full h-10 w-10 lg:h-20 lg:w-20 bg-white"></div>
                                            <p className="text-sm lg:text-2xl font-bold text-secondary-light">{capitalizeFirstLetter(game?.team1?.name || '')}</p>
                                        </div>
                                        <p className="font-bold text-secondary-light text-sm lg:text-2xl">64</p>
                                    </div>

                                    <div className="flex justify-between items-center">
                                        <div className="flex items-center gap-2 lg:gap-5">
                                            <div className="rounded-full h-10 w-10 lg:h-20 lg:w-20 bg-white"></div>
                                            <p className="text-sm lg:text-2xl text-secondary-light">{capitalizeFirstLetter(game?.team2?.name || '')}</p>
                                        </div>
                                        <p className="font-bold text-secondary-light text-sm lg:text-2xl">41</p>
                                    </div>
                                </div>)
                            }
                        </div>

                        <div>
                            <DarkButton
                                label="Start Game"
                                className="w-full lg:text-2xl lg:py-5"
                                clickEvent={() => navigate(GAMES_BOARD_PATH)}
                            />
                            <DarkButton
                                label="Add Game"
                                className="w-full lg:text-2xl my-2 lg:py-5"
                                clickEvent={() => navigate(GAMES_FORM_PATH)}
                            />
                            <DarkButton
                                label="Add Roster"
                                className="w-full lg:text-2xl lg:py-5"
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

const _renderGames = () => {
    return (
        <div className="my-3">
            <div className="grid grid-cols-3 gap-2 mb-2">
                <div className="col-span-2 p-3 bg-light rounded-md">
                    4/5 vs. Lone Peak
                </div>
                <div
                    className="col-span-1 p-3 bg-light text-center hover:bg-primary cursor-pointer hover:text-white rounded-md">
                    Select
                </div>
            </div>
            <div className="grid grid-cols-3 gap-2 mb-2">
                <div className="col-span-2 p-2 bg-light rounded-md">
                    4/5 vs. Lone Peak
                </div>
                <div
                    className="col-span-1 p-2 bg-light text-center hover:bg-primary cursor-pointer hover:text-white rounded-md">
                    Select
                </div>
            </div>
        </div>
    )
}

const _renderPlayers = () => {
    return (
        <div className="my-3">
            <div className="grid grid-cols-2 gap-2 mb-2">
                <div className=" p-3 bg-secondary text-center rounded-md text-light hover:bg-primary cursor-pointer">
                    1 last name
                </div>
                <div
                    className="col-span-1 p-3 bg-light text-center hover:bg-primary cursor-pointer hover:text-white rounded-md">
                    0 last name
                </div>
            </div>

        </div>
    )
}

export default TeamsView;