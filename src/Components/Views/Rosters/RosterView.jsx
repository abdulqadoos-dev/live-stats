import React, {useEffect} from 'react';
import Footer from "../../Ui/Footer";
import Wrapper from "../../Ui/Form/Wrapper";
import PageHeader from "../../Ui/PageHeader";
import Breadcrumbs from "../../Ui/Breadcrumbs";
import DarkButton from "../../Ui/Buttons/DarkButton";
import PageMainNavigation from "../../Ui/PageMainNavigation";
import {LOCAL_STORAGE_AUTH_USER, ROSTERS_PATH, TEAMS_PATH} from "../../../state/constants/Constans";
import {useNavigate} from "react-router-dom";

const RosterView = ({getRostersRequest, rosters}) => {

    // const authUser = JSON.parse(window.localStorage.getItem(LOCAL_STORAGE_AUTH_USER));

    const navigate = useNavigate();

    useEffect(() => {
        getRostersRequest(navigate)
    }, [])

    return (
        <Wrapper>


            <PageHeader
                title="American fork high school"
                subTitle="Cavemen"
                description="American Fork, UT"
            />

            <section className="mx-2">

                <Breadcrumbs/>

                <PageMainNavigation
                    heading="Rosters"
                    navItems={
                        [
                            {label: "Teams", url: TEAMS_PATH},
                            {label: "Rosters", url: ROSTERS_PATH},
                        ]
                    }
                />

                <main className="grid lg:grid-cols-3 my-5 gap-10">

                    <section className="w-full col-span-2">

                        {rosters?.length && rosters.map(roster => (
                            <div className="flex gap-5 items-center border-b pb-2 mb-3">
                                <div className="rounded-full h-20 w-20 bg-light"></div>
                                <h4 className="text-2xl  font-semibold text-secondary">{roster.name}</h4>
                                <div className="flex h-[24px]  text-lg font-semibold text-secondary-light">
                                    <p className="border-r border-secondary-light px-2">G</p>
                                    <p className="border-r border-secondary-light px-2">Sr.</p>
                                    <p className="border-r border-secondary-light px-2">{roster.height}</p>
                                    <p className="px-2">{roster.weight}</p>
                                </div>
                            </div>
                        ))}

                    </section>


                    <section className="">
                        <DarkButton
                            label="Edit Roster"
                            className="w-full text-2xl py-5"
                        />

                    </section>
                </main>
            </section>


            <Footer/>

        </Wrapper>
    )
}

export default RosterView;