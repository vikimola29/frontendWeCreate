import React, {useContext, useEffect, useState} from "react";
import Typography from "@mui/material/Typography";
import {FormattedMessage} from "react-intl";
import {Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField} from "@mui/material";
import Messages from "../../components/Messages";
import AuthContext from "../../components/AuthContext";
import {getUser, updateUser} from "../../utils/api";
import {useNavigate, useParams} from "react-router-dom";


export default function UpdateClient(props) {
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
            };
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

            <div className="update-client">

                <div className="client-update-title">
                    <Typography variant="h3">{formData.name}</Typography>
                </div>


                <br/>
                <br/>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={1}>

                        <Grid item xs={12} md={6} className="client-update-fields">
                            <FormControl fullWidth style={{width: '70%'}}>
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

                            <FormControl fullWidth style={{width: '70%'}}>
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
                            <FormControl fullWidth style={{width: '70%'}}>
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

                            <FormControl fullWidth style={{width: '70%'}}>
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
                        </Grid>

                        <br/>
                        <br/>

                        <Grid item xs={12} md={6} className="client-update-fields">


                            <FormControl fullWidth style={{width: '70%'}}>
                                <InputLabel id="status-label">Status</InputLabel>
                                <Select
                                    labelId="status-label"
                                    id="status"
                                    name="status"
                                    value={formData.status || ''}
                                    onChange={handleChange}
                                >
                                    <MenuItem value="Client">Client</MenuItem>
                                    <MenuItem value="Admin">Admin</MenuItem>
                                    <MenuItem value=""></MenuItem>
                                </Select>
                            </FormControl>

                            <br/>
                            <br/>

                            <FormControl fullWidth style={{width: '70%'}}>
                                <InputLabel id="is_staff-label">Status</InputLabel>
                                <Select
                                    labelId="is_staff-label"
                                    id="is_staff"
                                    name="is_staff"
                                    value={formData.is_staff || ''}
                                    onChange={handleChange}
                                >
                                    <MenuItem value="false">False</MenuItem>
                                    <MenuItem value="true">True</MenuItem>
                                </Select> </FormControl>
                            <br/>
                            <br/>

                            <FormControl fullWidth style={{width: '70%'}}>
                                <InputLabel id="is_superuser-label">Status</InputLabel>
                                <Select
                                    labelId="is_superuser-label"
                                    id="is_superuser"
                                    name="is_superuser"
                                    value={formData.is_superuser || ''}
                                    onChange={handleChange}
                                >
                                    <MenuItem value="false">False</MenuItem>
                                    <MenuItem value="true">True</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>
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

                            <Button onClick={() => goToProfile()} variant="contained" color="primary"
                                    style={{marginTop: '1rem'}}>
                                <Typography component={'span'} style={{color: "#E0F2F1"}} variant='body1'>
                                    <FormattedMessage id='profile.btn' defaultMessage="Go to Profile"/>
                                </Typography>
                            </Button>
                    </div>
                </form>
                <br/>


                <br/>
                <br/>


            </div>


        </GradientContainer>
    )


}