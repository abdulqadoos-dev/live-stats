import React from "react";
import ProfileSetupWrapper from "../../Ui/ProfileSetupWrapper";
import {useNavigate} from "react-router-dom";
import creatingFeed from "../../../Media/icons/creating-feed.svg";
import {ReactSVG} from "react-svg";
import {BASE_PATH} from "../../../state/constants/Constans";
import {Input} from "postcss";
import PrimaryButton from "../../Ui/Buttons/PrimaryButton";
import * as XLSX from 'xlsx';

export default function UploadRostersView() {
    const navigate = useNavigate();
    const [rosters, setRosters] = React.useState([])

    const _handleExcelUploadChange = (e) => {
        const [file] = e.target.files;
        const reader = new FileReader();
        if (file) {
            reader.onload = (evt) => {
                const bstr = evt.target.result;
                const wb = XLSX.read(bstr, {type: "binary"});
                const wsname = wb.SheetNames[0];
                const ws = wb.Sheets[wsname];
                const rosters = [];
                let roster = {};
                for(let rows in ws){
                    const row = rows.toString();
                    if(row[1] !== 'r' && row !== 'm' && row[1] > 1){
                        if(row[0] === 'A'){
                            roster.name = ws[rows].v
                        }
                        if(row[0] === 'B'){
                            roster.number = ws[rows].v
                        }
                        if(row[0] === 'C'){
                            roster.height = ws[rows].v
                        }
                        if(row[0] === 'D'){
                            roster.weight = ws[rows].v
                        }
                        if(row[0] === 'E'){
                            roster.position = ws[rows].v
                            rosters.push(roster)
                            roster = {}
                        }
                    }
                }
                setRosters(rosters)
            };
            reader.readAsBinaryString(file);
        }
    }

    return (
        <>
            <ProfileSetupWrapper>
                <main className="grid justify-items-center  ">
                    <h1 className="text-3xl md:text-4xl text-white mb-10 md:mb-10">Build your roster</h1>

                    <div className="text-white text-center font-sans">
                        <label htmlFor='rosters'>
                            <h2 className="font-bold text-xl " style={{cursor:'pointer'}}>Upload File</h2>
                            <input id='rosters' style={{display: 'none'}} type='file' onChange={_handleExcelUploadChange}/>
                        </label>
                        <p className="mb-5 opacity-80 font-light">Acceptable files include Excel or CSV</p>
                        <a href="/assets/example-rosters.csv" download className="font-bold">Download roster
                            template</a>
                    </div>

                    <div className="my-10">
                        <div className="m-0">
                            <input
                                type="text"
                                value="Player Name"
                                className="text-white font-sans text-sm border-r border-secondary bg-secondary-light px-2 font-bold w-64"
                            />
                            <input
                                type="text"
                                value="Number"
                                className="text-white font-sans text-sm border-r border-secondary bg-secondary-light px-2 font-bold w-32"
                            />
                            <input
                                type="text"
                                value="Height"
                                className="text-white font-sans text-sm border-r border-secondary bg-secondary-light px-2 font-bold w-32"
                            />
                            <input
                                type="text"
                                value="Weight"
                                className="text-white font-sans text-sm border-r border-secondary bg-secondary-light px-2 font-bold w-32"
                            />
                            <input
                                type="text"
                                value="Position"
                                className="text-white font-sans text-sm border-r border-secondary bg-secondary-light px-2 font-bold w-32"
                            />
                        </div>

                        {/*table rows*/}
                        {
                            rosters.length ? rosters.map((roster, i) => <div className="border-b border-secondary " key={i}>
                                    <input
                                        type="text"
                                        value={roster.name}
                                        className="text-secondary font-sans text-sm border-secondary border-r py-1 px-2 w-64"
                                    />

                                    <input
                                        type="text"
                                        value={roster.number}
                                        className="text-secondary font-sans text-sm border-secondary border-r py-1 px-2 w-32"
                                    />

                                    <input
                                        type="text"
                                        value={roster.height}
                                        className="text-secondary font-sans text-sm border-secondary border-r py-1 px-2 w-32"
                                    />

                                    <input
                                        type="text"
                                        value={roster.weight}
                                        className="text-secondary font-sans text-sm border-secondary border-r py-1 px-2 w-32"
                                    />

                                    <input
                                        type="text"
                                        value={roster.position}
                                        className="text-secondary font-sans text-sm border-secondary border-r py-1 px-2 w-32"
                                    />
                                </div>
                            )
                                :
                                <div className="border-b border-secondary bg-white text-center">
                                    <p>no record found</p>
                                </div>
                        }
                    </div>

                    <p className="mb-5 opacity-80 font-light text-white font-sans text-lg w-[400px] text-center">
                        Add some basic player information's to start building your roster. Your can always edit the
                        roster later on the team page as well as enter additional info.
                    </p>

                    <PrimaryButton
                        label="Next"
                        className="w-64"
                    />


                </main>
            </ProfileSetupWrapper>
        </>
    )
}