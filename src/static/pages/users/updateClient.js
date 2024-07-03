import React, {useContext, useEffect, useState} from "react";
import Typography from "@mui/material/Typography";
import {FormattedMessage} from "react-intl";
import {Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField} from "@mui/material";
import Messages from "../../components/Messages";
import AuthContext from "../../components/AuthContext";
import AuthContextProfileData from "../../components/fetchProfileData";
import {getProject, getUser, updateUser} from "../../components/api";
import {useParams} from "react-router-dom";


export default function UpdateClient(props) {
    const GradientContainer = props.bgGradient
    const [openSuccess, setOpenSuccess] = useState(false);
    const [openWarning, setOpenWarning] = useState(false);
    const {authTokens} = useContext(AuthContext);
    const userMail = useParams()
    console.log(userMail)
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
                const response = await getUser(authTokens, userMail);
                formData(response.data);
                if (response.data?.length > 0) {
                    setFormData(response.data[0]);
                } else {
                    console.log("No project found")
                }
            } catch (error) {
                console.log(error)

            }
        };

        fetchProject();
    }, [authTokens, userMail]);


    const handleChange = (e) => {
        const {id, value} = e.target;
        console.log(id, value);
        setFormData({
            ...formData,
            [id]: value,
        });
    };
    const handleSubmit = async (formData) => {
        try {
            await updateUser(authTokens, formData);
            setOpenSuccess(true);
            setOpenWarning(false);

        } catch (error) {
            console.error('Error during registration:', error);
            setOpenSuccess(false);
            setOpenWarning(true);
        }
    };

    // const handleSubmit = async (formData) => {
    //     try {
    //         // formData.preventDefault();
    //         const response = await fetch('http://127.0.0.1:8000/backend/api/register/', {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json'
    //             },
    //             body: JSON.stringify({
    //                 name: formData.name,
    //                 email: formData.email,
    //                 companyName: formData.companyName,
    //                 password: formData.password,
    //                 password2: formData.password2
    //             })
    //         });
    //
    //         const data = await response.json();
    //
    //         if (data.success) {
    //             console.log('Registration successful:', data.message);
    //             setOpenSuccess(true);
    //             setOpenWarning(false);
    //         } else {
    //             console.log('Registration failed:', data.message);
    //             setOpenSuccess(false);
    //             setOpenWarning(true);
    //         }
    //     } catch (error) {
    //         console.error('Error during registration:', error);
    //         setOpenSuccess(false);
    //         setOpenWarning(true);
    //     }
    // };


    return (

        <GradientContainer>
            <div style={{height: '5rem'}}>
            </div>

            <div className="register-content">

                <div className="register-title">
                    <Typography component={'span'} variant="h3" style={{textAlign: 'center'}}>
                        <FormattedMessage id='register.title'
                                          defaultMessage="Update client"/>
                    </Typography>
                </div>


                <br/>
                <br/>
                <Grid container spacing={1}>

                    <Grid item xs={12} md={6}>

                        <FormControl fullWidth style={{width: '70%'}}>
                            <TextField id="name"
                                       type="text"
                                       value={formData.name} onChange={handleChange} variant="outlined"
                                       color="secondary"
                                       style={{width: '100%'}}
                                       InputLabelProps={{color: "primary"}}
                                       label={
                                           <Typography variant="body2">
                                               <FormattedMessage id='register.name'
                                                                 defaultMessage="Name"/>
                                           </Typography>
                                       }
                                       aria-describedby="name-text"/>
                        </FormControl>

                        <br/>
                        <FormControl fullWidth style={{width: '70%'}}>
                            <TextField id="company_name"
                                       type="text"
                                       value={formData.company_name} onChange={handleChange} variant="outlined"
                                       color="secondary"
                                       style={{width: '100%'}}
                                       InputLabelProps={{color: "primary"}}
                                       label={
                                           <Typography variant="body2">
                                               <FormattedMessage id='register.company_name'
                                                                 defaultMessage="Company Name"/>
                                           </Typography>
                                       }
                                       aria-describedby="name-text"/>
                        </FormControl>
                        <br/>
                        <FormControl fullWidth style={{width: '70%'}}>
                            <TextField id="address"
                                       type="text"
                                       value={formData.address} onChange={handleChange} variant="outlined"
                                       color="secondary"
                                       style={{width: '100%'}}
                                       InputLabelProps={{color: "primary"}}
                                       label={
                                           <Typography variant="body2">
                                               <FormattedMessage id='register.address'
                                                                 defaultMessage="Company Name"/>
                                           </Typography>
                                       }
                                       aria-describedby="name-text"/>
                        </FormControl>

                        <br/>
                        <FormControl fullWidth style={{width: '70%'}}>
                            <TextField id="phone_number"
                                       type="text"
                                       value={formData.phone_number} onChange={handleChange} variant="outlined"
                                       color="secondary"
                                       style={{width: '100%'}}
                                       InputLabelProps={{color: "primary"}}
                                       label={
                                           <Typography variant="body2">
                                               <FormattedMessage id='register.phone_number'
                                                                 defaultMessage="Company Name"/>
                                           </Typography>
                                       }
                                       aria-describedby="name-text"/>
                        </FormControl>
                    </Grid>

                    <br/>
                    <Grid item xs={12} md={6}>


                        <FormControl fullWidth style={{width: '70%'}}>
                            <InputLabel id="status-label">Status</InputLabel>
                            <Select
                                labelId="status-label"
                                id="status"
                                name="status"
                                value={formData.status}
                                onChange={handleChange}
                            >
                                <MenuItem value="Client">Client</MenuItem>
                                <MenuItem value="Admin">Admin</MenuItem>
                            </Select>
                        </FormControl>

                        <br/>

                        <FormControl fullWidth style={{width: '70%'}}>
                            <InputLabel id="is_staff-label">Status</InputLabel>
                            <Select
                                labelId="is_staff-label"
                                id="is_staff"
                                name="is_staff"
                                value={formData.is_staff}
                                onChange={handleChange}
                            >
                                <MenuItem value="False">False</MenuItem>
                                <MenuItem value="True">True</MenuItem>
                            </Select> </FormControl>
                        <br/>

                        <FormControl fullWidth style={{width: '70%'}}>
                            <InputLabel id="is_superuser-label">Status</InputLabel>
                            <Select
                                labelId="is_superuser-label"
                                id="is_superuser"
                                name="is_superuser"
                                value={formData.is_superuser}
                                onChange={handleChange}
                            >
                                <MenuItem value="False">False</MenuItem>
                                <MenuItem value="True">True</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>

                <br/>

                <br/>

                <Messages openSuccess={openSuccess} openWarning={openWarning} setOpenSuccess={setOpenSuccess}
                          setOpenWarning={setOpenWarning}
                          successMessage={<FormattedMessage id='register.alert.succ'/>}
                          warningMessage={<FormattedMessage id='register.alert.warn'/>}/>


                <Button onClick={() => handleSubmit(formData)} variant="contained" color="secondary">
                    <Typography component={'span'} variant='body1' style={{color: "#E0F2F1"}}>
                        <FormattedMessage id='update.btn'
                                          defaultMessage="Update"/>
                    </Typography>
                </Button>
                <br/>
                <br/>


            </div>


        </GradientContainer>
    )


}