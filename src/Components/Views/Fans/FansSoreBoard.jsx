import React, {useEffect} from "react";
import Footer from "../../Ui/Footer";
import GameBoardHeader from "../../Ui/GameBoardHeader";
import Wrapper from "../../Ui/Form/Wrapper";
import {
    ASSIST,
    FANS_PATH,
    FIRST_HALF,
    FOURTH_HALF,
    MATCH_HALF,
    REBOUND,
    SECOND_HALF,
    TEAMS_PATH,
    THIRD_HALF
} from "../../../state/constants/Constans";
import {useNavigate} from "react-router-dom";
import io from "socket.io-client";
import { capitalizeFirstLetter } from "../../../Services/Helper";

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
        if (!selectedGame?.id) return navigate(FANS_PATH);
        const promise = getMatchRequest(selectedGame.id, navigate)
        const socket = io.connect(process.env.REACT_APP_SERVER_PATH);
        promise.then((result) => {
            if (result?.data?.game) {
                let arr = {...result.data.game.details}
                arr.game = selectedGame
                changeMatchState("match", arr)
                socket.on("broadcast_game_"+selectedGame.id, data => {
                    let arr = {...data.game.details}
                    arr.game = selectedGame
                    changeMatchState("match", arr)
                });
            } else {
                navigate(FANS_PATH)
            }
        }).catch((error) => {
            navigate(FANS_PATH)
        });

        // CLEAN UP THE EFFECT
        return () => socket.disconnect();
        //
    }, [selectedGame])


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

    const _showActivitiesOfMatch = () => {
        let activities = [];
        if(match?.matchPlayers?.mainTeamRosters && match?.matchPlayers?.opponentTeamRosters){
            match.matchPlayers.mainTeamRosters.forEach(player => {
                player.activities.forEach(activity => {
                    if(activity.activity.reverse()?.[0]?.message){
                        activities.push({
                            name: player.name,
                            half: activity.half,
                            activity: activity.activity.reverse()?.[0]?.message || ''
                        })
                    }
                })
            })
            match.matchPlayers.opponentTeamRosters.forEach(player => {
                player.activities.forEach(activity => {
                    if(activity.activity.reverse()?.[0]?.message){
                        activities.push({
                            name: player.name,
                            half: activity.half,
                            activity: activity.activity.reverse()?.[0]?.message || ''
                        })
                    }
                })
            })

        }
        return activities
    }

    const findActivitiCountofPlayer = (activities, key) => {
        return activities.reduce((result, halfActivity) => result+halfActivity.activity.reduce((result2, activity) => (activity.name == key ? result2+1 : result2),0), 0)
    }
    return (
        <>
            <GameBoardHeader
                match={match}
                game={selectedGame}
                numberOfHalf={numberOfHalf}
                changeMatchState={changeMatchState}
                calculateTeamHalf={_calculateTotalOfTeamHalf}
            />
            <Wrapper>
                <div className="grid grid-cols-5 gap-5 px-2 lg:px-0">
                    <div className="col-span-5 lg:col-span-3">
                        <div className="bg-light rounded h-96"></div>

                        <div className="my-5">
                            <div className="bg-secondary-light text-white font-bold py-1 px-4 rounded">Play by play</div>
                            {/*{*/}
                            {/*    _showActivitiesOfMatch().map((activity, index) => (*/}
                            {/*        <div key={index} className="flex items-center gap-4 p-3">*/}
                            {/*            <p className="font-bold text-secondary-light text-lg">6:23 - {activity.half}</p>*/}
                            {/*            <div className="rounded-full h-10 w-10 border"></div>*/}
                            {/*            <p className="font-bold text-secondary-light text-lg"> <i>{capitalizeFirstLetter(activity.name)}.</i> {activity.activity} </p>*/}
                            {/*        </div>*/}
                            {/*    ))*/}
                            {/*}*/}
                            {match?.matchDetails?.recentActivities ? [...match.matchDetails.recentActivities].reverse().slice(0,5).map((activity, index) => (
                                <div key={index} className="flex items-center gap-4 p-3">
                                    <p className="font-bold text-secondary-light text-lg">{activity.time}- {activity.half}</p>
                                    <div className="rounded-full h-10 w-10 border"></div>
                                    <p className="font-bold text-secondary-light text-lg"> <i>{capitalizeFirstLetter(activity.player.name)}.</i> {activity.message} </p>
                                </div>
                            )) : null}
                            
                        </div>

                        <div className="my-5">
                            <h1 className="text-2xl uppercase font-bold my-2">{match?.game?.mainTeam?.name || "team 1 name"}</h1>
                            <div className="bg-secondary-light text-white font-bold py-1 px-4 rounded grid grid-cols-9">
                                <p className="col-span-3">NAME</p>
                                <p>MIN</p>
                                <p>FG</p>
                                <p>3-PT</p>
                                <p>REB</p>
                                <p>AST</p>
                                <p>PTS</p>
                            </div>

                            {
                                match?.matchPlayers?.mainTeamRosters && 
                                match.matchPlayers.mainTeamRosters.map((player, index) => (
                                    <div key={index} className="bg-light text-secondary-light font-bold py-2 px-4 rounded grid grid-cols-9">
                                        <p className="col-span-3"> <b>{player.number}</b> {player.name}</p>
                                        <p>10</p>
                                        <p>5-7</p>
                                        <p>0-2</p>
                                        <p>{findActivitiCountofPlayer(player.activities, REBOUND )}</p>
                                        <p>{findActivitiCountofPlayer(player.activities, ASSIST )}</p>
                                        <p>{player.scores.reduce((result, score) => result+score.total , 0)}</p>
                                    </div>
                                ))
                            }
                        </div>

                        <div className="my-5">
                            <h1 className="text-2xl uppercase font-bold my-2">{match?.game?.opponentTeam?.name || "team 2 name"}</h1>
                            <div className="bg-secondary-light text-white font-bold py-1 px-4 rounded grid grid-cols-9">
                                <p className="col-span-3">NAME</p>
                                <p>MIN</p>
                                <p>FG</p>
                                <p>3-PT</p>
                                <p>REB</p>
                                <p>AST</p>
                                <p>PTS</p>
                            </div>

                            {
                                match?.matchPlayers?.opponentTeamRosters && 
                                match.matchPlayers.opponentTeamRosters.map((player, index) => (
                                    <div key={index} className="bg-light text-secondary-light font-bold py-2 px-4 rounded grid grid-cols-9">
                                        <p className="col-span-3"> <b>{player.number}</b> {player.name}</p>
                                        <p>10</p>
                                        <p>5-7</p>
                                        <p>0-2</p>
                                        <p>{findActivitiCountofPlayer(player.activities, REBOUND )}</p>
                                        <p>{findActivitiCountofPlayer(player.activities, ASSIST )}</p>
                                        <p>{player.scores.reduce((result, score) => result+score.total , 0)}</p>
                                    </div>
                                ))
                            }
                        </div>

                    </div>
                    <div className="col-span-5 lg:col-span-2">
                        <h1 className="text-5xl text-secondary uppercase my-4">News</h1>
                        <div className="grid grid-cols-4 items-center gap-5">
                            <div className="w-100 h-[150px] lg:h-32 lg:w-32 bg-light col-span-4 lg:col-span-1"></div>
                            <div className="col-span-4 lg:col-span-3 flex flex-col gap-1">
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
