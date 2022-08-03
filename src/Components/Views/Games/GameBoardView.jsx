import React, {useEffect} from "react";
import Footer from "../../Ui/Footer";
import Wrapper from "../../Ui/Form/Wrapper";
import GameBoardHeader from "../../Ui/GameBoardHeader";
import DefaultModal from "../../Ui/Modals/DefaultModal";
import {
    ACTIVITY, ASSIST, BLOCK, BONUS, BONUS_PLUS, CHARGE, DETAILS,
    FIRST_HALF, FOUL, FOURTH_HALF, MAIN_TEAM, MAKE_SUB, MATCH_HALF, MISS, OPPONENT_TEAM,
    OPPONENTS_TEAM_ROSTERS,
    POINT_MADE, POINT_MISSED, REBOUND, SECOND_HALF, STEAL,
    TEAM_ROSTERS,
    TEAMS_PATH, THIRD_HALF, TIMEOUTS, TURNOVER, UNDO_STATS
} from "../../../state/constants/Constans";
import {useNavigate} from "react-router-dom";
import {ReactSVG} from "react-svg";
import plus from "../../../Media/icons/plus.svg";
import minus from "../../../Media/icons/minus.svg";
import Switch from "react-switch";
import * as matchApi from "./../../../../src/state/apis/matchApi";


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
                arr.game = selectedGame
                changeMatchState("match", arr)
            } else {
                navigate(TEAMS_PATH)
            }
        }).catch((error) => {
            navigate(TEAMS_PATH)
        });
    }, [])

    // console.log(match?.matchDetails, "match details....")

    const numberOfHalf = [
        {label: 1, value: FIRST_HALF, time: "10"},
        {label: 2, value: SECOND_HALF, time: "12"},
        {label: "H", value: MATCH_HALF, time: "14"},
        {label: 3, value: THIRD_HALF, time: "15"},
        {label: 4, value: FOURTH_HALF, time: "16"}
    ]

    const _handelEndGame = () => {
        matchApi.endMatch(match.id, {homeEmail:stats.homeEmail, awayEmail:stats.awayEmail})
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
        rosters.filter(roster => {
            if (roster.scores) {
                roster.scores.map(score => total += score.total)
            }
        })
        return total
    }

    const _calculateTotalOfTeamHalf = (rosters, half) => {
        let total = 0;
        rosters.filter(roster => {
            if (roster.scores) {
                roster.scores.map(score => score.half === half ? total += score.total : null)
            }
        })
        return total
    }

    const _handleActions = (action, payload) => {
        // eslint-disable-next-line default-case
        switch (action) {
            case POINT_MADE:
                if (match.matchDetails?.recentAction?.team) {
                    let teamRosters = match.matchPlayers[match.matchDetails.recentAction.team].map(player => player.action.isActive ? {
                        ...player,
                        action: {...player.action, isActive: false},
                        scores: player.scores?.length ? player.scores.map(score => score.half === match.matchDetails.activeHalf ? {
                                ...score,
                                total: parseInt(score.total) + parseInt(payload.points)
                            } : score)
                            : [...numberOfHalf.map((half, index) => ({
                                half: half.value,
                                total: index === 0 ? payload.points : 0
                            }))]
                    } : ({
                        ...player,
                        action: {...player.action, isActive: false, isRecent: false}
                    }));

                    changeMatchState("match", {
                        ...match,
                        matchDetails: {
                            ...match.matchDetails,
                            recentAction: {
                                team: match.matchDetails.recentAction.team,
                                action: POINT_MADE,
                                points: payload.points,
                                half: match.matchDetails.activeHalf
                            }
                        },
                        matchPlayers: {
                            ...match.matchPlayers,
                            mainTeamTotal: match.matchDetails.recentAction.team === TEAM_ROSTERS ? _calculateTotalOfTeam(teamRosters) : match.matchPlayers.mainTeamTotal,
                            opponentTeamTotal: match.matchDetails.recentAction.team === OPPONENTS_TEAM_ROSTERS ? _calculateTotalOfTeam(teamRosters) : match.matchPlayers.opponentTeamTotal,
                            mainTeamRosters: match.matchDetails.recentAction.team === TEAM_ROSTERS ? teamRosters : match.matchPlayers.mainTeamRosters,
                            opponentTeamRosters: match.matchDetails.recentAction.team === OPPONENTS_TEAM_ROSTERS ? teamRosters : match.matchPlayers.opponentTeamRosters
                        }
                    })
                }
                break;

            case ACTIVITY :
                if (match.matchDetails?.recentAction?.team) {
                    let teamRostersActivity = match.matchPlayers[match.matchDetails.recentAction.team].map(player => player.action.isActive ? {
                        ...player,
                        action: {isActive: false, isRecent: true},
                        activities: player.activities?.length ? player.activities.map(activity => activity.half === match.matchDetails.activeHalf ? {
                                ...activity,
                                activity: [...activity.activity, {name: payload.name, message: payload.message}]
                            } : activity)
                            : [...numberOfHalf.map((half, index) => ({
                                half: half.value,
                                activity: [{name: payload.name, message: payload.message}]
                            }))]
                    } : ({
                        ...player,
                        action: {...player.action, isActive: false, isRecent: false}
                    }))

                    let foulsCount = teamRostersActivity.map(roster => roster.activities.find(ac => ac.half === match.matchDetails.activeHalf).activity).reduce((acc, current) => {
                        return current.filter(c => c.name === FOUL).length
                    }, 0);

                    let bonusCheck = match.matchDetails[match.matchDetails.recentAction.team === TEAM_ROSTERS ? OPPONENT_TEAM : MAIN_TEAM].map(team => team.half === match.matchDetails.activeHalf ? foulsCount >= 10 ? {
                        ...team,
                        bonusPlus: true
                    } : foulsCount >= 7 ? {...team, bonus: true} : team : team);


                    changeMatchState("match", {
                        ...match,
                        matchDetails: {
                            ...match.matchDetails,
                            mainTeam: match.matchDetails.recentAction.team === OPPONENTS_TEAM_ROSTERS ? bonusCheck : match.matchDetails.mainTeam,
                            opponentTeam: match.matchDetails.recentAction.team === TEAM_ROSTERS ? bonusCheck : match.matchDetails.opponentTeam,
                            recentAction: {
                                team: match.matchDetails.recentAction.team,
                                action: ACTIVITY,
                                half: match.matchDetails.activeHalf
                            }
                        },
                        matchPlayers: {
                            ...match.matchPlayers,
                            mainTeamRosters: match.matchDetails.recentAction.team === TEAM_ROSTERS ? teamRostersActivity : match.matchPlayers.mainTeamRosters,
                            opponentTeamRosters: match.matchDetails.recentAction.team === OPPONENTS_TEAM_ROSTERS ? teamRostersActivity : match.matchPlayers.opponentTeamRosters
                        }
                    })
                }
                break;

            case DETAILS :
                let matchDetails = match.matchDetails[payload.team].map(details => details.half === match.matchDetails.activeHalf ? {
                    ...details,
                    isActiveMakeSub: payload.name === MAKE_SUB ? !details.isActiveMakeSub : details.isActiveMakeSub,
                    timeouts: payload.name === TIMEOUTS ? payload.isPlusTimeout ? details.timeouts <= 4 ? details.timeouts + 1 : details.timeouts : details.timeouts > 0 ? details.timeouts - 1 : details.timeouts : details.timeouts,
                    bonus: payload.name === BONUS ? !details.bonus : details.bonus,
                    bonusPlus: payload.name === BONUS_PLUS ? !details.bonusPlus : details.bonusPlus,
                } : details)

                changeMatchState("match", {
                    ...match,
                    matchDetails: {...match.matchDetails, [payload.team]: matchDetails}
                })
                break

            case UNDO_STATS :
                if (match?.matchDetails?.recentAction?.action) {
                    const {action} = match.matchDetails.recentAction;
                    let rosters = []
                    switch (action) {
                        case POINT_MADE:
                            rosters = match.matchPlayers[match.matchDetails.recentAction.team].map(player => player.action.isRecent ? {
                                ...player,
                                scores: player.scores.map(score => score.half === match.matchDetails.recentAction.half ? {
                                    ...score,
                                    total: parseInt(score.total) - parseInt(match.matchDetails.recentAction.points)
                                } : score)
                            } : player)
                            break
                        case ACTIVITY:
                            rosters = match.matchPlayers[match.matchDetails.recentAction.team].map(player => player.action.isRecent ? {
                                ...player,
                                activities: player.activities.map(item => item.half === match.matchDetails.recentAction.half ? {
                                    ...item,
                                    activity: item.activity.filter((ac, index) => index !== (item.activity.length - 1))
                                } : item)
                            } : player)
                            break
                    }

                    let foulsCount = rosters.map(roster => roster.activities.find(ac => ac.half === match.matchDetails.activeHalf).activity).reduce((acc, current) => {
                        return current.filter(c => c.name === FOUL).length
                    }, 0);

                    let bonusCheck = match.matchDetails[match.matchDetails.recentAction.team === TEAM_ROSTERS ? OPPONENT_TEAM : MAIN_TEAM].map(team => team.half === match.matchDetails.activeHalf ? foulsCount < 7 ? {
                        ...team,
                        bonus: false
                    } : foulsCount < 10 ? {
                        ...team,
                        bonusPlus: false
                    } : team : team);

                    changeMatchState("match", {
                        ...match,
                        matchDetails: {
                            ...match.matchDetails,
                            recentAction: null,
                            mainTeam: match.matchDetails.recentAction.team === OPPONENTS_TEAM_ROSTERS ? bonusCheck : match.matchDetails.mainTeam,
                            opponentTeam: match.matchDetails.recentAction.team === TEAM_ROSTERS ? bonusCheck : match.matchDetails.opponentTeam
                        },
                        matchPlayers: {
                            ...match.matchPlayers,
                            mainTeamRosters: match.matchDetails.recentAction.team === TEAM_ROSTERS ? rosters : match.matchPlayers.mainTeamRosters,
                            opponentTeamRosters: match.matchDetails.recentAction.team === OPPONENTS_TEAM_ROSTERS ? rosters : match.matchPlayers.opponentTeamRosters
                        }
                    })
                }
                break
        }
        updateMatchRequest(match, navigate)
    }

    return (
        <>
            <GameBoardHeader
                match={match}
                numberOfHalf={numberOfHalf}
                changeMatchState={changeMatchState}
                calculateTeamHalf={_calculateTotalOfTeamHalf}
            />

            {match?.matchDuration.isMatchEnd && (
                <DefaultModal
                    title="Do you want to send stats?"
                    className="px-0 py-5 "
                    buttonLabel="Done"
                    isDisabledButton={!stats?.homeEmail && !stats?.awayEmail}
                    clickEvent={stats?.homeEmail && stats?.awayEmail ? _handelEndGame : null}
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
                                     matchDetails: {...match.matchDetails, recentAction: {team: TEAM_ROSTERS}},
                                     matchPlayers: {
                                         ...match.matchPlayers,
                                         mainTeamRosters: match.matchPlayers.mainTeamRosters.map(player => player.id === roster.id ? ({
                                             ...player,
                                             action: {isActive: true, isRecent: true}
                                         }) : ({
                                             ...player,
                                             action: {isActive: false, isRecent: false}
                                         })),
                                         opponentTeamRosters: match.matchPlayers.opponentTeamRosters.map(player => ({
                                             ...player,
                                             action: {isActive: false, isRecent: false}
                                         }))
                                     }
                                 })}
                                 className={` ${roster?.action?.isActive ? "bg-primary hover:bg-secondary text-white" : "bg-light hover:bg-primary"}  cursor-pointer hover:text-white rounded py-5 text-center text-xl font-sans mb-2`}>
                                {roster.number + ' ' + roster.name}
                            </div>
                        )) : null}

                        <div
                            onClick={(e) => _handleActions(DETAILS, {name: MAKE_SUB, team: MAIN_TEAM})}
                            className={` ${match?.matchDetails.mainTeam.find(d => d.half === match.matchDetails.activeHalf).isActiveMakeSub ? "bg-primary hover:bg-secondary text-white" : "bg-light hover:bg-primary"} mt-10  cursor-pointer hover:text-white rounded py-5 text-center text-xl font-bold text-secondary-light mb-2`}>
                            Make Sub
                        </div>

                        <div className="flex items-center timeout-buttons-group mt-5 relative z-10">
                            {match?.matchDuration.isClockStarted && (
                                <div className="bg-white opacity-30 h-full w-full absolute"/>)}
                            <div
                                onClick={(e) => _handleActions(DETAILS, {
                                    name: TIMEOUTS,
                                    isPlusTimeout: false,
                                    team: MAIN_TEAM
                                })}
                                className=" bg-secondary-light w-32 flex justify-center hover:bg-primary cursor-pointer hover:text-white  rounded-l py-3 text-center text-xl font-sans mb-2">
                                <ReactSVG src={minus}/>
                            </div>
                            <div
                                className={` bg-light w-full   py-3 text-center text-xl font-sans mb-2`}>
                                {match?.matchDetails.mainTeam.find(d => d.half === match.matchDetails.activeHalf).timeouts}
                            </div>
                            <div
                                onClick={(e) => _handleActions(DETAILS, {
                                    name: TIMEOUTS,
                                    isPlusTimeout: true,
                                    team: MAIN_TEAM
                                })}
                                className=" bg-secondary-light w-32 flex justify-center hover:bg-primary cursor-pointer hover:text-white  rounded-r  py-3 text-center text-xl font-sans mb-2">
                                <ReactSVG src={plus}/>
                            </div>
                        </div>
                        <div className="text-center text-sm font-bold text-secondary-light">
                            Timeouts
                        </div>
                        <div className="flex items-center justify-between my-4">
                            <p className="text-xl font-bold text-secondary-light">Bonus</p>
                            <Switch
                                className="react-switch"
                                onChange={(e) => _handleActions(DETAILS, {name: BONUS, team: MAIN_TEAM})}
                                checked={match?.matchDetails.mainTeam.find(d => d.half === match.matchDetails.activeHalf).bonus || false}
                                uncheckedIcon={false}
                                checkedIcon={false}
                            />
                        </div>

                        <div className="flex items-center justify-between">
                            <p className="text-xl font-bold text-secondary-light">Bonus +</p>
                            <Switch
                                className="react-switch"
                                onChange={(e) => _handleActions(DETAILS, {name: BONUS_PLUS, team: MAIN_TEAM})}
                                checked={match?.matchDetails.mainTeam.find(d => d.half === match.matchDetails.activeHalf).bonusPlus || false}
                                required
                                uncheckedIcon={false}
                                checkedIcon={false}
                            />
                        </div>


                    </div>
                    <div className="mt-5 col-span-3 ">
                        <div className="bg-light rounded h-96"></div>
                        <div/>
                        <div className="my-5">
                            <div className="grid grid-cols-6 gap-1">
                                <div
                                    onClick={() => _handleActions(POINT_MADE, {points: 2})}
                                    className="bg-secondary-light hover:bg-secondary text-light text-center rounded py-3 cursor-pointer flex flex-col">
                                    <b>2 Points</b>
                                    <span>Made</span>
                                </div>
                                <div
                                    onClick={() => _handleActions(ACTIVITY, {name: MISS, message: "2 point missed"})}
                                    className="bg-secondary-light hover:bg-secondary text-light text-center rounded py-3 cursor-pointer flex flex-col">
                                    <b>2 Points</b>
                                    <span>Miss</span>
                                </div>

                                <div
                                    onClick={() => _handleActions(POINT_MADE, {points: 3})}
                                    className="bg-secondary-light hover:bg-secondary text-light text-center rounded py-3 cursor-pointer flex flex-col">
                                    <b>3 Points</b>
                                    <span>Made</span>
                                </div>
                                <div
                                    onClick={() => _handleActions(ACTIVITY, {name: MISS, message: "3 point missed"})}
                                    className="bg-secondary-light hover:bg-secondary text-light text-center rounded py-3 cursor-pointer flex flex-col">
                                    <b>3 Points</b>
                                    <span>Miss</span>
                                </div>

                                <div
                                    onClick={() => _handleActions(POINT_MADE, {points: 1})}
                                    className="bg-secondary-light hover:bg-secondary text-light text-center rounded py-3 cursor-pointer flex flex-col">
                                    <b>1 Point</b>
                                    <span>Made</span>
                                </div>
                                <div
                                    onClick={() => _handleActions(ACTIVITY, "1 point missed")}
                                    className="bg-secondary-light hover:bg-secondary text-light text-center rounded py-3 cursor-pointer flex flex-col">
                                    <b>1 Point</b>
                                    <span>Miss</span>
                                </div>
                            </div>
                            <div className="grid grid-cols-6 gap-1 my-1">
                                <div
                                    onClick={() => _handleActions(ACTIVITY, {name: ASSIST, message: "Assist"})}
                                    className="bg-secondary-light hover:bg-secondary text-light text-center rounded py-3 cursor-pointer flex items-center justify-center">
                                    <b>Assist</b>
                                </div>
                                <div
                                    onClick={() => _handleActions(ACTIVITY, {
                                        name: REBOUND,
                                        message: "Rebound Offense"
                                    })}
                                    className="bg-secondary-light hover:bg-secondary text-light text-center rounded py-3 cursor-pointer flex flex-col">
                                    <b>Rebound</b>
                                    <span>Offense</span>
                                </div>

                                <div
                                    onClick={() => _handleActions(ACTIVITY, {
                                        name: REBOUND,
                                        message: "Rebound Defense"
                                    })}
                                    className="bg-secondary-light hover:bg-secondary text-light text-center rounded py-3 cursor-pointer flex flex-col">
                                    <b>Rebound</b>
                                    <span>Defense</span>
                                </div>
                                <div
                                    onClick={() => _handleActions(ACTIVITY, {name: STEAL, message: "Steal"})}
                                    className="bg-secondary-light hover:bg-secondary text-light text-center rounded py-3 cursor-pointer flex justify-center items-center">
                                    <b>Steal</b>
                                </div>
                                <div
                                    onClick={() => _handleActions(ACTIVITY, {name: BLOCK, message: "Bock"})}
                                    className="bg-secondary-light hover:bg-secondary text-light text-center rounded py-3 cursor-pointer flex justify-center items-center">
                                    <b>Block</b>
                                </div>
                                <div
                                    onClick={() => _handleActions(ACTIVITY, {name: TURNOVER, message: "Turnover"})}
                                    className="bg-secondary-light hover:bg-secondary text-light text-center rounded py-3 cursor-pointer flex justify-center items-center">
                                    <b>Turnover</b>
                                </div>
                            </div>
                            <div className="grid grid-cols-6 gap-1">
                                <div
                                    onClick={() => _handleActions(ACTIVITY, {name: FOUL, message: "Foul Offense"})}
                                    className="bg-secondary-light hover:bg-secondary text-light text-center rounded py-3 cursor-pointer flex flex-col">
                                    <b>Foul</b>
                                    <span>Offense</span>
                                </div>
                                <div
                                    onClick={() => _handleActions(ACTIVITY, {name: FOUL, message: "Foul Defense"})}
                                    className="bg-secondary-light hover:bg-secondary text-light text-center rounded py-3 cursor-pointer flex flex-col">
                                    <b>Foul</b>
                                    <span>Defense</span>
                                </div>

                                <div
                                    onClick={() => _handleActions(ACTIVITY, {name: CHARGE, message: "Charge"})}
                                    className="bg-secondary-light hover:bg-secondary text-light text-center rounded py-3 cursor-pointer flex justify-center items-center">
                                    <b>Charge</b>
                                </div>
                                <div
                                    onClick={() => _handleActions(UNDO_STATS)}
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
                                    {numberOfHalf.map((half, key) => (
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
                                     matchDetails: {
                                         ...match.matchDetails,
                                         recentAction: {team: OPPONENTS_TEAM_ROSTERS}
                                     },
                                     matchPlayers: {
                                         ...match.matchPlayers,
                                         mainTeamRosters: match.matchPlayers.mainTeamRosters.map(player => ({
                                             ...player,
                                             action: {isActive: false, isRecent: false}
                                         })),
                                         opponentTeamRosters: match.matchPlayers.opponentTeamRosters.map(player => player.id === roster.id ? ({
                                             ...player,
                                             action: {isActive: true, isRecent: true}
                                         }) : ({
                                             ...player,
                                             action: {isActive: false, isRecent: false}
                                         })),
                                     }
                                 })}
                                 className={` ${roster?.action?.isActive ? "bg-primary hover:bg-secondary text-white" : "bg-light hover:bg-primary"}  cursor-pointer hover:text-white rounded py-5 text-center text-xl font-sans mb-2`}>
                                {roster.number + ' ' + roster.name}
                            </div>
                        )) : null}
                        <div
                            onClick={(e) => _handleActions(DETAILS, {name: MAKE_SUB, team: OPPONENT_TEAM})}
                            className={` ${match?.matchDetails.opponentTeam.find(d => d.half === match.matchDetails.activeHalf).isActiveMakeSub ? "bg-primary hover:bg-secondary text-white" : "bg-light hover:bg-primary"} mt-10  cursor-pointer hover:text-white rounded py-5 text-center text-xl font-bold text-secondary-light mb-2`}>
                            Make Sub
                        </div>

                        <div className="flex items-center timeout-buttons-group mt-5 relative z-10">
                            {match?.matchDuration.isClockStarted && (
                                <div className="bg-white opacity-30 h-full w-full absolute"/>)}
                            <div
                                onClick={(e) => _handleActions(DETAILS, {
                                    name: TIMEOUTS,
                                    isPlusTimeout: false,
                                    team: OPPONENT_TEAM
                                })}
                                className=" bg-secondary-light w-32 flex justify-center hover:bg-primary cursor-pointer hover:text-white  rounded-l py-3 text-center text-xl font-sans mb-2">
                                <ReactSVG src={minus}/>
                            </div>
                            <div
                                className={` bg-light w-full   py-3 text-center text-xl font-sans mb-2`}>
                                {match?.matchDetails.opponentTeam.find(d => d.half === match.matchDetails.activeHalf).timeouts}
                            </div>
                            <div
                                onClick={(e) => _handleActions(DETAILS, {
                                    name: TIMEOUTS,
                                    isPlusTimeout: true,
                                    team: OPPONENT_TEAM
                                })}
                                className=" bg-secondary-light w-32 flex justify-center hover:bg-primary cursor-pointer hover:text-white  rounded-r  py-3 text-center text-xl font-sans mb-2">
                                <ReactSVG src={plus}/>
                            </div>
                        </div>
                        <div className="text-center text-sm font-bold text-secondary-light">
                            Timeouts
                        </div>
                        <div className="flex items-center justify-between my-4">
                            <p className="text-xl font-bold text-secondary-light">Bonus</p>
                            <Switch
                                className="react-switch"
                                onChange={(e) => _handleActions(DETAILS, {name: BONUS, team: OPPONENT_TEAM})}
                                checked={match?.matchDetails.opponentTeam.find(d => d.half === match.matchDetails.activeHalf).bonus || false}
                                uncheckedIcon={false}
                                checkedIcon={false}
                            />
                            {/*{console.log(match?.matchDetails.opponentTeam.find(d => d.half === match.matchDetails.activeHalf).bonus, match?.matchDetails.opponentTeam.find(d => d.half === match.matchDetails.activeHalf).bonusPlus, "check bounces opponent")}*/}
                            {/*{console.log(match?.matchDetails.mainTeam.find(d => d.half === match.matchDetails.activeHalf).bonus, match?.matchDetails.mainTeam.find(d => d.half === match.matchDetails.activeHalf).bonusPlus, "check bounces main")}*/}
                        </div>

                        <div className="flex items-center justify-between">
                            <p className="text-xl font-bold text-secondary-light">Bonus +</p>
                            <Switch
                                className="react-switch"
                                onChange={(e) => _handleActions(DETAILS, {name: BONUS_PLUS, team: OPPONENT_TEAM})}
                                checked={match?.matchDetails.opponentTeam.find(d => d.half === match.matchDetails.activeHalf).bonusPlus || false}
                                required
                                uncheckedIcon={false}
                                checkedIcon={false}
                            />
                        </div>

                    </div>
                </div>
            </Wrapper>
            <Footer/>
        </>
    )
}