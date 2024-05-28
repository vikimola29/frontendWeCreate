import React from "react";
import Header from "../components/header";
import {useNavigate} from "react-router-dom";


export default function Profile(props) {
    const GradientContainer = props.bgGradient

    const navigate = useNavigate();

    const handleButtonClick = () => {
        navigate('/register');
    };

    return (

        <GradientContainer>
            <div style={{height: '5rem'}}>
            </div>


        </GradientContainer>
    )


}