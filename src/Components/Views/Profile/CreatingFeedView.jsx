import React, {useEffect} from "react";
import {connect} from "react-redux";

import {useNavigate} from "react-router-dom";

import creatingFeed from "../../../Media/icons/creating-feed.svg";

import ProfileSetupWrapper from "../../Ui/ProfileSetupWrapper";
import {getProfileRequest} from "../../../state/actions/profileActions";

const CreatingFeedView = ({getProfileRequest,formData}) => {

    const navigate = useNavigate();

    useEffect(() => {
         getProfileRequest(navigate,formData?.roleId)
    }, [])



    return (
        <>
            <ProfileSetupWrapper>
                <main className="grid justify-items-center">
                    <h1 className="text-3xl md:text-4xl text-white mb-10 md:mb-10">Creating your feed</h1>
                    <div
                        className="grid content-center justify-items-center text-white build-profile-tile">
                        <img src={creatingFeed} className="w-56 lg:w-64 mt-10"/>
                    </div>
                </main>
            </ProfileSetupWrapper>
        </>
    )
}


const mapStateToProps = state => {
    return {
        ...state.auth,
        ...state.profile
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getProfileRequest: (navigate,roleId) => dispatch(getProfileRequest(navigate,roleId)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreatingFeedView)