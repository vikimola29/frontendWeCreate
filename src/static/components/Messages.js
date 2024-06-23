import React, {useContext, useState} from "react";
import {useNavigate} from "react-router-dom";
import {Alert, Button} from "@mui/material";
import Typography from "@mui/material/Typography";
import {FormattedMessage} from "react-intl";
import AuthContext from "../components/AuthContext";
import CheckIcon from "@mui/icons-material/Check";


export default function Messages(props) {


    const handleCloseSuccess = () => {
        props.setOpenSuccess(false);
    };

    const handleCloseWarning = () => {
        props.setOpenWarning(false);
    };


    return (

        <div>

            {props.openSuccess && (
                <div className="Success-Warning">
                    <Button
                        aria-label="close"
                        color="inherit"
                        size="small"
                        sx={{textTransform: 'none'}}
                    > <Alert onClick={handleCloseSuccess} icon={<CheckIcon fontSize="inherit"/>}
                             severity="success" sx={{width: '100%'}}>
                        <Typography component={'span'} variant="body2">
                            {props.successMessage}
                        </Typography>

                    </Alert>
                    </Button>

                </div>)}
            {props.openSuccess && <br/>}


            {props.openWarning && (
                <div className="Success-Warning">
                    <Button
                        aria-label="close"
                        color="inherit"
                        size="small"
                        sx={{textTransform: 'none'}}>
                        <Alert onClick={handleCloseWarning} severity="warning" sx={{width: '100%'}}>
                            <Typography component={'span'} variant="body2">
                                {props.warningMessage}
                            </Typography>
                        </Alert>
                    </Button>

                </div>
            )}

            {props.openWarning && <br/>}

        </div>
    )


}