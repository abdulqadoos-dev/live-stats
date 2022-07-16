import React, {useEffect} from "react";
import GameBoardHeader from "../../Ui/GameBoardHeader";
import Footer from "../../Ui/Footer";
import Wrapper from "../../Ui/Form/Wrapper";
import {
    CLOCK_STARTED, CLOCK_STOPPED,
    CONTINUE,
    END_GAME,
    GAME_STARTED,
    START_CLOCK,
    START_GAME, STOP_CLOCK
} from "../../../state/constants/Constans";
import DefaultModal from "../../Ui/Modals/DefaultModal";

export default function GameBoardView({getMatchRequest, updateMatchRequest, changeMatchState, match, stats}) {

    useEffect(() => {
        const promise = getMatchRequest()

        changeMatchState("match", {
            ...promise.data.match,
            matchDuration: {
                isMatchStarted: false,
                isClockStarted: false,
            }
        })


        // promise.then(() => {
        //     changeMatchState("match", {
        //         ...match, matchDuration: {matchState: CONTINUE}
        //     })
        // })

    }, [])


    console.log(match, "match....")

    const _handelInputChange = () => {
        console.log("click envet")
    }

    const _handelEndGame = () => {
        changeMatchState("match", {
            ...match,
            matchDuration: {
                ...match.matchDuration,
                isMatchEnd: false,
                isMatchStarted: false,
                isClockStarted: false,
            }
        })
    }


    return (
        <>
            <GameBoardHeader match={match} changeMatchState={changeMatchState}/>

            {match?.matchDuration.isMatchEnd && (
                <DefaultModal
                    title="Do you want to send stats?"
                    className="px-0 py-5 "
                    buttonLabel="Done"
                    clickEvent={_handelEndGame}
                >
                    <div className="mt-2">

                        <input
                            type="email"
                            name="homeEmail"
                            placeholder="Home Email"
                            defaultValue={stats?.homeEmail}
                            onChange={(e) => changeMatchState("stats", {...stats, homeEmail: e.target.value})}
                            className="px-4 py-3 outline-0 border-y border-secondary-light w-full "
                        />

                        <input
                            type="email"
                            name="awayEmail"
                            placeholder="Away Email"
                            defaultValue={stats?.awayEmail}
                            onChange={(e) => changeMatchState("stats", {...stats, awayEmail: e.target.value})}
                            className="px-4 py-3 outline-0 border-b border-secondary-light w-full "
                        />
                    </div>
                </DefaultModal>
            )}


            <Wrapper
                // readyOnly={match?.matchDuration.matchClock !== START_CLOCK || match?.matchDuration.matchState !== START_CLOCK}>
                readyOnly={!match?.matchDuration.isMatchStarted || !match?.matchDuration.isClockStarted}>
                <div className="grid grid-cols-5 gap-5">
                    <div className="mt-5">
                        {match && match.matchPlayers.mainTeamRosters.length ? match.matchPlayers.mainTeamRosters.map(roster => (
                            <div key={roster.id}
                                 className="bg-light hover:bg-primary cursor-pointer hover:text-white rounded py-5 text-center text-xl font-sans mb-2">
                                {roster.number + ' ' + roster.name}
                            </div>
                        )) : null}
                    </div>
                    <div className="mt-5 col-span-3 ">
                        <div className="bg-light rounded h-96"></div>
                        <div/>
                        <div className="my-5">
                            <div className="grid grid-cols-6 gap-1">
                                <div
                                    className="bg-secondary-light hover:bg-secondary text-light text-center rounded py-3 cursor-pointer flex flex-col">
                                    <b>2 Points</b>
                                    <span>Made</span>
                                </div>
                                <div
                                    className="bg-secondary-light hover:bg-secondary text-light text-center rounded py-3 cursor-pointer flex flex-col">
                                    <b>2 Points</b>
                                    <span>Miss</span>
                                </div>

                                <div
                                    className="bg-secondary-light hover:bg-secondary text-light text-center rounded py-3 cursor-pointer flex flex-col">
                                    <b>3 Points</b>
                                    <span>Made</span>
                                </div>
                                <div
                                    className="bg-secondary-light hover:bg-secondary text-light text-center rounded py-3 cursor-pointer flex flex-col">
                                    <b>3 Points</b>
                                    <span>Miss</span>
                                </div>

                                <div
                                    className="bg-secondary-light hover:bg-secondary text-light text-center rounded py-3 cursor-pointer flex flex-col">
                                    <b>1 Point</b>
                                    <span>Made</span>
                                </div>
                                <div
                                    className="bg-secondary-light hover:bg-secondary text-light text-center rounded py-3 cursor-pointer flex flex-col">
                                    <b>1 Point</b>
                                    <span>Miss</span>
                                </div>
                            </div>
                            <div className="grid grid-cols-6 gap-1 my-1">
                                <div
                                    className="bg-secondary-light hover:bg-secondary text-light text-center rounded py-3 cursor-pointer flex items-center justify-center">
                                    <b>Assist</b>
                                </div>
                                <div
                                    className="bg-secondary-light hover:bg-secondary text-light text-center rounded py-3 cursor-pointer flex flex-col">
                                    <b>Rebound</b>
                                    <span>Offense</span>
                                </div>

                                <div
                                    className="bg-secondary-light hover:bg-secondary text-light text-center rounded py-3 cursor-pointer flex flex-col">
                                    <b>Rebound</b>
                                    <span>Defense</span>
                                </div>
                                <div
                                    className="bg-secondary-light hover:bg-secondary text-light text-center rounded py-3 cursor-pointer flex justify-center items-center">
                                    <b>Steal</b>
                                </div>
                                <div
                                    className="bg-secondary-light hover:bg-secondary text-light text-center rounded py-3 cursor-pointer flex justify-center items-center">
                                    <b>Block</b>
                                </div>
                                <div
                                    className="bg-secondary-light hover:bg-secondary text-light text-center rounded py-3 cursor-pointer flex justify-center items-center">
                                    <b>Turnover</b>
                                </div>
                            </div>
                            <div className="grid grid-cols-6 gap-1">
                                <div
                                    className="bg-secondary-light hover:bg-secondary text-light text-center rounded py-3 cursor-pointer flex flex-col">
                                    <b>Foul</b>
                                    <span>Offense</span>
                                </div>
                                <div
                                    className="bg-secondary-light hover:bg-secondary text-light text-center rounded py-3 cursor-pointer flex flex-col">
                                    <b>Foul</b>
                                    <span>Defense</span>
                                </div>

                                <div
                                    className="bg-secondary-light hover:bg-secondary text-light text-center rounded py-3 cursor-pointer flex justify-center items-center">
                                    <b>Charge</b>
                                </div>
                                <div
                                    className="bg-secondary-light hover:bg-secondary text-light text-center rounded py-3 cursor-pointer flex justify-center items-center col-span-3">
                                    <b>UNDO STATS</b>
                                </div>

                            </div>
                        </div>

                        {/*<div className="my-5 flex justify-center ">*/}
                        {/*    <div className={match?.matchDuration.matchClock !== CLOCK_STARTED ? "absolute z-10" : ""}>*/}
                        {/*        <div*/}
                        {/*            className={`text-center ${match?.matchDuration.matchState === GAME_STARTED ? "bg-red-600 hover:bg-primary cursor-pointer" : "bg-secondary-light "}  rounded w-56 py-5 text-white  text-lg font-bold `}>*/}
                        {/*            {match?.matchDuration.matchClock !== CLOCK_STARTED ? "Start Clock" : "Stop Clock"}*/}
                        {/*        </div>*/}
                        {/*        <div className="grid grid-cols-5 gap-0.5 mt-3">*/}
                        {/*            <div*/}
                        {/*                className="bg-secondary-light hover:bg-secondary cursor-pointer text-center text-white rounded">1*/}
                        {/*            </div>*/}
                        {/*            <div*/}
                        {/*                className="bg-secondary-light hover:bg-secondary cursor-pointer text-center text-white rounded">2*/}
                        {/*            </div>*/}
                        {/*            <div*/}
                        {/*                className="bg-secondary-light hover:bg-secondary cursor-pointer text-center text-white rounded">H*/}
                        {/*            </div>*/}
                        {/*            <div*/}
                        {/*                className="bg-secondary-light hover:bg-secondary cursor-pointer text-center text-white rounded">3*/}
                        {/*            </div>*/}
                        {/*            <div*/}
                        {/*                className="bg-secondary-light hover:bg-secondary cursor-pointer text-center text-white rounded">4*/}
                        {/*            </div>*/}
                        {/*        </div>*/}
                        {/*    </div>*/}
                        {/*</div>*/}
                        <div className="my-5 flex justify-center h-24">
                            <div className={match?.matchDuration.isMatchStarted ? "absolute z-10 " : ""}>
                                <div
                                    onClick={() => changeMatchState("match", {
                                        ...match,
                                        matchDuration: {
                                            ...match.matchDuration,
                                            isClockStarted: !match.matchDuration.isClockStarted
                                        }
                                    })}
                                    className={`text-center ${match?.matchDuration.isClockStarted ? "bg-red-600 " : "bg-secondary-light"} hover:bg-primary cursor-pointer rounded w-56 py-5 text-white  text-lg font-bold `}>
                                    {!match?.matchDuration.isClockStarted ? "Start Clock" : "Stop Clock"}
                                </div>
                                <div className="grid grid-cols-5 gap-0.5 mt-3 relative">
                                    {match?.matchDuration.isClockStarted && (<div className="bg-white opacity-30 h-6 w-full absolute"/>)}
                                    <div
                                        className="bg-secondary-light hover:bg-secondary cursor-pointer text-center text-white rounded">1
                                    </div>
                                    <div
                                        className="bg-secondary-light hover:bg-secondary cursor-pointer text-center text-white rounded">2
                                    </div>
                                    <div
                                        className="bg-secondary-light hover:bg-secondary cursor-pointer text-center text-white rounded">H
                                    </div>
                                    <div
                                        className="bg-secondary-light hover:bg-secondary cursor-pointer text-center text-white rounded">3
                                    </div>
                                    <div
                                        className="bg-secondary-light hover:bg-secondary cursor-pointer text-center text-white rounded">4
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div className="mt-5">
                        {match && match.matchPlayers.opponentTeamRosters.length ? match.matchPlayers.opponentTeamRosters.map(roster => (
                            <div key={roster.id}
                                 className="bg-light hover:bg-primary cursor-pointer hover:text-white rounded py-5 text-center text-xl font-sans mb-2">
                                {roster.number + ' ' + roster.name}
                            </div>
                        )) : null}
                    </div>
                </div>
            </Wrapper>
            <Footer/>
        </>
    )
}