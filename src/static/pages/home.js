import React from "react";
import Header from "../components/header";
import LandingPage from "./landingPage";

export default function Home(props) {
    return (
        <div className="home">


            {
                props.isDarkTheme ?
                    <LandingPage bgGradient={props.gradientContainerDark} isDarkTheme={props.isDarkTheme}/>
                    :
                    <LandingPage bgGradient={props.gradientContainerLight} isDarkTheme={props.isDarkTheme}/>
            }

        </div>
    )


}