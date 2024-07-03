import React, {useContext, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography} from '@mui/material';
import AuthContext from '../../components/AuthContext';
import {FormattedMessage} from "react-intl";
import Messages from "../../components/Messages";
import {createProject} from "../../components/api";


export default function CreateProject(props) {
    const GradientContainer = props.bgGradient
    const navigate = useNavigate();
    const [openSuccess, setOpenSuccess] = useState(false);
    const [openWarning, setOpenWarning] = useState(false);
    const {authTokens} = useContext(AuthContext);
    const [projectData, setProjectData] = useState({
        id: '',
        name: '',
        link: '',
        client: '',
        status: '',
        finish_due_date: '',
        batch_price: '',
        monthly_price: '',
        batch_payment_due_date: '',
        monthly_payment_due_date: '',
        batch_payment_status: '',
        monthly_payment_status: '',
        registered_date: ''
    });

    const handleChange = (e) => {
        setProjectData({
            ...projectData,
            [e.target.name]: e.target.value
        });
        console.log(projectData)
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log("HANDLESUBMIT DATA", projectData)
            await createProject(authTokens, projectData);
            setOpenSuccess(true)
            setOpenWarning(false)


        } catch (error) {
            console.log(error);
            setOpenWarning(true)
            setOpenSuccess(false)
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
            <div className="project-create">
                <div style={{height: '5rem'}}>
                </div>

                <div className="project-create-title">
                    <Typography variant="h3">Create New Project</Typography>
                </div>
                <br/>
                <br/>

                <form onSubmit={handleSubmit}>
                    <Grid container spacing={1}>

                        <Grid item xs={12} md={4}>
                            <FormControl fullWidth style={{ width: '70%' }} >
                            <TextField
                                label="Name"
                                name="name"
                                value={projectData.name}
                                onChange={handleChange}
                            /></FormControl>
                            <br/>
                            <br/>
                            <FormControl fullWidth style={{ width: '70%' }} >
                            <TextField
                                label="Link"
                                name="link"
                                value={projectData.link || ''}
                                onChange={handleChange}
                            /></FormControl>
                            <br/>
                            <br/>
                            <FormControl fullWidth style={{ width: '70%' }} >
                            <TextField
                                label="Client Mail"
                                name="client"
                                type='email'
                                value={projectData.client || ''}
                                onChange={handleChange}
                            /></FormControl>
                            <br/>
                            <br/>

                            <FormControl fullWidth style={{ width: '70%' }} >
                                <InputLabel id="status-label">Status</InputLabel>
                                <Select
                                    labelId="status-label"
                                    id="status"
                                    name="status"
                                    value={projectData.status}
                                    onChange={handleChange}
                                >
                                    <MenuItem value="Pending">Pending</MenuItem>
                                    <MenuItem value="In Progress">In Progress</MenuItem>
                                    <MenuItem value="Completed">Completed</MenuItem>
                                </Select>
                            </FormControl>
                            <br/>
                            <br/>
                        </Grid>
                        <Grid item xs={12} md={4}>

                            <FormControl fullWidth style={{ width: '70%' }}>
                            <TextField
                                label="Finish due date"
                                name="finish_due_date"
                                type='date'
                                InputLabelProps={{shrink: true}}
                                value={projectData.finish_due_date || ''}
                                onChange={handleChange}
                            /></FormControl>
                            <br/>
                            <br/>
                            <FormControl fullWidth style={{ width: '70%' }} >

                            <TextField
                                label="Batch Price"
                                name="batch_price"
                                value={projectData.batch_price || ''}
                                onChange={handleChange}
                            /></FormControl>
                            <br/>
                            <br/>
                            <FormControl fullWidth style={{ width: '70%' }}>
                            <TextField
                                label="Batch Payment Due Date"
                                name="batch_payment_due_date"
                                type='date'
                                InputLabelProps={{shrink: true}}
                                value={projectData.batch_payment_due_date || ''}
                                onChange={handleChange}
                            /></FormControl>
                            <br/>
                            <br/>

                            <FormControl fullWidth style={{ width: '70%' }} >
                                <InputLabel id="batch_payment_status-label">Batch Payment Status</InputLabel>
                                <Select
                                    labelId="batch_payment_status-label"
                                    id="batch_payment_status"
                                    name="batch_payment_status"
                                    value={projectData.batch_payment_status}
                                    onChange={handleChange}
                                >
                                    <MenuItem value="Paid">Paid</MenuItem>
                                    <MenuItem value="Not Paid">Not Paid</MenuItem>
                                </Select>
                            </FormControl>
                            <br/>
                            <br/>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <FormControl fullWidth style={{ width: '70%' }} >

                            <TextField
                                label="Monthly Price"
                                name="monthly_price"
                                value={projectData.monthly_price || ''}
                                onChange={handleChange}
                            /></FormControl>
                            <br/>
                            <br/>
                            <FormControl fullWidth style={{ width: '70%' }}>
                            <TextField
                                label="Monthly Payment Due Date"
                                name="monthly_payment_due_date"
                                type='date'
                                InputLabelProps={{shrink: true}}
                                value={projectData.monthly_payment_due_date || ''}
                                onChange={handleChange}
                            /></FormControl>
                            <br/>
                            <br/>

                            <FormControl fullWidth style={{ width: '70%' }} >
                                <InputLabel id="monthly_payment_status-label">Monthly Payment Status</InputLabel>
                                <Select
                                    labelId="monthly_payment_status-label"
                                    id="monthly_payment_status"
                                    name="monthly_payment_status"
                                    value={projectData.monthly_payment_status}
                                    onChange={handleChange}
                                >
                                    <MenuItem value="Paid">Paid</MenuItem>
                                    <MenuItem value="Not Paid">Not Paid</MenuItem>
                                </Select>
                            </FormControl>
                            <br/>
                            <br/>
                            <FormControl fullWidth style={{ width: '70%' }}>
                            <TextField
                                label="Registered Date"
                                name="registered_date"
                                type='date'
                                InputLabelProps={{shrink: true}}
                                value={projectData.registered_date || ''}
                                onChange={handleChange}
                            /></FormControl>
                            <br/>
                            <br/>
                        </Grid>


                        <div className="project-create-btn">
                            <Messages openSuccess={openSuccess} openWarning={openWarning}
                                      setOpenSuccess={setOpenSuccess}
                                      setOpenWarning={setOpenWarning}
                                      successMessage={
                                          <FormattedMessage id='project.create.alert.succ'
                                                            default='Create successfull!'/>
                                      }
                                      warningMessage={
                                          <FormattedMessage id='project.create.alert.warn'
                                                            default="Error ocurred!"/>
                                      }/>

                            <Button type='submit' variant="contained" color="secondary">
                                <Typography component={'span'} style={{color: "#E0F2F1"}} variant='body1'>
                                    <FormattedMessage id='projects.profile.button' defaultMessage="Submit"/>
                                </Typography>
                            </Button>

                            <br/>

                            <Button onClick={() => goToProfile()} variant="contained" color="primary"
                                    style={{marginTop: '1rem'}}>
                                <Typography component={'span'} style={{color: "#E0F2F1"}} variant='body1'>
                                    <FormattedMessage id='projects.profile.button' defaultMessage="Go to Profile"/>
                                </Typography>
                            </Button>
                        </div>
                    </Grid>


                </form>
                <br/>
                <br/>
            </div>
        </GradientContainer>

    )
        ;
};


