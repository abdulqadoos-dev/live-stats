import {ReactSVG} from "react-svg";
import plus from "../../Media/icons/plus.svg";
import React from "react";


const PageHeader = ({title, subTitle, description}) => {
    return (

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
                    <h2 className="text-2xl lg:text-3xl">{title}</h2>
                    <h1 className="text-4xl lg:text-5xl">{subTitle}</h1>
                    <p className="mt-5">{description}</p>
                </div>
            </div>
        </div>

    )
}

export default PageHeader