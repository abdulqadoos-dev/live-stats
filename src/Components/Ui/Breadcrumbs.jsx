import {ReactSVG} from "react-svg";
import chevronRight from "../../Media/icons/chevron-right.svg";
import React from "react";

const Breadcrumbs = () => {
    return (
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
    )
}

export default Breadcrumbs;