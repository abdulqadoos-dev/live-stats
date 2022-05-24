import {ReactSVG} from "react-svg";
import plus from "../../Media/icons/plus.svg";
import React from "react";


const PageHeader = ({title, subTitle, description, uploadedImage}) => {
    const _onChangeImage = (e) => {
        document.getElementById('uploaded-image').src = URL.createObjectURL(e.target.files[0])
    }

    return (

        <div className="bg-secondary pb-2 lg:p-2 text-white">
            <div className="grid grid-cols-1 lg:grid-cols-3  items-center justify-center">
                <div className="mx-auto">
                    <div className="w-40 h-40 lg:w-64 lg:h-64 bg-white rounded-full my-5 relative overflow-hidden">
                        <img src={uploadedImage} id="uploaded-image" className="w-56 lg:w-64 mt-10"/>
                        <label htmlFor="upload-image"
                               className="absolute bottom-0 w-full rounded-full bg-secondary-light py-4 cursor-pointer flex items-center justify-center button-default-svg">
                            <ReactSVG src={plus}/> <p aria-readonly={true}>Image</p>
                            <input type='file' id="upload-image" style={{display: 'none'}} onChange={_onChangeImage}/>
                        </label>
                    </div>
                </div>

                <div className="col-span-2 text-center lg:text-left w-full">
                    <h2 className="text-xl lg:text-3xl">{title}</h2>
                    <h1 className="text-3xl lg:text-5xl">{subTitle}</h1>
                    <p className="my-4 text-sm">{description}</p>
                </div>
            </div>
        </div>

    )
}

export default PageHeader