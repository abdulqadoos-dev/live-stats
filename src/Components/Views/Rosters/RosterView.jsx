import React from 'react';
import Wrapper from "../../Ui/Form/Wrapper";
import {ReactSVG} from "react-svg";
import plus from "../../../Media/icons/plus.svg";

import DarkButton from "../../Ui/Buttons/DarkButton";
import PageHeader from "../../Ui/PageHeader";
import Breadcrumbs from "../../Ui/Breadcrumbs";
import PageMainNavigation from "../../Ui/PageMainNavigation";
import Footer from "../../Ui/Footer";

const RosterView = () => {

    return (
        <Wrapper>


            <PageHeader
                title="American fork high school"
                subTitle="Cavemen"
                description="American Fork, UT"
            />

            <section className="mx-2">

                <Breadcrumbs/>

                <PageMainNavigation/>

                <main className="grid lg:grid-cols-3 my-5 gap-10">

                    <section className="w-full col-span-2">

                        <div className="flex gap-5 items-center border-b pb-2 mb-3">
                            <div className="rounded-full h-20 w-20 bg-light"></div>
                            <h4 className="text-2xl  font-semibold text-secondary">Name</h4>
                            <div className="flex h-[24px]  text-lg font-semibold text-secondary-light">
                                <p className="border-r border-secondary-light px-2">G</p>
                                <p className="border-r border-secondary-light px-2">Sr.</p>
                                <p className="border-r border-secondary-light px-2">6'4"</p>
                                <p className="px-2">192 lbs.</p>
                            </div>
                        </div>
                        <div className="flex gap-5 items-center border-b pb-2 mb-3">
                            <div className="rounded-full h-20 w-20 bg-light"></div>
                            <h4 className="text-2xl  font-semibold text-secondary">Name</h4>
                            <div className="flex h-[24px]  text-lg font-semibold text-secondary-light">
                                <p className="border-r border-secondary-light px-2">G</p>
                                <p className="border-r border-secondary-light px-2">Sr.</p>
                                <p className="border-r border-secondary-light px-2">6'4"</p>
                                <p className="px-2">192 lbs.</p>
                            </div>
                        </div>

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