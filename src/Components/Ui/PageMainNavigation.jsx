import React, {useState} from "react";
import {ReactSVG} from "react-svg";
import menuBars from "../../Media/icons/menu-bars.svg";
import {GAMES_PATH, ROSTERS_PATH, TEAMS_PATH} from "../../state/constants/Constans";
import {Link} from "react-router-dom";

const PageMainNavigation = ({navItems, heading}) => {

    let navs = navItems || [
        {label: "Teams", url: TEAMS_PATH},
        {label: "Rosters", url: ROSTERS_PATH},
        {label: "Games", url: GAMES_PATH},
    ];

    const [isOpenMenu, setIsOpenMenu] = useState(false)

    return (
        <nav className="bg-white">
            <div className="container flex flex-wrap justify-between items-center mx-auto">

                <h1 className="text-4xl lg:text-5xl font-bold text-secondary">{heading}</h1>

                <button
                    className={`p-1  ${isOpenMenu ? 'bg-primary' : 'bg-secondary-light'}  rounded md:hidden focus:outline-none focus:ring-0 menu-bar-svg`}
                    onClick={() => setIsOpenMenu(!isOpenMenu)}
                >
                    <ReactSVG src={menuBars}/>

                </button>

                <div className={`w-full md:w-auto ${isOpenMenu ? '' : 'hidden md:block'}`} id="main-navigation">
                    <ul className="flex flex-col mt-4 gap-0.5 md:flex-row md:mt-0 md:text-sm md:font-medium main-navigation">
                        {navs?.length && navs.map((item, index) => (
                            <li key={index}>
                                <Link to={item.url}>{item.label}</Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default PageMainNavigation;