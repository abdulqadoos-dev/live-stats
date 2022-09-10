import React, {useEffect, useState} from 'react';

import Footer from "../../Ui/Footer";
import Wrapper from "../../Ui/Form/Wrapper";
import PageMainNavigation from "../../Ui/PageMainNavigation";
import {BASE_PATH, FAN_ROLE_ID, LOCAL_STORAGE_AUTH_USER} from "../../../state/constants/Constans";
import {useNavigate} from "react-router-dom";
import Breadcrumbs from "../../Ui/Breadcrumbs";
import PrimaryButton from "../../Ui/Buttons/PrimaryButton";
import ValidationMessage from "../../Ui/Form/ValidationMessage";
import {getTeams, verifyScheduleTime} from "../../../state/actions/gameActions";
import PageHeader from "../../Ui/PageHeader";

const GameForm = ({createGamesRequest, formData, error}) => {

    const {user} = JSON.parse(window.localStorage.getItem(LOCAL_STORAGE_AUTH_USER));

    const navigate = useNavigate();

    const playGroundsHome = 'home'
    const playGroundsAway = 'away'

    const [formState, setFormState] = useState({
        sportId: user.profile.sportId,
        mainTeamId: user.profile.id,
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
        if (value === playGroundsHome) {
            setFormState({...formState, mainTeamPlayGround: value, opponentTeamPlayGround: playGroundsAway})
        } else if (value === playGroundsAway) {
            setFormState({...formState, mainTeamPlayGround: value, opponentTeamPlayGround: playGroundsHome})
        }
    }

    const _verifyScheduleTime = (dateTime) => {
        verifyScheduleTime({dateTime, mainTeamId: formState?.mainTeamId, opponentTeamId: formState?.opponentTeamId})
            .then(res => {
                if (res.data.isScheduled) {
                    _handleChange('dateTime', dateTime)
                    setErrors(null)
                } else {
                    setErrors('Time is not available')
                }
            })
            .catch(err => {
                if (err.status === 400) {
                    setErrors(Object.values(err.data?.validationResults || {}).join('; '))
                } else {
                    setErrors('Something went wrong. Please check your internet.')
                }
            })
        return true
    }

    const _saveGame = () => {
        createGamesRequest(formState, navigate)
    }

    return (
        <>
            <PageHeader
                title={user?.profile?.name || null}
                subTitle={user.name}
                description={(user?.profile?.school?.name || '') + ', ' + (user?.profile?.school?.state || '')}
                uploadedImage={user.image}
            />

            <Wrapper>
                <div className="mx-2">
                    <Breadcrumbs currentPage="Create Game"/>
                    <PageMainNavigation
                        heading="Create Games"
                    />
                    <main className="grid grid-cols-3 gap-x-3 mt-2">
                        <div className="md:col-span-2 col-span-3">
                            <div className="md:flex md:items-center mb-2">
                                <div className="md:w-full">
                                    <select
                                        className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                                        id="opponentTeamId"
                                        name="opponentTeamId"
                                        value={formState?.opponentTeamId || ''}
                                        onChange={e => _handleChange('opponentTeamId', parseInt(e.target.value))}
                                    >
                                        <option value='' disabled>Select opponent team</option>
                                        {
                                            teams.map((team, i) => <option key={i} value={team.id}>{team.name}</option>)
                                        }
                                    </select>
                                </div>
                            </div>
                            <div className="md:flex md:items-center mb-2">
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
                                            className={`border-2 rounded w-6/12 py-2 text-center text-gray-700 inline-block`}
                                            onClick={() => _setPlayGround(playGroundsHome)}
                                            style={{
                                                backgroundColor: formState.mainTeamPlayGround === playGroundsHome ? 'rgb(243 244 246)' : 'rgb(229 231 235)',
                                                borderColor: formState.mainTeamPlayGround ? (formState.mainTeamPlayGround === playGroundsHome ? 'rgb(243 244 246)' : 'rgb(229 231 235)') : 'rgb(209 213 219)',
                                            }}
                                        >
                                            Home
                                        </div>
                                        <div
                                            // Set the inline style because class css is not working
                                            className={`border-2 rounded w-6/12 py-2 text-center text-gray-700 inline-block`}
                                            onClick={() => _setPlayGround(playGroundsAway)}
                                            style={{
                                                backgroundColor: formState.mainTeamPlayGround === playGroundsAway ? 'rgb(243 244 246)' : 'rgb(229 231 235)',
                                                borderColor: formState.mainTeamPlayGround ? (formState.mainTeamPlayGround === playGroundsAway ? 'rgb(243 244 246)' : 'rgb(229 231 235)') : 'rgb(209 213 219)',
                                            }}
                                        >
                                            Away
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="md:flex md:items-center mb-2">
                                <div className="md:w-full">
                                    <input
                                        className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                                        id="dateTime"
                                        name="dateTime"
                                        type="datetime-local"
                                        placeholder=""
                                        value={formState?.dateTime || ''}
                                        onChange={e => _verifyScheduleTime(e.target.value)}
                                    />
                                    <ValidationMessage
                                        message={errors || error}
                                    />
                                </div>
                            </div>
                            <div className="md:flex md:items-center mb-2">
                                <div className="md:w-full">
                                    <PrimaryButton
                                        label="Done"
                                        className="w-full md:text-lg"
                                        clickEvent={_saveGame}
                                    />
                                </div>
                            </div>
                        </div>
                    </main>
                </div>
            </Wrapper>
            <Footer/>
        </>
    )
}

export default GameForm;