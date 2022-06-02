import PageHeader from "../../Ui/PageHeader";
import React, {useEffect, useState} from "react";
import Wrapper from "../../Ui/Form/Wrapper";
import Breadcrumbs from "../../Ui/Breadcrumbs";
import PageMainNavigation from "../../Ui/PageMainNavigation";
import {LOCAL_STORAGE_AUTH_USER, ROSTERS_PATH, TEAMS_PATH} from "../../../state/constants/Constans";
import {ReactSVG} from "react-svg";
import closeIcon from "../../../Media/icons/close.svg";
import {useNavigate} from "react-router-dom";
import Footer from "../../Ui/Footer";
import {rosterSchema} from "../../../state/constants/rosterSchema";
import PrimaryButton from "../../Ui/Buttons/PrimaryButton";
import * as XLSX from "xlsx";

const EditRosterView = ({getRostersRequest, rosters, saveRostersRequest}) => {

    const authUser = JSON.parse(window.localStorage.getItem(LOCAL_STORAGE_AUTH_USER));
    const navigate = useNavigate();
    const [newRosters, setNewRosters] = useState( [])

    useEffect(() => {
        getRostersRequest(authUser.user.profile.id, navigate)
    }, [])

    useEffect(() => {
        setNewRosters(rosters || [])
    }, [rosters])

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
                setNewRosters(rosters)
            };
            reader.readAsBinaryString(file);
        }
    }

    const _handleChange = (e, index) => {
        const value = e.target.value;
        const name = e.target.name;
        const data = {...newRosters[index]};
        data[name] = value;
        const _roster = [...newRosters]
        _roster.splice(index, 1, data)
        setNewRosters(_roster)
    }

    const _addRoster = () => {
        const data = newRosters.slice();
        data.push(rosterSchema)
        setNewRosters(data)
    }

    const _removeRoster = (index) => {
        const data = newRosters.slice();
        data.splice(index, 1)
        setNewRosters(data)
    }

    const _saveRosters = () => {
        saveRostersRequest(authUser.user.profile.id, newRosters, navigate)
    }
    return (
        <Wrapper>

            <PageHeader
                title={authUser?.user?.profile?.name || null}
                subTitle="Cavemen"
                description={(authUser?.user?.profile?.school?.name || '') + ', ' + (authUser?.user?.profile?.school?.state || '')}
                uploadedImage={authUser?.user.image}
            />

            <section className="mx-2">

                <Breadcrumbs/>


                <PageMainNavigation
                    heading="Edit Rosters"
                />
                <main className="grid my-5 gap-10 justify-center">
                    <div className=" text-center font-sans">
                        <label htmlFor='rosters'>
                            <h2 className="font-bold text-xl " style={{cursor: 'pointer'}}>Upload File</h2>
                            <input id='rosters' style={{display: 'none'}} type='file'
                                   onChange={_handleExcelUploadChange}/>
                        </label>
                        <p className="mb-5 opacity-80 font-light">Acceptable files include Excel or CSV</p>
                        <a href="/assets/example-rosters.xlsx" download className="font-bold">Download roster
                            template</a>
                    </div>
                    <div className="m-2">

                        <div className="grid grid-cols-2 md:grid-cols-6 gap-0.5 mb-1">
                            <input
                                type="text"
                                value="Player Name"
                                readOnly={true}
                                className="text-white font-sans text-sm border-secondary bg-secondary-light px-2 py-1 font-bold "
                            />
                            <input
                                type="text"
                                value="Number"
                                readOnly={true}
                                className="text-white font-sans text-sm border-secondary bg-secondary-light px-2 py-1 font-bold"
                            />
                            <input
                                type="text"
                                value="Height"
                                readOnly={true}
                                className="text-white font-sans text-sm border-secondary bg-secondary-light px-2 py-1 font-bold"
                            />
                            <input
                                type="text"
                                value="Weight"
                                readOnly={true}
                                className="text-white font-sans text-sm border-secondary bg-secondary-light px-2 py-1 font-bold"
                            />
                            <input
                                type="text"
                                value="Position"
                                readOnly={true}
                                className="text-white font-sans text-sm border-secondary bg-secondary-light px-2 py-1 font-bold"
                            />
                            <input
                                type="text"
                                value="Action"
                                readOnly={true}
                                className="text-white font-sans text-sm border-secondary bg-secondary-light px-2 py-1 font-bold"
                            />
                        </div>

                        {/*table rows*/}
                        {
                            newRosters?.length ? newRosters.map((roster, i) => <div
                                        className="grid grid-cols-2 md:grid-cols-6 gap-0.5 mb-1"
                                        key={i}>
                                        <input
                                            type="text"
                                            value={roster.name}
                                            name='name'
                                            onChange={(e) => _handleChange(e, i)}
                                            className="text-secondary font-sans text-sm border-secondary border py-1 px-2 "
                                        />

                                        <input
                                            type="text"
                                            value={roster.number}
                                            name='number'
                                            onChange={(e) => _handleChange(e, i)}
                                            className="text-secondary font-sans text-sm border-secondary border  py-1 px-2 "
                                        />

                                        <input
                                            type="text"
                                            value={roster.height}
                                            name='height'
                                            onChange={(e) => _handleChange(e, i)}
                                            className="text-secondary font-sans text-sm border-secondary border  py-1 px-2 "
                                        />

                                        <input
                                            type="text"
                                            value={roster.weight}
                                            name='weight'
                                            onChange={(e) => _handleChange(e, i)}
                                            className="text-secondary font-sans text-sm border-secondary border   py-1 px-2 "
                                        />

                                        <input
                                            type="text"
                                            value={roster.position}
                                            name='position'
                                            onChange={(e) => _handleChange(e, i)}
                                            className="text-secondary font-sans text-sm border-secondary border  py-1 px-2 "
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
                        <div className="mt-2">
                            <span className="cursor-pointer" onClick={_addRoster}>+ Player</span>
                        </div>
                    </div>
                    <div className='text-center'>
                        <PrimaryButton
                            label="Save Roster"
                            className="w-full lg:w-56 lg:text-2xl lg:py-5"
                            clickEvent={_saveRosters}
                        />
                    </div>
                </main>
            </section>
            <Footer/>

        </Wrapper>
    )
}

export default EditRosterView