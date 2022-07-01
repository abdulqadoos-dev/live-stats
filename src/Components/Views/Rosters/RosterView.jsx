import React, {useEffect} from 'react';
import Footer from "../../Ui/Footer";
import Wrapper from "../../Ui/Form/Wrapper";
import PageHeader from "../../Ui/PageHeader";
import Breadcrumbs from "../../Ui/Breadcrumbs";
import DarkButton from "../../Ui/Buttons/DarkButton";
import PageMainNavigation from "../../Ui/PageMainNavigation";
import {
    FAN_ROLE_ID,
    LOCAL_STORAGE_AUTH_USER, ROSTERS_EDIT_PATH,
    TEAMS_PATH
} from "../../../state/constants/Constans";
import {useNavigate} from "react-router-dom";

const RosterView = ({getRostersRequest, rosters}) => {

    const {user} = JSON.parse(window.localStorage.getItem(LOCAL_STORAGE_AUTH_USER));

    const navigate = useNavigate();

    useEffect(() => {
        if (user.roleId === FAN_ROLE_ID) navigate(TEAMS_PATH)
    }, [])

    useEffect(() => {
        getRostersRequest(user?.profile?.id || null, navigate)
    }, [])


    return (
        <>
            <PageHeader
                title={user?.profile?.name || null}
                subTitle="Cavemen"
                description={(user?.profile?.school?.name || '') + ', ' + (user?.profile?.school?.state || '')}
                uploadedImage={user.image}
            />

            <Wrapper>

                <section className="mx-2">

                    <Breadcrumbs
                        currentPage="Rosters"
                    />

                    <PageMainNavigation
                        heading="Rosters"
                    />

                    <main className="grid grid-cols-1 lg:grid-cols-3 my-5 gap-y-4 lg:gap-10">

                        <section className="w-full col-span-2">

                            {rosters?.length ? rosters.map(roster => (
                                <div className="flex gap-5 items-center border-b pb-2 mb-3" key={roster.id}>
                                    <div className="rounded-full h-10 w-10 lg:h-20 lg:w-20 bg-light"/>
                                    <h4 className="text-lg lg:text-2xl font-semibold text-secondary">{roster.name}</h4>
                                    <div className="flex h-[24px] text-sm md:text-xl font-semibold text-secondary-light">
                                        <p className="border-r border-secondary-light px-2">G</p>
                                        <p className="border-r border-secondary-light px-2">Sr.</p>
                                        <p className="border-r border-secondary-light px-2">{roster.height}</p>
                                        <p className="px-2">{roster.weight}</p>
                                    </div>
                                </div>
                            )) : null}

                        </section>


                        <section className="">
                            <DarkButton
                                label="Edit Roster"
                                className="w-full lg:text-2xl lg:py-5"
                                clickEvent={() => navigate(ROSTERS_EDIT_PATH)}
                            />
                        </section>
                    </main>
                </section>



            </Wrapper>
            <Footer/>

        </>

    )
}

export default RosterView;