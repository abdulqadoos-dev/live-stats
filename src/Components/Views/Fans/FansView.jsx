import React, {useEffect} from "react";
import Footer from "../../Ui/Footer";
import GameBoardHeader from "../../Ui/GameBoardHeader";
import Wrapper from "../../Ui/Form/Wrapper";
import {
    FANS_GAME_BOARD_PATH,
    FIRST_HALF,
    FOURTH_HALF, GAMES_BOARD_PATH,
    MATCH_HALF,
    SECOND_HALF,
    TEAMS_PATH,
    THIRD_HALF
} from "../../../state/constants/Constans";
import {useNavigate} from "react-router-dom";
import {data} from "autoprefixer";

const FansView = ({getGamesBySportRequest, games, changeGameSate}) => {
    const navigate = useNavigate();

    useEffect(() => {
        getGamesBySportRequest(1 || null, navigate)
    }, [])

    return (
        <>
            <img className="object-none object-right h-80 w-full"
                 src="/images/urn_aaid_sc_US_072a63f2-096f-4735-b158-e9655ccc2692.png" alt=""/>

            <div className="flex  gap-10 mx-10 my-5 overflow-x-scroll no-scrollbar">

                {/* match box */}
                {games?.length ? games.map(game => (
                    <div
                        className="rounded bg-light p-3 text-secondary  cursor-pointer hover:shadow transition min-w-[250px]"
                        key={game.id}
                        onClick={() => {
                            changeGameSate("selectedGame", game)
                            navigate(FANS_GAME_BOARD_PATH)
                        }}
                    >
                        <div className="flex justify-between  mb-5 font-bold ">
                            <p>{game.sport.name}</p>
                            <p>FINAL</p>
                        </div>

                        <div className="flex justify-between items-center mb-3">
                            <div className="flex items-center gap-2">
                                <div className="h-10 w-10 rounded-full bg-white"></div>
                                <p className="w-[150px] text-sm">{game.mainTeam.name}</p>
                            </div>
                            <p className="font-bold">63</p>
                        </div>

                        <div className="flex justify-between items-center">
                            <div className="flex items-center gap-2">
                                <div className="h-10 w-10 rounded-full bg-white"></div>
                                <p className="w-[150px] text-sm">{game.opponentTeam.name}</p>
                            </div>
                            <p className="font-bold">63</p>
                        </div>
                    </div>
                )) : null}

            </div>

            <Wrapper>
            </Wrapper>
            <Footer/>
        </>
    );
};

export default FansView;
