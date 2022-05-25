import {ReactSVG} from "react-svg";
import chevronRight from "../../Media/icons/chevron-right.svg";
import React from "react";
import {Link} from "react-router-dom";
import {BASE_PATH} from "../../state/constants/Constans";

const Breadcrumbs = ({currentPage}) => {
    return (
        <nav className="bg-grey-light rounded-md w-full breadcrumbs my-2">
            <ol className="list-reset flex items-center">
                <li>
                    <Link to={BASE_PATH} className="text-blue-600 hover:text-blue-700">
                        Home
                    </Link>
                </li>
                <li className="mb-1">
                    <ReactSVG src={chevronRight}/>
                </li>
                <li className="text-secondary-light">{currentPage}</li>
            </ol>
        </nav>
    )
}

export default Breadcrumbs;