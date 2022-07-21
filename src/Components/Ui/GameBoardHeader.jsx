import React from "react";
import {ReactSVG} from "react-svg";
import chevron from "../../Media/icons/chevron-right.svg"
export default function GameBoardHeader({match, changeMatchState}) {

    // console.log(match?.matchPlayers.mainTeamRosters,match?.matchPlayers?.mainTeamTotal,match?.matchPlayers?.opponentTeamTotal,"match")
    // console.log(match,"match")

    return (
        <div className="bg-secondary pb-2 lg:p-3 text-white">
            <div className="container mx-auto">
                <div className="flex justify-between game-board-actions">
                    <div><span className="cursor-pointer flex items-center back-action">
                            <ReactSVG src={chevron}/> Back</span>
                    </div>
                    <div><span className="cursor-pointer flex items-center" onClick={() =>
                        changeMatchState("match", {
                            ...match,
                            matchDuration: {
                                ...match.matchDuration,
                                isMatchStarted: !match.matchDuration.isMatchStarted,
                                isMatchEnd: match.matchDuration.isMatchStarted
                            }
                        })
                    }>
                          {!match?.matchDuration.isMatchStarted ? "Start Game" : "End Game"}
                        <ReactSVG src={chevron}/>
                        </span>
                    </div>
                </div>
            </div>
            <div className="container mx-auto py-5">
                <div className="grid grid-cols-4 gap-5 items-end">

                    <div className="text-center">
                        <h1 className="md:text-3xl font-default font-light">{match?.game?.mainTeam?.name || ""} <span
                            className="text-xl">8-8</span></h1>
                        <div className="w-20 h-20 md:w-40 md:h-40 bg-white rounded-full my-5 overflow-hidden mx-auto ">
                            <img src={process.env.REACT_APP_SERVER_PATH + "uploadedImage"} className="w-56 lg:w-64"/>
                        </div>
                        <div className="my-5 gap-3 flex justify-center">
                            <span className="p-1.5  bg-yellow-300 rounded-full"/>
                            <span className="p-1.5  bg-yellow-300 rounded-full"/>
                            <span className="p-1.5  bg-yellow-300 rounded-full"/>
                            <span className="p-1.5  bg-light rounded-full"/>
                            <span className="p-1.5  bg-light rounded-full"/>
                        </div>
                        <div className="font-default">
                            BONUS +
                        </div>
                    </div>

                    <div className="font-default col-span-2">
                        <div className="flex justify-around items-center mb-16">
                            <h1 className="text-5xl">{match?.matchPlayers.mainTeamTotal}</h1>
                            <h1 className=" flex flex-col text-center text-4xl"><span>6:02</span> <span
                                className="text-xl ">{match?.matchDetails?.activeHalf}</span></h1>
                            <h1 className="text-5xl">{match?.matchPlayers.opponentTeamTotal}</h1>
                        </div>
                        <div className="w-full">
                            <div className="grid grid-cols-9 text-center font-bold">
                                <span className="bg-secondary-light h-6 col-span-3"></span>
                                <span className="bg-secondary-light h-6">1</span>
                                <span className="bg-secondary-light h-6">2</span>
                                <span className="bg-secondary-light h-6">3</span>
                                <span className="bg-secondary-light h-6">4</span>
                                <span className="bg-secondary-light h-6">OT</span>
                                <span className="bg-secondary-light h-6"></span>
                            </div>

                            <div className="grid grid-cols-9 gap-0.5 text-secondary">
                                <span className="bg-white h-9 leading-9 px-2 col-span-3">Team 1</span>
                                <span className="bg-white h-9 leading-9 text-center">1</span>
                                <span className="bg-white h-9 leading-9 text-center">2</span>
                                <span className="bg-white h-9 leading-9 text-center">3</span>
                                <span className="bg-white h-9 leading-9 text-center">4</span>
                                <span className="bg-white h-9 leading-9 text-center">OT</span>
                                <span className="bg-white h-9 leading-9 text-center"></span>
                            </div>

                            <div className="grid grid-cols-9 gap-0.5 mt-0.5 text-secondary">
                                <span className="bg-white h-9 leading-9 px-2 col-span-3">Team 2</span>
                                <span className="bg-white h-9 leading-9 text-center">1</span>
                                <span className="bg-white h-9 leading-9 text-center">2</span>
                                <span className="bg-white h-9 leading-9 text-center">3</span>
                                <span className="bg-white h-9 leading-9 text-center">4</span>
                                <span className="bg-white h-9 leading-9 text-center">OT</span>
                                <span className="bg-white h-9 leading-9 text-center"></span>
                            </div>
                        </div>
                    </div>

                    <div className="text-center">
                        <h1 className="md:text-3xl font-default font-light"><span className="text-xl">12-8</span> {match?.game?.opponentTeam?.name || ""} </h1>
                        <div className="w-20 h-20 md:w-40 md:h-40 bg-white rounded-full my-5 overflow-hidden mx-auto ">
                            <img src={process.env.REACT_APP_SERVER_PATH + "uploadedImage"} className="w-56 lg:w-64"/>
                        </div>
                        <div className="my-5 gap-3 flex justify-center">
                            <span className="p-1.5  bg-yellow-300 rounded-full"/>
                            <span className="p-1.5  bg-yellow-300 rounded-full"/>
                            <span className="p-1.5  bg-yellow-300 rounded-full"/>
                            <span className="p-1.5  bg-light rounded-full"/>
                            <span className="p-1.5  bg-light rounded-full"/>
                        </div>
                        <div className="font-default">
                            BONUS +
                        </div>
                    </div>


                </div>

            </div>

        </div>
    )
}