import React, {useEffect} from "react";
import Footer from "../../Ui/Footer";
import Wrapper from "../../Ui/Form/Wrapper";
import GameBoardHeader from "../../Ui/GameBoardHeader";
import DefaultModal from "../../Ui/Modals/DefaultModal";
import {
    ACTIVITY, BONUS, BONUS_PLUS, DETAILS,
    FIRST_HALF, FOURTH_HALF, MAIN_TEAM, MAKE_SUB, MATCH_HALF, OPPONENT_TEAM,
    OPPONENTS_TEAM_ROSTERS,
    POINT_MADE, POINT_MISSED, SECOND_HALF,
    TEAM_ROSTERS,
    TEAMS_PATH, THIRD_HALF, TIMEOUTS, UNDO_STATS
} from "../../../state/constants/Constans";
import {useNavigate} from "react-router-dom";
import {ReactSVG} from "react-svg";
import plus from "../../../Media/icons/plus.svg";
import minus from "../../../Media/icons/minus.svg";
import Switch from "react-switch";


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
                    activeHalf: FIRST_HALF,
                    mainTeam: [...numberOfHalf.map((half, index) => ({
                        half: half.value,
                        isActiveMakeSub: false,
                        timeouts: 0,
                        bonus: false,
                        bonusPlus: false
                    }))],
                    opponentTeam: [...numberOfHalf.map((half, index) => ({
                        half: half.value,
                        isActiveMakeSub: false,
                        timeouts: 0,
                        bonus: false,
                        bonusPlus: false
                    }))],
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

    console.log({match}, "match....")

    const numberOfHalf = [
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
        rosters.filter(roster => {
            if (roster.scores) {
                roster.scores.map(score =>  total += score.total)
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
                let teamRosters = match.matchPlayers[match.recentAction.actionFor].map(player => player.action.isActive ? {
                    ...player,
                    action: {isActive: false, recentMade: true},
                    scores: player.scores?.length ? player.scores.map(score => score.half === match.matchDetails.activeHalf ? {
                            ...score,
                            total: score.total + payload
                        } : score)
                        : [...numberOfHalf.map((half, index) => ({half: half.value, total: index === 0 ? payload : 0}))]
                } : ({
                    ...player,
                    action: {...player.action, isActive: false, recentMade: false}
                }));

                console.log(teamRosters, match.recentAction.actionFor)
                changeMatchState("match", {
                    ...match,
                    matchPlayers: {
                        ...match.matchPlayers,
                        mainTeamTotal: _calculateTotalOfTeam(teamRosters),
                        opponentTeamTotal: _calculateTotalOfTeam(teamRosters),
                        recentAction: {actionFor: action, actionName: POINT_MADE, points: payload},
                        mainTeamRosters: match.recentAction.actionFor === TEAM_ROSTERS ? teamRosters : match.matchPlayers.mainTeamRosters,
                        opponentTeamRosters: match.recentAction.actionFor === OPPONENTS_TEAM_ROSTERS ? teamRosters : match.matchPlayers.opponentTeamRosters
                    }
                })
                break;

            case ACTIVITY :
                let teamRostersActivity = match.matchPlayers[match.recentAction.actionFor].map(player => player.action.isActive ? {
                    ...player,
                    action: {isActive: false, recentAction: true},
                    activity: payload
                } : ({
                    ...player,
                    action: {...player.action, isActive: false, recentMade: false}
                }))
                console.log(teamRostersActivity, "teamRostersActivity")
                changeMatchState("match", {
                    ...match,
                    matchPlayers: {
                        ...match.matchPlayers,
                        recentAction: {actionFor: action, actionName: ACTIVITY, points: payload},
                        mainTeamRosters: match.recentAction.actionFor === TEAM_ROSTERS ? teamRostersActivity : match.matchPlayers.mainTeamRosters,
                        opponentTeamRosters: match.recentAction.actionFor === OPPONENTS_TEAM_ROSTERS ? teamRostersActivity : match.matchPlayers.opponentTeamRosters
                    }
                })
                break;

            case DETAILS :
                let matchDetails = match.matchDetails[payload.team].map(details => details.half === match.matchDetails.activeHalf ? {
                    ...details,
                    isActiveMakeSub: payload.name === MAKE_SUB ? !details.isActiveMakeSub : details.isActiveMakeSub,
                    timeouts: payload.name === TIMEOUTS ? payload.isPlusTimeout ? details.timeouts + 1 : details.timeouts - 1 : details.timeouts,
                    bonus: payload.name === BONUS ? !details.bonus : details.bonus,
                    bonusPlus: payload.name === BONUS_PLUS ? !details.bonusPlus : details.bonusPlus,
                } : details)

                console.log(matchDetails, "updatedMatchDetails")
                //
                changeMatchState("match", {
                    ...match,
                    matchDetails: {...match.matchDetails, [payload.team]: matchDetails}
                })
        }
    }

    // console.log(match?.matchDetails?.activeHalf)

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
                            </div>
                        )) : null}

                        <div
                            onClick={(e) => _handleActions(DETAILS, {name: MAKE_SUB, team: MAIN_TEAM})}
                            className={` ${match?.matchDetails.mainTeam.find(d => d.half === match.matchDetails.activeHalf).isActiveMakeSub ? "bg-primary hover:bg-secondary text-white" : "bg-light hover:bg-primary"} mt-10  cursor-pointer hover:text-white rounded py-5 text-center text-xl font-bold text-secondary-light mb-2`}>
                            Make Sub
                        </div>

                        <div className="flex items-center timeout-buttons-group mt-5">
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
                                    onClick={() => _handleActions(POINT_MADE, 2)}
                                    className="bg-secondary-light hover:bg-secondary text-light text-center rounded py-3 cursor-pointer flex flex-col">
                                    <b>2 Points</b>
                                    <span>Made</span>
                                </div>
                                <div
                                    onClick={() => _handleActions(ACTIVITY, "2 point missed")}
                                    className="bg-secondary-light hover:bg-secondary text-light text-center rounded py-3 cursor-pointer flex flex-col">
                                    <b>2 Points</b>
                                    <span>Miss</span>
                                </div>

                                <div
                                    onClick={() => _handleActions(POINT_MADE, 3)}
                                    className="bg-secondary-light hover:bg-secondary text-light text-center rounded py-3 cursor-pointer flex flex-col">
                                    <b>3 Points</b>
                                    <span>Made</span>
                                </div>
                                <div
                                    onClick={() => _handleActions(ACTIVITY, "3 point missed")}
                                    className="bg-secondary-light hover:bg-secondary text-light text-center rounded py-3 cursor-pointer flex flex-col">
                                    <b>3 Points</b>
                                    <span>Miss</span>
                                </div>

                                <div
                                    onClick={() => _handleActions(POINT_MADE, 1)}
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
                                    onClick={() => _handleActions(ACTIVITY, "Assist")}
                                    className="bg-secondary-light hover:bg-secondary text-light text-center rounded py-3 cursor-pointer flex items-center justify-center">
                                    <b>Assist</b>
                                </div>
                                <div
                                    onClick={() => _handleActions(ACTIVITY, "Rebound Offense")}
                                    className="bg-secondary-light hover:bg-secondary text-light text-center rounded py-3 cursor-pointer flex flex-col">
                                    <b>Rebound</b>
                                    <span>Offense</span>
                                </div>

                                <div
                                    onClick={() => _handleActions(ACTIVITY, "Rebound Defense")}
                                    className="bg-secondary-light hover:bg-secondary text-light text-center rounded py-3 cursor-pointer flex flex-col">
                                    <b>Rebound</b>
                                    <span>Defense</span>
                                </div>
                                <div
                                    onClick={() => _handleActions(ACTIVITY, "Steal")}
                                    className="bg-secondary-light hover:bg-secondary text-light text-center rounded py-3 cursor-pointer flex justify-center items-center">
                                    <b>Steal</b>
                                </div>
                                <div
                                    className="bg-secondary-light hover:bg-secondary text-light text-center rounded py-3 cursor-pointer flex justify-center items-center">
                                    <b>Block</b>
                                </div>
                                <div
                                    onClick={() => _handleActions(ACTIVITY, "Turnover")}
                                    className="bg-secondary-light hover:bg-secondary text-light text-center rounded py-3 cursor-pointer flex justify-center items-center">
                                    <b>Turnover</b>
                                </div>
                            </div>
                            <div className="grid grid-cols-6 gap-1">
                                <div
                                    onClick={() => _handleActions(ACTIVITY, "Foul Offense")}
                                    className="bg-secondary-light hover:bg-secondary text-light text-center rounded py-3 cursor-pointer flex flex-col">
                                    <b>Foul</b>
                                    <span>Offense</span>
                                </div>
                                <div
                                    onClick={() => _handleActions(ACTIVITY, "Foul Defense")}
                                    className="bg-secondary-light hover:bg-secondary text-light text-center rounded py-3 cursor-pointer flex flex-col">
                                    <b>Foul</b>
                                    <span>Defense</span>
                                </div>

                                <div
                                    onClick={() => _handleActions(ACTIVITY, "Charge")}
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
                        <div
                            onClick={(e) => _handleActions(DETAILS, {name: MAKE_SUB, team: OPPONENT_TEAM})}
                            className={` ${match?.matchDetails.opponentTeam.find(d => d.half === match.matchDetails.activeHalf).isActiveMakeSub ? "bg-primary hover:bg-secondary text-white" : "bg-light hover:bg-primary"} mt-10  cursor-pointer hover:text-white rounded py-5 text-center text-xl font-bold text-secondary-light mb-2`}>
                            Make Sub
                        </div>

                        <div className="flex items-center timeout-buttons-group mt-5">
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