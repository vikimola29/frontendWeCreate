import axios from 'axios';
import {getCSRFToken} from "./getCsrfToken";


const API_URL = 'http://127.0.0.1:8000/';


export const messageForm = (formData) => {
    return axios.post(`${API_URL}create_message/`, formData);
}
export const subscribeNewsletter = (clientData) => {
    return axios.post(`${API_URL}newsletter/subscribe/`, clientData);
}

export const unsubscribeNewsletter = (clientData) => {
    return axios.post(`${API_URL}newsletter/unsubscribe/`, clientData);
}

export const obtainToken = (email, password) => {
    return axios.post(`${API_URL}token/`, {email, password}, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
};
export const createProject = (authTokens, projectData) => {

    return axios.post(`${API_URL}projects/`, projectData, {

        headers: {
            'Authorization': `Bearer ${authTokens.access}`
        }
    });
};

export const getProject = (authTokens, projectId) => {
    return axios.get(`${API_URL}project/${projectId}/`, {
        headers: {
            'Authorization': `Bearer ${authTokens.access}`
        }
    });
};
export const getAllProjects = (authTokens) => {
    return axios.get(`${API_URL}all-projects/`, {
        headers: {
            'Authorization': `Bearer ${authTokens.access}`
        }
    });
};

export const getUsersProjects = (authTokens) => {
    return axios.get(`${API_URL}projects/`, {
        headers: {
            'Authorization': `Bearer ${authTokens.access}`
        }
    });
}

export const updateProject = (authTokens, projectId, projectData) => {
    return axios.put(`${API_URL}project/${projectId}/`, projectData, {
        headers: {
            'Authorization': `Bearer ${authTokens.access}`,
            'Content-Type': 'application/json'
        }
    });
};
export const deleteProject = (authTokens, projectId) => {
    return axios.delete(`${API_URL}project/${projectId}/`, {
        headers: {
            'Authorization': `Bearer ${authTokens.access}`,
            'Content-Type': 'application/json'
        }
    });
};


export const createUser = (userData) => {
    return axios.post(`${API_URL}clients/`, userData, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
};


export const getLoggedUser = (authTokens) => {
    return axios.get(`${API_URL}profile/`, {
        headers: {
            'Authorization': `Bearer ${authTokens.access}`
        }
    });
};
export const getUser = (authTokens, clientId) => {
    return axios.get(`${API_URL}client/${clientId}/`, {
        headers: {
            'Authorization': `Bearer ${authTokens.access}`
        }
    });
};

export const getAllUsers = (authTokens) => {
    return axios.get(`${API_URL}all-clients/`, {
        headers: {
            'Authorization': `Bearer ${authTokens.access}`
        }
    });
};
export const updateUser = (authTokens, clientData, clientId) => {
    return axios.put(`${API_URL}client/${clientId}/`, clientData, {
        headers: {
            'Authorization': `Bearer ${authTokens.access}`,
            'Content-Type': 'application/json'
        }
    });
};
export const deleteUser = (authTokens, clientId) => {
    return axios.delete(`${API_URL}client/${clientId}/`, clientId, {
        headers: {
            'Authorization': `Bearer ${authTokens.access}`,
            'Content-Type': 'application/json'
        }
    });
};

export const passwordReset = async (clientData) => {
    try {
        const csrfToken = await getCSRFToken();

        const response = await axios.post(`${API_URL}reset_password/`, clientData,
            {
                headers: {
                    'X-CSRFToken': csrfToken,
                    'Content-Type': 'application/json',
                },
                withCredentials: true,
            }
        );
        return response.data;
    } catch (error) {
        console.error('Error during password reset:', error);
        throw error;
    }
};

export const recoverPassword = async (clientData, token) => {
    try {
        const csrfToken = await getCSRFToken();
        const response = await axios.post(`${API_URL}reset_password/confirm/`, {token: token, ...clientData}, {
            headers: {
                'X-CSRFToken': csrfToken,
                'Content-Type': 'application/json',
            },
            withCredentials: true,
        });
        return response.data;
    } catch (error) {
        console.error('Error during password reset:', error);
        throw error;
    }
};

export const fetchCSRFToken = async () => {
    try {
        const response = await axios.get(`${API_URL}get-csrf-token/`, {withCredentials: true});
        document.cookie = `csrftoken3=${response.data.csrfToken}; path=/`;
    } catch (error) {
        console.error('Error fetching CSRF token:', error);
    }
};

