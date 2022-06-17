import React from "react";

export default function GameBoardHeader() {
    return (
        <div className="bg-secondary pb-2 lg:p-3 text-white">
            <div className="container mx-auto py-5">

                <div className="grid grid-cols-4 gap-5 items-end">

                    <div className="text-center ">
                        <h1 className="md:text-3xl font-default font-light">TEAM 1 NAME <span
                            className="text-xl">8-8</span></h1>
                        <div className="w-20 h-20 md:w-40 md:h-40 bg-white rounded-full my-5 overflow-hidden mx-auto ">
                            <img src={process.env.REACT_APP_SERVER_PATH + "uploadedImage"} className="w-56 lg:w-64"/>
                        </div>
                        <div className="my-5 gap-3 flex justify-center">
                            <span className="p-1.5  bg-yellow-300 rounded-full"/>
                            <span className="p-1.5  bg-yellow-300 rounded-full"/>
                            <span className="p-1.5  bg-yellow-300 rounded-full"/>
                            <span className="p-1.5  bg-light rounded-full"/>
                            <span className="p-1.5  bg-light rounded-full"/>
                        </div>
                        <div className="font-default">
                            BONUS +
                        </div>
                    </div>

                    <div className="font-default col-span-2">
                        <div className="flex justify-around items-center">
                            <h1 className="text-5xl">45</h1>
                            <h1 className=" flex flex-col text-center text-4xl"><span>6:02</span> <span
                                className="text-xl ">4th</span></h1>
                            <h1 className="text-5xl">52</h1>
                        </div>
                    </div>

                    <div className="text-center">
                        <h1 className="md:text-3xl font-default font-light"><span className="text-xl">12-8</span> TEAM 2
                            NAME </h1>
                        <div className="w-20 h-20 md:w-40 md:h-40 bg-white rounded-full my-5 overflow-hidden mx-auto ">
                            <img src={process.env.REACT_APP_SERVER_PATH + "uploadedImage"} className="w-56 lg:w-64"/>
                        </div>
                        <div className="my-5 gap-3 flex justify-center">
                            <span className="p-1.5  bg-yellow-300 rounded-full"/>
                            <span className="p-1.5  bg-yellow-300 rounded-full"/>
                            <span className="p-1.5  bg-yellow-300 rounded-full"/>
                            <span className="p-1.5  bg-light rounded-full"/>
                            <span className="p-1.5  bg-light rounded-full"/>
                        </div>
                        <div className="font-default">
                            BONUS +
                        </div>
                    </div>


                </div>

            </div>

        </div>
    )
}