import {ReactSVG} from "react-svg";
import menuBars from "../../Media/icons/menu-bars.svg";
import React from "react";

const PageMainNavigation = () => {
    return (
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
    )
}

export default PageMainNavigation;