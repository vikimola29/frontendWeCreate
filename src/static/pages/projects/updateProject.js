import React, {useState, useContext, useEffect} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {Typography, TextField, Button, Grid} from '@mui/material';
import AuthContext from '../../components/AuthContext';
import {getProject, updateProject} from "../../components/api";
import {FormattedMessage} from "react-intl";
import {LocalizationProvider} from "@mui/x-date-pickers";
import DatePicker from '@mui/lab/DatePicker';
import Messages from "../../components/Messages";


export default function UpdateProject(props) {
    const GradientContainer = props.bgGradient
    const navigate = useNavigate();
    const [openSuccess, setOpenSuccess] = useState(false);
    const [openWarning, setOpenWarning] = useState(false);
    const {projectId} = useParams();
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

    useEffect(() => {
        const fetchProject = async () => {
            try {
                const response = await getProject(authTokens, projectId);
                setProjectData(response.data);
                if (response.data?.length > 0) {
                    setProjectData(response.data[0]);
                } else {
                    console.log("No project found")
                }
            } catch (error) {
                console.log(error)

            }
        };

        fetchProject();
    }, [authTokens, projectId]);

    const handleChange = (e) => {
        setProjectData({
            ...projectData,
            [e.target.name]: e.target.value
        });
        console.log(projectData);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateProject(authTokens, projectId, projectData)

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
            <div className="project-update">
                <div style={{height: '5rem'}}>
                </div>

                <div className="project-update-title">
                    <Typography variant="h3">{projectData.name}</Typography>
                </div>
                <br/>
                <br/>

                <form onSubmit={handleSubmit}>
                    <Grid container spacing={1}>

                        <Grid item xs={12} md={4}>

                            <TextField
                                label="Name"
                                name="name"
                                value={projectData.name}
                                onChange={handleChange}
                            />
                            <br/>
                            <br/>

                            <TextField
                                label="Link"
                                name="link"
                                value={projectData.link || ''}
                                onChange={handleChange}
                            />
                            <br/>
                            <br/>
                            <TextField
                                label="Client Mail"
                                name="client"
                                type='email'
                                value={projectData.client || ''}
                                onChange={handleChange}
                            />
                            <br/>
                            <br/>
                            <TextField
                                label="Status"
                                name="status"
                                value={projectData.status || ''}
                                onChange={handleChange}
                            />
                            <br/>
                            <br/>
                        </Grid>
                        <Grid item xs={12} md={4}>


                            <TextField
                                label="Finish due date"
                                name="finish_due_date"
                                type='date'
                                value={projectData.finish_due_date || ''}
                                onChange={handleChange}
                            />
                            <br/>
                            <br/>
                            <TextField
                                label="Batch Price"
                                name="batch_price"
                                value={projectData.batch_price || ''}
                                onChange={handleChange}
                            />
                            <br/>
                            <br/>
                            <TextField
                                label="Batch Payment Due Date"
                                name="batch_payment_due_date"
                                type='date'
                                value={projectData.batch_payment_due_date || ''}
                                onChange={handleChange}
                            />
                            <br/>
                            <br/>
                            <TextField
                                label="Batch Payment Status"
                                name="batch_payment_status"
                                value={projectData.batch_payment_status || ''}
                                onChange={handleChange}
                            />
                            <br/>
                            <br/>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <TextField
                                label="Monthly Price"
                                name="monthly_price"
                                value={projectData.monthly_price || ''}
                                onChange={handleChange}
                            />
                            <br/>
                            <br/>
                            <TextField
                                label="Monthly Payment Due Date: YYYY-MM-DD"
                                name="monthly_payment_due_date"
                                value={projectData.monthly_payment_due_date || ''}
                                onChange={handleChange}
                            />
                            <br/>
                            <br/>
                            <TextField
                                label="Monthly Payment Status"
                                name="monthly_payment_status"
                                value={projectData.monthly_payment_status || ''}
                                onChange={handleChange}
                            />
                            <br/>
                            <br/>
                            <TextField
                                label="Registered Date: YYYY-MM-DD"
                                name="registered_date"
                                value={projectData.registered_date || ''}
                                onChange={handleChange}
                            />
                            <br/>
                            <br/>
                        </Grid>


                        <div className="project-update-btn">
                            <Messages openSuccess={openSuccess} openWarning={openWarning}
                                      setOpenSuccess={setOpenSuccess}
                                      setOpenWarning={setOpenWarning}
                                      successMessage={<FormattedMessage id='project.update.alert.succ'
                                                                        default='Update successfull!'/>}
                                      warningMessage={<FormattedMessage id='project.update.alert.warn'
                                                                        default="Error ocurred!"/>}/>
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


