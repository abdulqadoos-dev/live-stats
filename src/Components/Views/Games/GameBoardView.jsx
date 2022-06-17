import React from "react";
import GameBoardHeader from "../../Ui/GameBoardHeader";
import Footer from "../../Ui/Footer";
import Wrapper from "../../Ui/Form/Wrapper";

export default function GameBoardView() {
    return (
        <>
            <GameBoardHeader/>
            <Wrapper>
                <div>Game Board View</div>
            </Wrapper>
            <Footer/>
        </>
    )
}