import React, {useEffect, useState} from 'react';
import {ReactSVG} from "react-svg";
import plus from "../../../Media/icons/plus.svg";

import Footer from "../../Ui/Footer";
import Wrapper from "../../Ui/Form/Wrapper";
import DarkButton from "../../Ui/Buttons/DarkButton";
import PageMainNavigation from "../../Ui/PageMainNavigation";
import {BASE_PATH, FAN_ROLE_ID, LOCAL_STORAGE_AUTH_USER} from "../../../state/constants/Constans";
import {useNavigate} from "react-router-dom";
import Breadcrumbs from "../../Ui/Breadcrumbs";
import PrimaryButton from "../../Ui/Buttons/PrimaryButton";
import ValidationMessage from "../../Ui/Form/ValidationMessage";
import {getTeams, verifyScheduleTime} from "../../../state/actions/gameActions";

const GameForm = ({createGamesRequest, formData, error}) => {

    const {user} = JSON.parse(window.localStorage.getItem(LOCAL_STORAGE_AUTH_USER));

    const navigate = useNavigate();

    const playGroundsHome = 'home'
    const playGroundsAway = 'away'

    const [formState, setFormState] = useState({
        sportId: user.profile.sportId,
        team1Id: user.profile.id,
    })
    const [errors, setErrors] = useState(null)
    const [teams, setTeams] = useState([])

    useEffect(() => {
        if (user.roleId === FAN_ROLE_ID) navigate(BASE_PATH)
        getTeams().then(res => setTeams(res.data?.teams?.filter(item => item.id !== user.profile.id) || []))
    }, [])

    const _handleChange = (name, value) => {
        setFormState({...formState, [name]: value})
    }

    const _setPlayGround = (value) => {
        if(value === playGroundsHome){
            setFormState({...formState, team1PlayGround: value, team2PlayGround: playGroundsAway})
        }else if(value === playGroundsAway){
            setFormState({...formState, team1PlayGround: value, team2PlayGround: playGroundsHome})
        }
    }

    const _verifyScheduleTime = (dateTime) => {
        verifyScheduleTime({dateTime, team1Id: formState?.team1Id, team2Id: formState?.team2Id})
            .then(res => {
                if(res.data.isScheduled){
                    _handleChange('dateTime', dateTime)
                    setErrors(null)
                }else{
                    setErrors('Time is not available')
                }
            })
            .catch(err => {
                if(err.status === 400){
                    setErrors(Object.values(err.data?.validationResults || {}).join('; '))
                }else{
                    setErrors('Something went wrong. Please check your internet.')
                }
            })
        return true
    }

    const _saveGame = () => {
        createGamesRequest(formState, navigate)
    }

    return (
        <Wrapper>
            <div className="bg-secondary pb-8 lg:p-10 text-white">
                <div className="grid lg:grid-cols-3 gap-4 items-center justify-center">

                    <div className="mx-auto">
                        <div className="w-64 h-64 bg-white rounded-full my-10 relative overflow-hidden">
                            {/*<img src={creatingFeed} className="w-56 lg:w-64 mt-10"/>*/}
                            <span
                                className="absolute bottom-0 w-full rounded-full bg-secondary-light py-4 cursor-pointer flex items-center justify-center button-default-svg">
                                 <ReactSVG src={plus}/> <p aria-readonly={true}>Image</p>
                            </span>
                        </div>
                    </div>

                    <div className="col-span-2 text-center lg:text-left w-64 lg:w-full">
                        <h2 className="text-2xl lg:text-3xl">{user.profile.name}</h2>
                        <h1 className="text-4xl lg:text-5xl">Cavemen</h1>
                        <p className="mt-5">American fork, UT</p>
                    </div>
                </div>
            </div>

            <div className="mx-2">

                <Breadcrumbs/>

                <PageMainNavigation
                    heading="Create Games"
                />


                <main className="grid grid-cols-1 lg:grid-cols-1 w-full my-5 gap-10 justify-items-center">
                    <div className="w-full max-w-2xl" >
                        <div className="md:flex md:items-center mb-6">
                            <div className="md:w-full">
                                <select
                                    className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                                    id="team2Id"
                                    name="team2Id"
                                    value={formState?.team2Id || ''}
                                    onChange={e => _handleChange('team2Id', parseInt(e.target.value))}
                                >
                                    <option value='' disabled>Select opponent team</option>
                                    {
                                        teams.map((team,i) => <option key={i} value={team.id}>{team.name}</option>)
                                    }
                                </select>
                            </div>
                        </div>
                        <div className="md:flex md:items-center mb-6">
                            <div className="md:w-9/12 mr-1 my-1">
                                <input
                                    className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                                    id="location"
                                    name="location"
                                    type="text"
                                    placeholder="Location"
                                    value={formState?.location || ''}
                                    onChange={e => _handleChange('location', e.target.value)}
                                />
                            </div>
                            <div className="md:w-3/12">
                                <div
                                    className="bg-gray-200 border-2 border-gray-200 rounded w-full text-gray-700 leading-tight">
                                    <div
                                        // Set the inline style because class css is not working
                                        className={`border-2 rounded w-6/12 py-2 px-4 text-gray-700 inline-block`}
                                        onClick={()=>_setPlayGround(playGroundsHome)}
                                        style={{
                                            backgroundColor: formState.team1PlayGround === playGroundsHome ? 'rgb(243 244 246)':'rgb(229 231 235)',
                                            borderColor: formState.team1PlayGround ? (formState.team1PlayGround === playGroundsHome ? 'rgb(243 244 246)':'rgb(229 231 235)') : 'rgb(209 213 219)',
                                        }}
                                    >
                                        Home
                                    </div>
                                    <div
                                        // Set the inline style because class css is not working
                                        className={`border-2 rounded w-6/12 py-2 px-4 text-gray-700 inline-block`}
                                        onClick={()=>_setPlayGround(playGroundsAway)}
                                        style={{
                                            backgroundColor: formState.team1PlayGround === playGroundsAway ? 'rgb(243 244 246)':'rgb(229 231 235)',
                                            borderColor: formState.team1PlayGround ? (formState.team1PlayGround === playGroundsAway ? 'rgb(243 244 246)':'rgb(229 231 235)') : 'rgb(209 213 219)',
                                        }}
                                    >
                                        Away
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="md:flex md:items-center mb-6">
                            <div className="md:w-full">
                                <input
                                    className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                                    id="dateTime"
                                    name="dateTime"
                                    type="datetime-local"
                                    placeholder=""
                                    value={formState?.dateTime || ''}
                                    onChange={e => _verifyScheduleTime( e.target.value)}
                                />
                                <ValidationMessage
                                    message={errors || error}
                                />
                            </div>
                        </div>
                        <div className="md:flex md:items-center mb-6">
                            <div className="md:w-full">
                                <PrimaryButton
                                    label="Done"
                                    className="font-medium inline-block w-96 md:text-lg"
                                    clickEvent={_saveGame}
                                />
                            </div>
                        </div>
                    </div>

                </main>
            </div>


            <Footer/>

        </Wrapper>
    )
}

export default GameForm;