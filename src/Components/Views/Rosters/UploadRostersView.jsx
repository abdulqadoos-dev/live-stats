import React, {useEffect} from "react";
import ProfileSetupWrapper from "../../Ui/ProfileSetupWrapper";
import {useNavigate} from "react-router-dom";
import {ReactSVG} from "react-svg";
import PrimaryButton from "../../Ui/Buttons/PrimaryButton";
import * as XLSX from 'xlsx';
import {rosterSchema} from "../../../state/constants/rosterSchema";
import closeIcon from "../../../Media/icons/close.svg";
import {SETUP_PROFILE_PATH} from "../../../state/constants/Constans";


export default function UploadRostersView({formData, setProfileForm, createTeamProfileRequest}) {
    const navigate = useNavigate();

    useEffect(() => {
        if (!formData) navigate(SETUP_PROFILE_PATH)
    }, [])

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
                for (let rows in ws) {
                    const row = rows.toString();
                    if (row[1] !== 'r' && row !== 'm' && row[1] > 1) {
                        if (row[0] === 'A') {
                            roster.name = ws[rows].v
                        }
                        if (row[0] === 'B') {
                            roster.number = (ws[rows].v).toString()
                        }
                        if (row[0] === 'C') {
                            roster.height = (ws[rows].v).toString()
                        }
                        if (row[0] === 'D') {
                            roster.weight = (ws[rows].v).toString()
                        }
                        if (row[0] === 'E') {
                            roster.position = (ws[rows].v).toString()
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

    const _handleChange = (e, index) => {
        const value = e.target.value;
        const name = e.target.name;
        const data = {...rosters[index]};
        data[name] = value;
        const _roster = [...rosters]
        _roster.splice(index, 1, data)
        setRosters(_roster)
    }

    const _addRoster = () => {
        const data = rosters.slice();
        data.push(rosterSchema)
        setRosters(data)
    }

    const _removeRoster = (index) => {
        const data = rosters.slice();
        data.splice(index, 1)
        setRosters(data)
    }

    const _handleFormSubmit = () => {
        let arr = {...formData, rosters : rosters}
        createTeamProfileRequest(arr, navigate)
    }

    return (
        <>
            <ProfileSetupWrapper>
                <main className="grid justify-items-center  ">
                    <h1 className="text-3xl md:text-4xl text-white mb-10 md:mb-10">Build your roster</h1>

                    <div className="text-white text-center font-sans">
                        <label htmlFor='rosters'>
                            <h2 className="font-bold text-xl " style={{cursor: 'pointer'}}>Upload File</h2>
                            <input id='rosters' style={{display: 'none'}} type='file'
                                   onChange={_handleExcelUploadChange}/>
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
                                readOnly={true}
                                className="text-white font-sans text-sm border-r border-secondary bg-secondary-light px-2 font-bold w-64"
                            />
                            <input
                                type="text"
                                value="Number"
                                readOnly={true}
                                className="text-white font-sans text-sm border-r border-secondary bg-secondary-light px-2 font-bold w-32"
                            />
                            <input
                                type="text"
                                value="Height"
                                readOnly={true}
                                className="text-white font-sans text-sm border-r border-secondary bg-secondary-light px-2 font-bold w-32"
                            />
                            <input
                                type="text"
                                value="Weight"
                                readOnly={true}
                                className="text-white font-sans text-sm border-r border-secondary bg-secondary-light px-2 font-bold w-32"
                            />
                            <input
                                type="text"
                                value="Position"
                                readOnly={true}
                                className="text-white font-sans text-sm border-r border-secondary bg-secondary-light px-2 font-bold w-32"
                            />
                        </div>

                        {/*table rows*/}
                        {
                            rosters.length ? rosters.map((roster, i) => <div
                                        className="border-b border-secondary flex items-center"
                                        key={i}>
                                        <input
                                            type="text"
                                            value={roster.name}
                                            name='name'
                                            onChange={(e) => _handleChange(e, i)}
                                            className="text-secondary font-sans text-sm border-secondary border-r py-1 px-2 w-64"
                                        />

                                        <input
                                            type="number"
                                            value={roster.number}
                                            name='number'
                                            onChange={(e) => _handleChange(e, i)}
                                            className="text-secondary font-sans text-sm border-secondary border-r py-1 px-2 w-32"
                                        />

                                        <input
                                            type="number"
                                            value={roster.height}
                                            name='height'
                                            onChange={(e) => _handleChange(e, i)}
                                            className="text-secondary font-sans text-sm border-secondary border-r py-1 px-2 w-32"
                                        />

                                        <input
                                            type="number"
                                            value={roster.weight}
                                            name='weight'
                                            onChange={(e) => _handleChange(e, i)}
                                            className="text-secondary font-sans text-sm border-secondary border-r py-1 px-2 w-32"
                                        />

                                        <input
                                            type="number"
                                            value={roster.position}
                                            name='position'
                                            onChange={(e) => _handleChange(e, i)}
                                            className="text-secondary font-sans text-sm border-secondary border-r py-1 px-2 w-32"
                                        />

                                        <div className="remove-roster-icon" onClick={() => _removeRoster(i)}>
                                            <ReactSVG src={closeIcon}/>
                                        </div>

                                    </div>
                                )
                                :
                                <div className="border-r border-secondary bg-white text-center">
                                    <p>no record found</p>
                                </div>
                        }
                        <div className="border-b border-secondary ">
                            <span className="cursor-pointer text-white" onClick={_addRoster}>+ Player</span>
                        </div>
                    </div>

                    <p className="mb-5 opacity-80 font-light text-white font-sans text-lg w-[400px] text-center">
                        Add some basic player information's to start building your roster. Your can always edit the
                        roster later on the team page as well as enter additional info.
                    </p>

                    <PrimaryButton
                        label="Next"
                        className="w-64"
                        clickEvent={() => _handleFormSubmit()}
                    />


                </main>
            </ProfileSetupWrapper>
        </>
    )
}