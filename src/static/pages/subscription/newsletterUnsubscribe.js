import React, {useState} from "react";
import {Button, FormControl, FormHelperText, Grid, TextField} from "@mui/material";
import Typography from "@mui/material/Typography";
import {FormattedMessage} from "react-intl";
import axios from "axios";
import Messages from "../../components/Messages";
import {unsubscribeNewsletter} from "../../utils/api";

export default function NewsletterUnsubscribe(props) {
    const GradientContainer = props.bgGradient
    const [openSuccess, setOpenSuccess] = useState(false);
    const [openWarning, setOpenWarning] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
    });

    const handleChange = (e) => {
        const {id, value} = e.target;
        // console.log(id, value);
        setFormData({
            ...formData,
            [id]: value,
        });
    };


    const handleSubmit = async () => {
        try {
            await unsubscribeNewsletter(formData)
            setOpenSuccess(true);
            setOpenWarning(false);
        } catch (error) {
            setOpenSuccess(false);
            setOpenWarning(true);
        }
    };


    return (
        <GradientContainer>


            <Grid container className='newsletter-unsub'>

                <div className='newsletter-unsub-content'>

                    <Typography component={'span'} variant="h3" style={{textAlign: 'center'}}>
                        <FormattedMessage id='newsletter.unsub.title'
                                          defaultMessage="Newsletter Unsubscribe"/>
                    </Typography>

                    <br/>


                    <FormControl
                        margin="normal"
                        color="primary"
                        variant="filled">
                        <TextField id="email"
                                   type="email"
                                   value={formData.email} onChange={handleChange} variant="outlined" color="secondary"
                                   style={{width: '100%'}}
                                   InputLabelProps={{color: "primary"}}
                                   label={
                                       <Typography variant="body2">
                                           <FormattedMessage id='newsletter.unsub.email'
                                                             defaultMessage="Mail"/>
                                       </Typography>
                                   }
                                   aria-describedby="email-text"/>
                        <FormHelperText id="email-text">
                            <Typography component={'span'} variant="body2">
                                <FormattedMessage id='newsletter.unsub.email.helper'
                                                  defaultMessage="Sad to see you go!"/>
                            </Typography>
                        </FormHelperText>
                        <br/>

                        <Messages openSuccess={openSuccess} openWarning={openWarning} setOpenSuccess={setOpenSuccess}
                                  setOpenWarning={setOpenWarning}
                                  successMessage={<FormattedMessage id='newsletter.unsub.alert.succ'/>}
                                  warningMessage={<FormattedMessage id='newsletter.unsub.alert.warn'/>}/>


                        <Button onClick={() => handleSubmit(formData)} variant="contained" color="secondary">
                            <Typography component={'span'} variant='body1' style={{color: "#E0F2F1"}}>
                                <FormattedMessage id='newsletter.unsub.button'
                                                  defaultMessage="Unsubscribe"/>
                            </Typography>
                        </Button>
                    </FormControl>
                </div>
            </Grid>


        </GradientContainer>
    )


}