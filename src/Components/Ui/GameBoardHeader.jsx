import React from "react";
import {ReactSVG} from "react-svg";
import chevron from "../../Media/icons/chevron-right.svg"
import {LOCAL_STORAGE_AUTH_USER, TEAM_ROLE_ID} from "../../state/constants/Constans";
import Timer from "./Timer";

export default function GameBoardHeader({match, game,changeMatchState, numberOfHalf, calculateTeamHalf}) {
    const {user} = JSON.parse(window.localStorage.getItem(LOCAL_STORAGE_AUTH_USER));
    return (
        <div className="bg-secondary text-white">
            {user.roleId === TEAM_ROLE_ID ? (
                <div className="container mx-auto">
                    <div className="flex justify-between game-board-actions">
                        <div><span className="cursor-pointer flex items-center back-action text-sm">
                            <ReactSVG src={chevron}/> Back</span>
                        </div>

                        <div><span className="cursor-pointer flex items-center text-sm" onClick={() =>
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
            ) : null}

            <div className="container mx-auto pb-5 p-2">

                <div className="grid grid-cols-4 gap-1 xl:gap-5">

                    {/* main team */}
                    <div className="text-center col-span-2 lg:col-span-1">
                        <h1 className="font-default font-light lg:text-xl">
                            {game?.mainTeam?.name || ""} <span className="text-sm hidden sm:inline-block">8-8</span>
                        </h1>
                        <div className="w-16 h-16 lg:w-24 lg:h-24 bg-white rounded-full my-2 overflow-hidden mx-auto ">
                            <img src={process.env.REACT_APP_SERVER_PATH + "/image.jpg"} />
                        </div>
                        <div className="my-1 lg:my-3 gap-3 flex justify-center">
                            <span
                                className={`p-1.5  ${match?.matchDetails?.mainTeam.find(timeout => timeout.half === match.matchDetails.activeHalf).timeouts >= 1 ? "bg-yellow-300" : "bg-light"}  rounded-full`}/>
                            <span
                                className={`p-1.5  ${match?.matchDetails?.mainTeam.find(timeout => timeout.half === match.matchDetails.activeHalf).timeouts >= 2 ? "bg-yellow-300" : "bg-light"}  rounded-full`}/>
                            <span
                                className={`p-1.5  ${match?.matchDetails?.mainTeam.find(timeout => timeout.half === match.matchDetails.activeHalf).timeouts >= 3 ? "bg-yellow-300" : "bg-light"}  rounded-full`}/>
                            <span
                                className={`p-1.5  ${match?.matchDetails?.mainTeam.find(timeout => timeout.half === match.matchDetails.activeHalf).timeouts >= 4 ? "bg-yellow-300" : "bg-light"}  rounded-full`}/>
                            <span
                                className={`p-1.5  ${match?.matchDetails?.mainTeam.find(timeout => timeout.half === match.matchDetails.activeHalf).timeouts >= 5 ? "bg-yellow-300" : "bg-light"}  rounded-full`}/>
                        </div>
                        <div className="font-default">
                            {match?.matchDetails?.mainTeam.find(timeout => timeout.half === match.matchDetails.activeHalf).bonusPlus ? "Bonus +" : match?.matchDetails.mainTeam.find(timeout => timeout.half === match.matchDetails.activeHalf).bonus && "Bounce"}
                        </div>
                    </div>

                    {/* score board */}
                    <div className="font-default col-span-4  row-start-2 lg:row-auto lg:col-span-2  ">
                        <div className="flex justify-around items-center mb-3 lg:mb-5">
                            <h1 className="text-3xl">{match?.matchPlayers.mainTeamTotal || 0}</h1>
                            <h1 className="flex flex-col text-center text-3xl">
                                {match?.matchDetails?.activeHalfTime ? (
                                    <Timer
                                        expiryTimestamp={match.matchDetails.activeHalfTime}
                                        match={match}
                                    />
                                ) : (<div>00 : 00</div>)}
                                <span className="text-sm ">{match?.matchDetails?.activeHalf}</span>
                            </h1>
                            <h1 className="text-3xl">{match?.matchPlayers.opponentTeamTotal || 0}</h1>
                        </div>
                        <div className="w-full">
                            <div className="grid grid-cols-9 text-center font-bold">
                                <span className="bg-secondary-light h-6 col-span-3"></span>
                                {numberOfHalf.map(half => (
                                    <span key={half.value} className="bg-secondary-light h-6">{half.label}</span>
                                ))}
                                <span className="bg-secondary-light h-6"></span>
                            </div>

                            <div className="grid grid-cols-9 gap-0.5 text-secondary">
                                <span
                                    className="bg-white h-9 leading-9 px-2 col-span-3">{game?.mainTeam?.name || ""}</span>
                                {numberOfHalf.map(half => (
                                    <span
                                        key={half.value}
                                        className="bg-white h-9 leading-9 text-center">{match?.matchPlayers.mainTeamRosters ? calculateTeamHalf(match.matchPlayers.mainTeamRosters, half.value) : null}</span>
                                ))}
                                <span className="bg-white h-9 leading-9 text-center"></span>
                            </div>

                            <div className="grid grid-cols-9 gap-0.5 mt-0.5 text-secondary">
                                <span
                                    className="bg-white h-9 leading-9 px-2 col-span-3">{game?.opponentTeam?.name || ""}</span>
                                {numberOfHalf.map(half => (
                                    <span
                                        key={half.value}
                                        className="bg-white h-9 leading-9 text-center">{match?.matchPlayers.opponentTeamRosters ? calculateTeamHalf(match.matchPlayers.opponentTeamRosters, half.value) : null}</span>
                                ))}
                                <span className="bg-white h-9 leading-9 text-center"></span>
                            </div>
                        </div>
                    </div>

                    <div className="text-center col-span-2 lg:col-span-1">

                        <h1 className="font-default font-light lg:text-xl">
                            <span className="text-sm hidden sm:inline-block">12-8</span> {game?.opponentTeam?.name || ""}
                        </h1>

                        <div className="w-16 h-16 lg:w-24 lg:h-24 bg-white rounded-full my-2 overflow-hidden mx-auto ">
                            <img src={process.env.REACT_APP_SERVER_PATH + "/image.jpg"} />
                        </div>
                        <div className="my-1 lg:my-3 gap-3 flex justify-center">
                            <span
                                className={`p-1.5  ${match?.matchDetails.opponentTeam.find(timeout => timeout.half === match.matchDetails.activeHalf).timeouts >= 1 ? "bg-yellow-300" : "bg-light"}  rounded-full`}/>
                            <span
                                className={`p-1.5  ${match?.matchDetails.opponentTeam.find(timeout => timeout.half === match.matchDetails.activeHalf).timeouts >= 2 ? "bg-yellow-300" : "bg-light"}  rounded-full`}/>
                            <span
                                className={`p-1.5  ${match?.matchDetails.opponentTeam.find(timeout => timeout.half === match.matchDetails.activeHalf).timeouts >= 3 ? "bg-yellow-300" : "bg-light"}  rounded-full`}/>
                            <span
                                className={`p-1.5  ${match?.matchDetails.opponentTeam.find(timeout => timeout.half === match.matchDetails.activeHalf).timeouts >= 4 ? "bg-yellow-300" : "bg-light"}  rounded-full`}/>
                            <span
                                className={`p-1.5  ${match?.matchDetails.opponentTeam.find(timeout => timeout.half === match.matchDetails.activeHalf).timeouts >= 5 ? "bg-yellow-300" : "bg-light"}  rounded-full`}/>
                        </div>
                        <div className="font-default">
                            {match?.matchDetails.opponentTeam.find(timeout => timeout.half === match.matchDetails.activeHalf).bonusPlus ? "Bonus +" : match?.matchDetails.opponentTeam.find(timeout => timeout.half === match.matchDetails.activeHalf).bonus && "Bounce"}
                        </div>
                    </div>


                </div>

            </div>

        </div>
    )
}