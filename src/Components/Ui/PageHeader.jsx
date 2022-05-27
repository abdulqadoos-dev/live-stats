import {ReactSVG} from "react-svg";
import plus from "../../Media/icons/plus.svg";
import React from "react";
import {uploadUserImage} from "../../state/apis/authApi";
import {LOCAL_STORAGE_AUTH_USER} from "../../state/constants/Constans";


const PageHeader = ({title, subTitle, description, uploadedImage}) => {
    const authUserData = JSON.parse(window.localStorage.getItem(LOCAL_STORAGE_AUTH_USER));

    const _onChangeImage = (e) => {
        document.getElementById('uploaded-image').src = URL.createObjectURL(e.target.files[0])
        let formData = new FormData();
        formData.append('image', e.target.files[0])
        uploadUserImage(formData)
            .then(res => {
                authUserData.user.image = res.data.image
                window.localStorage.setItem(LOCAL_STORAGE_AUTH_USER, JSON.stringify(authUserData))

            }).catch(err => {})
    }

    return (

        <div className="bg-secondary pb-2 lg:p-3 text-white">
            {/*<div className="grid grid-cols-3 items-center justify-center">*/}
            <div className="flex gap-5 items-center ">
                <div className="ml-5">
                    <div className="w-20 h-20 md:w-40 md:h-40 bg-white rounded-full my-5 relative overflow-hidden">
                        <img src={process.env.REACT_APP_SERVER_PATH+uploadedImage} id="uploaded-image" className="w-56 lg:w-64"/>
                        <label htmlFor="upload-image"
                               className="absolute bottom-0 w-full bg-secondary-light py-1 lg:py-2 cursor-pointer flex items-center justify-center button-default-svg opacity-90">
                            <ReactSVG src={plus}/> <p className="text-sm lg:text-lg" aria-readonly={true}>Image</p>
                            <input type='file' id="upload-image" style={{display: 'none'}} onChange={_onChangeImage}/>
                        </label>
                    </div>
                </div>

                <div className="overflow-clip">
                    <h1 className="text-xl md:text-5xl">{title}</h1>
                    <p className="my-2 md:my-3 text-xs md:text-lg">{description}</p>
                </div>
            </div>
        </div>

    )
}

export default PageHeader