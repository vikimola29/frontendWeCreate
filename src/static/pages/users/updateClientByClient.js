import React, {useContext, useEffect, useState} from "react";
import Typography from "@mui/material/Typography";
import {FormattedMessage} from "react-intl";
import {Button, FormControl, TextField} from "@mui/material";
import Messages from "../../components/Messages";
import AuthContext from "../../components/AuthContext";
import {getUser, updateUser} from "../../utils/api";
import {useNavigate, useParams} from "react-router-dom";


export default function UpdateClientByClient(props) {
    const GradientContainer = props.bgGradient
    const navigate = useNavigate();
    const [openSuccess, setOpenSuccess] = useState(false);
    const [openWarning, setOpenWarning] = useState(false);
    const {authTokens} = useContext(AuthContext);
    const {clientId} = useParams()
    const [formData, setFormData] = useState({
        'email': '',
        'name': '',
        'address': '',
        'phone_number': '',
        'company_name': '',
        'status': '',
        'is_staff': '',
        'is_superuser': ''

    });


    useEffect(() => {
        const fetchProject = async () => {
            try {
                const response = await getUser(authTokens, clientId);
                setFormData(response.data);
                if (response.data?.length > 0) {
                    setFormData(response.data[0]);
                } else {
                    console.log("No project found")
                }
            } catch (error) {
                console.log(error)

            }
        };

          fetchProject(); // Correctly invoke the function here
  }, [authTokens, clientId]);


    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });

    };

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const updatedData = {
                email: formData.email,
                name: formData.name,
                address: formData.address,
                phone_number: formData.phone_number,
                company_name: formData.company_name,
                status: formData.status,
                is_staff: formData.is_staff === 'true',
                is_superuser: formData.is_superuser === 'true'
            };;
            await updateUser(authTokens, updatedData, clientId);
            setOpenSuccess(true);
            setOpenWarning(false);

        } catch (error) {
            console.error('Error during update client:', error);
            setOpenSuccess(false);
            setOpenWarning(true);
        }
    };
    const goToProfile = () => {
        navigate('/profile');
        scrollToTop()

    };
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };


    return (

        <GradientContainer>
            <div style={{height: '5rem'}}>
            </div>

            <div className="update-client-content">

                <div className="client-update-title">
                    <Typography component={'span'} variant="h3" style={{textAlign: 'center'}}>
                        <FormattedMessage id='update.btn'
                                          defaultMessage="Update"/> {formData.name}
                    </Typography>

                </div>


                <br/>
                <br/>
                <form className="update-user-by-user-form" onSubmit={handleSubmit}>
                    <div >

                            <FormControl fullWidth >
                                <TextField
                                    label="Name"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                />
                            </FormControl>

                            <br/>
                            <br/>

                            <FormControl fullWidth >
                                <TextField label='Company Name'
                                           id="company_name"
                                           name="company_name"
                                           type="text"
                                           value={formData.company_name || ''}
                                           onChange={handleChange}

                                />
                            </FormControl>
                            <br/>
                            <br/>
                            <FormControl fullWidth >
                                <TextField id="address"
                                           name="address"
                                           type="text"
                                           value={formData.address || ''}
                                           onChange={handleChange} variant="outlined"
                                           label={
                                               <Typography variant="body2">
                                                   <FormattedMessage id='register.address'
                                                                     defaultMessage="Address"/>
                                               </Typography>
                                           }
                                />
                            </FormControl>

                            <br/>
                            <br/>

                            <FormControl fullWidth>
                                <TextField id="phone_number"
                                           name="phone_number"
                                           type="text"
                                           value={formData.phone_number || ''}
                                           onChange={handleChange}
                                           label={
                                               <Typography variant="body2">
                                                   <FormattedMessage id='register.phone_number'
                                                                     defaultMessage="Phone Number"/>
                                               </Typography>
                                           }
                                           aria-describedby="name-text"/>
                            </FormControl>



                    </div>
                    <br/>

                    <br/>
                    <div className="client-update-btn">

                        <Messages openSuccess={openSuccess} openWarning={openWarning} setOpenSuccess={setOpenSuccess}
                                  setOpenWarning={setOpenWarning}
                                  successMessage={<FormattedMessage id='register.alert.succ'/>}
                                  warningMessage={<FormattedMessage id='register.alert.warn'/>}/>


                        <Button type='submit' variant="contained" color="secondary">
                            <Typography component={'span'} variant='body1' style={{color: "#E0F2F1"}}>
                                <FormattedMessage id='update.btn'
                                                  defaultMessage="Update"/>
                            </Typography>
                        </Button>
                    </div>
                </form>
                <br/>
                <div className="client-update-btn">
                <Button onClick={() => goToProfile()} variant="contained" color="primary"
                        style={{marginTop: '1rem'}}>
                    <Typography component={'span'} style={{color: "#E0F2F1"}} variant='body1'>
                        <FormattedMessage id='clients.profile.button' defaultMessage="Go to Profile"/>
                    </Typography>
                </Button>
                </div>
                <br/>
                <br/>


            </div>


        </GradientContainer>
    )


}