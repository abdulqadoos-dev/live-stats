import React from 'react';
import Wrapper from "../../Ui/Form/Wrapper";
import creatingFeed from "../../../Media/icons/creating-feed.svg";
import {ReactSVG} from "react-svg";
import plus from "../../../Media/icons/plus.svg";
import chevronRight from "../../../Media/icons/chevron-right.svg";
import menuBars from "../../../Media/icons/menu-bars.svg";
import home from "../../../Media/icons/home.svg";
import score from "../../../Media/icons/score.svg";
import heart from "../../../Media/icons/heart.svg";
import fan from "../../../Media/icons/fan.svg";
import DarkButton from "../../Ui/Buttons/DarkButton";

const TeamsView = () => {

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
                        <h2 className="text-2xl lg:text-3xl">American fork high school</h2>
                        <h1 className="text-4xl lg:text-5xl">Cavemen</h1>
                        <p className="mt-5">American fork, UT</p>
                    </div>
                </div>
            </div>

            <div className="mx-2">

                <nav className="bg-grey-light rounded-md w-full breadcrumbs my-2">
                    <ol className="list-reset flex items-center">
                        <li>
                            <a href="#" className="text-blue-600 hover:text-blue-700">
                                Home
                            </a>
                        </li>
                        <li>
                            <ReactSVG src={chevronRight}/>
                        </li>
                        <li>
                            <a href="#" className="text-blue-600 hover:text-blue-700">
                                Library
                            </a>
                        </li>
                        <li>
                            <ReactSVG src={chevronRight}/>
                        </li>
                        <li className="text-secondary-light">Data</li>
                    </ol>
                </nav>
                <nav className="bg-white">
                    <div className="container flex flex-wrap justify-between items-center mx-auto">

                        <h1 className="text-4xl lg:text-5xl font-bold text-secondary">Boys Basketball</h1>

                        <button
                            className="p-1 bg-primary  rounded md:hidden hover:bg-secondary-light focus:outline-none focus:ring-0 menu-bar-svg">
                            <ReactSVG src={menuBars}/>
                        </button>

                        <div className="w-full md:w-auto" id="main-navigation">
                            <ul className="flex flex-col mt-4 gap-0.5 md:flex-row md:mt-0 md:text-sm md:font-medium main-navigation">
                                <li><a href="#" aria-current="page">Roster</a></li>
                                <li><a href="#" aria-current="page">Schedule</a></li>
                                <li><a href="#" aria-current="page">Stats</a></li>
                                <li><a href="#" aria-current="page">Standings</a></li>
                                <li><a href="#" aria-current="page">Team Info</a></li>
                            </ul>
                        </div>
                    </div>
                </nav>

                <div className="grid lg:grid-cols-2 my-5 gap-10">

                    <div className="w-full">
                        <div className="bg-light rounded-xl p-4 my-2">
                            <div className="flex justify-between font-sans font-semibold text-secondary-light ">
                                <p>Boys BBall</p>
                                <p>FINAL</p>
                            </div>

                            <div className="flex justify-between items-center my-2">
                                <div className="flex items-center gap-5">
                                    <div className="rounded-full h-20 w-20 bg-white"></div>
                                    <p className="text-2xl font-bold text-secondary-light">TEAM 1</p>
                                </div>
                                <p className="font-bold text-secondary-light text-2xl">64</p>
                            </div>

                            <div className="flex justify-between items-center">
                                <div className="flex items-center gap-5">
                                    <div className="rounded-full h-20 w-20 bg-white"></div>
                                    <p className="text-2xl  text-secondary-light">TEAM 2</p>
                                </div>
                                <p className=" text-secondary-light text-2xl">41</p>
                            </div>
                        </div>
                        <div className="bg-light rounded-xl p-4 my-2 ">

                            <div className="flex justify-between font-sans font-semibold text-secondary-light ">
                                <p>Boys BBall</p>
                                <p>FINAL</p>
                            </div>

                            <div className="flex justify-between items-center my-2">
                                <div className="flex items-center gap-5">
                                    <div className="rounded-full h-20 w-20 bg-white"></div>
                                    <p className="text-2xl font-bold text-secondary-light">TEAM 1</p>
                                </div>
                                <p className="font-bold text-secondary-light text-2xl">64</p>
                            </div>

                            <div className="flex justify-between items-center">
                                <div className="flex items-center gap-5">
                                    <div className="rounded-full h-20 w-20 bg-white"></div>
                                    <p className="text-2xl  text-secondary-light">TEAM 2</p>
                                </div>
                                <p className=" text-secondary-light text-2xl">41</p>
                            </div>
                        </div>
                    </div>


                    <div className="">
                        <DarkButton
                            label="Start Game"
                            className="w-full text-2xl py-5"
                        />
                        <DarkButton
                            label="Add Game"
                            className="w-full text-2xl my-2 py-5"
                        />
                        <DarkButton
                            label="Add Roster"
                            className="w-full text-2xl py-5"
                        />
                    </div>
                </div>
            </div>


            <div className="flex justify-around py-2 bg-secondary text-white text-sm  font-sans footer-navigation sticky bottom-0 w-full">
                <div>
                    <ReactSVG src={home}/>
                    MY TEAM
                </div>
                <div>
                    <ReactSVG src={score}/>
                    SCORES
                </div>
                <div>
                    <ReactSVG src={heart}/>
                    FAVORITES
                </div>
                <div>
                    <ReactSVG src={fan}/>
                    PROFILE
                </div>

            </div>

        </Wrapper>
    )
}

export default TeamsView;