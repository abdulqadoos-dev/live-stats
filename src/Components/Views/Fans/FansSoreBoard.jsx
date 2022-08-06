import React, {useEffect} from "react";
import Footer from "../../Ui/Footer";
import GameBoardHeader from "../../Ui/GameBoardHeader";
import Wrapper from "../../Ui/Form/Wrapper";
import {
    FIRST_HALF,
    FOURTH_HALF,
    MATCH_HALF,
    SECOND_HALF,
    TEAMS_PATH,
    THIRD_HALF
} from "../../../state/constants/Constans";
import {useNavigate} from "react-router-dom";
import io from "socket.io-client";

const FansSoreBoard = ({
                           getMatchRequest,
                           updateMatchRequest,
                           changeMatchState,
                           match,
                           stats,
                           selectedGame
                       }) => {

    const navigate = useNavigate();

    useEffect(() => {
        // if (!selectedGame?.id) return navigate(TEAMS_PATH);
        // const promise = getMatchRequest(selectedGame.id, navigate)
        const socket = io.connect('http://127.0.0.1:5000');
        const gameid = 1;
        const promise = getMatchRequest(gameid, navigate)
        promise.then((result) => {
            if (result?.data?.matches[0]) {
                let arr = {...result.data.matches[0]}
                arr.game = selectedGame
                changeMatchState("match", arr)
                socket.emit('request_game_data', {gameId:gameid})
                socket.on("get_game_data", data => {
                    let arr = {...data.match[0]}
                    arr.game = selectedGame
                    changeMatchState("match", arr)
                });
            } else {
                navigate(TEAMS_PATH)
            }
        }).catch((error) => {
            navigate(TEAMS_PATH)
        });


    }, [])


    const numberOfHalf = [
        {label: 1, value: FIRST_HALF, time: "10"},
        {label: 2, value: SECOND_HALF, time: "12"},
        {label: "H", value: MATCH_HALF, time: "14"},
        {label: 3, value: THIRD_HALF, time: "15"},
        {label: 4, value: FOURTH_HALF, time: "16"}
    ]

    const _calculateTotalOfTeamHalf = (rosters, half) => {
        let total = 0;
        rosters.filter(roster => {
            if (roster.scores) {
                roster.scores.map(score => score.half === half ? total += score.total : null)
            }
        })
        return total
    }

    return (
        <>
            <GameBoardHeader
                match={match}
                numberOfHalf={numberOfHalf}
                changeMatchState={changeMatchState}
                calculateTeamHalf={_calculateTotalOfTeamHalf}
            />
            <Wrapper>
                <div className="grid grid-cols-5 gap-5">
                    <div className="col-span-3">
                        <div className="bg-light rounded h-96"></div>

                        <div className="my-5">
                            <div className="bg-secondary-light text-white font-bold py-1 px-4 rounded">Play by play</div>
                            <div className="flex items-center gap-4 p-3">
                                <p className="font-bold text-secondary-light text-lg">6:23 - 1st</p>
                                <div className="rounded-full h-10 w-10 border"></div>
                                <p className="font-bold text-secondary-light text-lg"> <i>j smith</i> made 2-pt. shot </p>
                            </div>
                        </div>

                        <div className="my-5">
                            <h1 className="text-2xl uppercase font-bold my-2">team 1 name</h1>
                            <div className="bg-secondary-light text-white font-bold py-1 px-4 rounded grid grid-cols-9">
                                <p className="col-span-3">NAME</p>
                                <p>MIN</p>
                                <p>FG</p>
                                <p>3-PT</p>
                                <p>REB</p>
                                <p>AST</p>
                                <p>PTS</p>
                            </div>

                            <div className="bg-light text-secondary-light font-bold py-2 px-4 rounded grid grid-cols-9">
                                <p className="col-span-3"> <b>12</b> Name here</p>
                                <p>10</p>
                                <p>5-7</p>
                                <p>0-2</p>
                                <p>3</p>
                                <p>2</p>
                                <p>10</p>
                            </div>

                            <div className="bg-white text-secondary-light font-bold py-1 px-4 rounded grid grid-cols-9">
                                <p className="col-span-3"> <b>12</b> Name here</p>
                                <p>10</p>
                                <p>5-7</p>
                                <p>0-2</p>
                                <p>3</p>
                                <p>2</p>
                                <p>10</p>
                            </div>


                        </div>

                    </div>
                    <div className="col-span-2">
                        <h1 className="text-5xl text-secondary uppercase my-4">News</h1>
                        <div className="grid grid-cols-4 items-center gap-5">
                            <div className="h-32 w-32 bg-light col-span-1"></div>
                            <div className="col-span-3 flex flex-col gap-1">
                                <h2 className="text-3xl text-secondary">Article # 1</h2>
                                <h3 className="font-bold  text-secondary-light">23-11-2022:15:35:00</h3>
                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Delectus dolores dolorum ex
                                    expedita fuga incidunt ipsa libero natus necessitatibus nemo optio.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </Wrapper>
            <Footer/>
        </>
    );
};

export default FansSoreBoard;
