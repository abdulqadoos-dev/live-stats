import React from "react";
import GameBoardHeader from "../../Ui/GameBoardHeader";
import Footer from "../../Ui/Footer";
import Wrapper from "../../Ui/Form/Wrapper";

export default function GameBoardView() {
    return (
        <>
            <GameBoardHeader/>
            <Wrapper readyOnly={true}>
                <div className="grid grid-cols-5 gap-5">
                    <div className="mt-5">
                        <div className="bg-light hover:bg-primary cursor-pointer hover:text-white rounded py-5 text-center text-xl font-sans">
                            12 Last Name
                        </div>
                    </div>
                    <div className="mt-5 col-span-3 ">
                        <div className="bg-light rounded h-96"></div>
                        <div/>
                        <div className="my-5">
                            <div className="grid grid-cols-6 gap-1">
                                <div
                                    className="bg-secondary-light hover:bg-secondary text-light text-center rounded py-3 cursor-pointer flex flex-col">
                                    <b>2 Points</b>
                                    <span>Made</span>
                                </div>
                                <div
                                    className="bg-secondary-light hover:bg-secondary text-light text-center rounded py-3 cursor-pointer flex flex-col">
                                    <b>2 Points</b>
                                    <span>Miss</span>
                                </div>

                                <div
                                    className="bg-secondary-light hover:bg-secondary text-light text-center rounded py-3 cursor-pointer flex flex-col">
                                    <b>3 Points</b>
                                    <span>Made</span>
                                </div>
                                <div
                                    className="bg-secondary-light hover:bg-secondary text-light text-center rounded py-3 cursor-pointer flex flex-col">
                                    <b>3 Points</b>
                                    <span>Miss</span>
                                </div>

                                <div
                                    className="bg-secondary-light hover:bg-secondary text-light text-center rounded py-3 cursor-pointer flex flex-col">
                                    <b>1 Point</b>
                                    <span>Made</span>
                                </div>
                                <div
                                    className="bg-secondary-light hover:bg-secondary text-light text-center rounded py-3 cursor-pointer flex flex-col">
                                    <b>1 Point</b>
                                    <span>Miss</span>
                                </div>
                            </div>
                            <div className="grid grid-cols-6 gap-1 my-1">
                                <div
                                    className="bg-secondary-light hover:bg-secondary text-light text-center rounded py-3 cursor-pointer flex items-center justify-center">
                                    <b>Assist</b>
                                </div>
                                <div
                                    className="bg-secondary-light hover:bg-secondary text-light text-center rounded py-3 cursor-pointer flex flex-col">
                                    <b>Rebound</b>
                                    <span>Offense</span>
                                </div>

                                <div
                                    className="bg-secondary-light hover:bg-secondary text-light text-center rounded py-3 cursor-pointer flex flex-col">
                                    <b>Rebound</b>
                                    <span>Defense</span>
                                </div>
                                <div
                                    className="bg-secondary-light hover:bg-secondary text-light text-center rounded py-3 cursor-pointer flex justify-center items-center">
                                    <b>Steal</b>
                                </div>
                                <div
                                    className="bg-secondary-light hover:bg-secondary text-light text-center rounded py-3 cursor-pointer flex justify-center items-center">
                                    <b>Block</b>
                                </div>
                                <div
                                    className="bg-secondary-light hover:bg-secondary text-light text-center rounded py-3 cursor-pointer flex justify-center items-center">
                                    <b>Turnover</b>
                                </div>
                            </div>
                            <div className="grid grid-cols-6 gap-1">
                                <div
                                    className="bg-secondary-light hover:bg-secondary text-light text-center rounded py-3 cursor-pointer flex flex-col">
                                    <b>Foul</b>
                                    <span>Offense</span>
                                </div>
                                <div
                                    className="bg-secondary-light hover:bg-secondary text-light text-center rounded py-3 cursor-pointer flex flex-col">
                                    <b>Foul</b>
                                    <span>Defense</span>
                                </div>

                                <div
                                    className="bg-secondary-light hover:bg-secondary text-light text-center rounded py-3 cursor-pointer flex justify-center items-center">
                                    <b>Charge</b>
                                </div>
                                <div
                                    className="bg-secondary-light hover:bg-secondary text-light text-center rounded py-3 cursor-pointer flex justify-center items-center col-span-3">
                                    <b>UNDO STATS</b>
                                </div>

                            </div>
                        </div>

                        <div className="my-5 flex justify-center ">
                            <div className="absolute z-20">
                                <div className="bg-red-600 text-center hover:bg-primary rounded w-56 py-5 text-white cursor-pointer text-lg font-bold">Stop Clock</div>
                                <div className="grid grid-cols-5 gap-0.5 mt-3">
                                    <div className="bg-secondary-light hover:bg-secondary cursor-pointer text-center text-white rounded">1</div>
                                    <div className="bg-secondary-light hover:bg-secondary cursor-pointer text-center text-white rounded">2</div>
                                    <div className="bg-secondary-light hover:bg-secondary cursor-pointer text-center text-white rounded">H</div>
                                    <div className="bg-secondary-light hover:bg-secondary cursor-pointer text-center text-white rounded">3</div>
                                    <div className="bg-secondary-light hover:bg-secondary cursor-pointer text-center text-white rounded">4</div>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div className="mt-5">
                        <div className="bg-light hover:bg-primary cursor-pointer hover:text-white rounded py-5 text-center text-xl font-sans">
                            12 Last Name
                        </div>
                    </div>
                </div>
            </Wrapper>
            <Footer/>
        </>
    )
}