import React, {useEffect} from "react";
import Footer from "../../Ui/Footer";
import Wrapper from "../../Ui/Form/Wrapper";
import GameBoardHeader from "../../Ui/GameBoardHeader";
import DefaultModal from "../../Ui/Modals/DefaultModal";
import {
    FIRST_HALF, FOURTH_HALF, MATCH_HALF,
    OPPONENTS_TEAM_ROSTERS,
    POINT_MADE, SECOND_HALF,
    TEAM_ROSTERS,
    TEAMS_PATH, THIRD_HALF
} from "../../../state/constants/Constans";
import {useNavigate} from "react-router-dom";

export default function GameBoardView({
                                          getMatchRequest,
                                          updateMatchRequest,
                                          changeMatchState,
                                          match,
                                          stats,
                                          selectedGame
                                      }) {

    const navigate = useNavigate();


    useEffect(() => {
        if (!selectedGame?.id) return navigate(TEAMS_PATH);
        const promise = getMatchRequest(selectedGame.id, navigate)
        promise.then((result) => {
            if (result?.data?.matches[0]) {
                let arr = {...result.data.matches[0]}
                arr.matchDuration = {
                    isMatchStarted: true,
                    isClockStarted: true,
                }
                arr.matchDetails = {
                    activeHalf: FIRST_HALF
                }
                arr.game = selectedGame
                changeMatchState("match", arr)
            } else {
                navigate(TEAMS_PATH)
            }
        }).catch((error) => {
            navigate(TEAMS_PATH)
        });
    }, [])

    // console.log({match}, {selectedGame}, {stats}, "match....")

    const listOfHalf = [
        {label: 1, value: FIRST_HALF, time: "10"},
        {label: 2, value: SECOND_HALF, time: "12"},
        {label: "H", value: MATCH_HALF, time: "14"},
        {label: 3, value: THIRD_HALF, time: "15"},
        {label: 4, value: FOURTH_HALF, time: "16"}
    ]

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

    const _calculateTotalOfTeam = (rosters) => {
        let total = 0;
        rosters.map(roster => (roster?.score?.total ? total += parseInt(roster.score.total) : 0))
        return total
    }

    const _handleActions = (action, points) => {
        // eslint-disable-next-line default-case
        switch (action) {
            case POINT_MADE:

                let teamRosters = match.matchPlayers.mainTeamRosters.map(player => player.action.isActive ? {
                    ...player,
                    action: {isActive: false, recentMade: true},
                    scores: player.scores?.length ? player.scores.map((score) => score.half === match.matchDetails.activeHalf ? {half: match.matchDetails.activeHalf, total : score.total + points} : score ): [{half: match.matchDetails.activeHalf, total: points}]
                } :  ({
                    ...player,
                    action: {...player.action, isActive: false, recentMade: false}
                }));

                console.log(teamRosters, "updatedTeamRosters")

                changeMatchState("match", {
                    ...match,
                    matchPlayers: {
                        ...match.matchPlayers,
                        // mainTeamTotal: _calculateTotalOfTeam(match.matchPlayers.mainTeamRosters),
                        mainTeamTotal: 5,
                        // opponentTeamTotal: _calculateTotalOfTeam(match.matchPlayers.opponentTeamRosters),
                        opponentTeamTotal: 5,
                        recentAction: {actionFor: action, actionName: POINT_MADE, points: points},
                        mainTeamRosters: match.recentAction.actionFor === TEAM_ROSTERS ? teamRosters : match.matchPlayers.mainTeamRosters,
                        opponentTeamRosters: match.recentAction.actionFor === OPPONENTS_TEAM_ROSTERS ? match.matchPlayers.opponentTeamRosters.map(player => player.action.isActive ? ({
                            ...player,
                            score: {
                                lastScore: true,
                                total: player?.score?.total ? player.score.total + points : points
                            },
                            action: {
                                isActive: false,
                                recentMade: true,
                            }
                        }) : ({
                            ...player,
                            action: {...player.action, isActive: false, recentMade: false}
                        })) : match.matchPlayers.opponentTeamRosters
                    }
                })
                break
        }
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
                readyOnly={!match?.matchDuration.isMatchStarted || !match?.matchDuration.isClockStarted}>
                <div className="grid grid-cols-5 gap-5">
                    <div className="mt-5">
                        {match && match.matchPlayers.mainTeamRosters.length ? match.matchPlayers.mainTeamRosters.map(roster => (
                            <div key={roster.id}
                                 onClick={() => changeMatchState("match", {
                                     ...match,
                                     recentAction: {actionFor: TEAM_ROSTERS},
                                     matchPlayers: {
                                         ...match.matchPlayers,
                                         mainTeamRosters: match.matchPlayers.mainTeamRosters.map(player => player.id === roster.id ? ({
                                             ...player,
                                             action: {...player.action, isActive: true}
                                         }) : ({...player, action: {...player.action, isActive: false}}))
                                     }
                                 })}
                                 className={` ${roster?.action?.isActive ? "bg-primary hover:bg-secondary text-white" : "bg-light hover:bg-primary"}  cursor-pointer hover:text-white rounded py-5 text-center text-xl font-sans mb-2`}>
                                {roster.number + ' ' + roster.name}
                                {/*{console.log(roster, "check is active work or not")}*/}

                            </div>
                        )) : null}
                    </div>
                    <div className="mt-5 col-span-3 ">
                        <div className="bg-light rounded h-96"></div>
                        <div/>
                        <div className="my-5">
                            <div className="grid grid-cols-6 gap-1">
                                <div
                                    onClick={() => _handleActions(POINT_MADE, 2)}
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
                                    {match?.matchDuration.isClockStarted && (
                                        <div className="bg-white opacity-30 h-6 w-full absolute"/>)}
                                    {listOfHalf.map((half, key) => (
                                        <div
                                            key={key}
                                            onClick={() => changeMatchState("match", {
                                                ...match,
                                                matchDetails: {...match.matchDetails, activeHalf: half.value}
                                            })}
                                            className={` ${half.value === match?.matchDetails?.activeHalf ? "bg-primary" : "bg-secondary-light"}  hover:bg-secondary cursor-pointer text-center text-white rounded`}> {half.label}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                    </div>
                    <div className="mt-5">
                        {match && match.matchPlayers.opponentTeamRosters.length ? match.matchPlayers.opponentTeamRosters.map(roster => (
                            <div key={roster.id}
                                 onClick={() => changeMatchState("match", {
                                     ...match,
                                     recentAction: {actionFor: OPPONENTS_TEAM_ROSTERS},
                                     matchPlayers: {
                                         ...match.matchPlayers,
                                         opponentTeamRosters: match.matchPlayers.opponentTeamRosters.map(player => player.id === roster.id ? ({
                                             ...player,
                                             action: {...player.action, isActive: true}
                                         }) : ({...player, action: {...player.action, isActive: false}}))
                                     }
                                 })}
                                 className={` ${roster?.action?.isActive ? "bg-primary hover:bg-secondary text-white" : "bg-light hover:bg-primary"}  cursor-pointer hover:text-white rounded py-5 text-center text-xl font-sans mb-2`}>
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