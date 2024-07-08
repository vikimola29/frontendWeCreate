// import {createContext, useState, useEffect} from 'react';
// import jwtDecode from 'jwt-decode';
// import {useNavigate} from 'react-router-dom';
// import axios from 'axios';
//
// const AuthContext = createContext();
//
// export default AuthContext;
//
// export const AuthProvider = ({children}) => {
//     const [authTokens, setAuthTokens] = useState(() => localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null);
//     const [user, setUser] = useState(() => localStorage.getItem('authTokens') ? jwtDecode(localStorage.getItem('authTokens')) : null);
//     const [loading, setLoading] = useState(true);
//     const navigate = useNavigate();
//
//     const loginUser = async (email, password) => {
//         const response = await axios.post('http://127.0.0.1:8000/backend/api/token/', {
//             email,
//             password
//         }, {headers: {'Content-Type': 'application/json'}});
//         const data = response.data;
//         setAuthTokens(data);
//         setUser(jwtDecode(data.access));
//         localStorage.setItem('authTokens', JSON.stringify(data));
//         navigate('/');
//     };
//
//     const logoutUser = () => {
//         setAuthTokens(null);
//         setUser(null);
//         localStorage.removeItem('authTokens');
//         navigate('/');
//     };
//
//         const updateToken = async () => {
//         console.log("TOKEN REFRESH")
//
//         const response = await fetch('http://127.0.0.1:8000/backend/api/token/refresh/', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify({refresh: authTokens?.refresh})
//         })
//
//         const data = await response.json()
//         if (response.status === 200) {
//             setAuthTokens(data)
//             setUser(jwtDecode(data.access))
//             localStorage.setItem('authTokens', JSON.stringify(data))
//
//             // setIsAuthenticated('false');
//             // localStorage.setItem('isAuthenticated', 'false');
//         }
//         else {
//             console.log("NO UPDATE")
//             logoutUser()
//         }
//
//         if (loading) {
//             setLoading(false)
//         }
//     }
//
//
//     useEffect(() => {
//         console.log("AuthContext User: ", user);
//
//         // if (loading) {
//         if (authTokens) {
//             updateToken()
//         }
//
//         const REFRESH_INTERVAL = 1000 * 60 * 4 // 4 min
//         let interval = setInterval(() => {
//             if (authTokens) {
//                 updateToken()
//             }
//         }, REFRESH_INTERVAL)
//         return () => clearInterval(interval)
//
//     }, [loading])
//
//     return (
//         <AuthContext.Provider value={{user, authTokens, loginUser, logoutUser}}>
//             {children}
//         </AuthContext.Provider>
//     );
// };
import {createContext, useState, useEffect} from 'react'
import jwtDecode from 'jwt-decode';
import {useNavigate} from 'react-router-dom'
import axios from "axios";
import {obtainToken} from "../utils/api";

const AuthContext = createContext()

export default AuthContext;

export const AuthProvider = ({children}) => {

    const [isAuthenticated, setIsAuthenticated] = useState(localStorage.getItem('isAuthenticated'));


    const [user, setUser] = useState(() => {
        const token = localStorage.getItem('authTokens');
        if (token) {
            try {
                return jwtDecode(token);
            } catch (error) {
                console.error('Invalid token:', error);
                localStorage.removeItem('authTokens');
                return null;
            }
        }
        return null;
    });

    const [authTokens, setAuthTokens] = useState(() => {
        const token = localStorage.getItem('authTokens');
        if (token) {
            try {
                return JSON.parse(token);
            } catch (error) {
                console.error('Failed to parse auth tokens:', error);
                localStorage.removeItem('authTokens');
                return null;
            }
        }
        return null;
    });

    let [loading, setLoading] = useState(true)

    const navigate = useNavigate()


    let loginUser = async (email, password) => {
        console.log("TOKEN")
        console.log('Attempting to log in with:', {email, password});

        const response = await obtainToken(email, password)
        console.log('token obtained')


        let data = response.data


        if (data) {
            localStorage.setItem('authTokens', JSON.stringify(data));
            setAuthTokens(data)
            setUser(jwtDecode(data.access))

            setIsAuthenticated('true');
            localStorage.setItem('isAuthenticated', 'true');

            navigate('/')
        } else {
            alert('Something went wrong while logging in the user!')
        }
    }

    let logoutUser = () => {
        localStorage.removeItem('authTokens')
        setAuthTokens(null)
        setUser(null)
        setIsAuthenticated('false');
        localStorage.setItem('isAuthenticated', 'false');

        navigate('/')
        window.location.reload(false);
        console.log("Logout AuthContext")
    }

    const updateToken = async () => {
        console.log("TOKEN REFRESH")

        const response = await fetch('http://127.0.0.1:8000/backend/api/token/refresh/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({refresh: authTokens?.refresh})
        })

        const data = await response.json()
        if (response.status === 200) {
            setAuthTokens(data)
            setUser(jwtDecode(data.access))
            localStorage.setItem('authTokens', JSON.stringify(data))

            // setIsAuthenticated('false');
            // localStorage.setItem('isAuthenticated', 'false');
        } else {
            console.log("NO UPDATE")
            logoutUser()
        }

        if (loading) {
            setLoading(false)
        }
    }


    useEffect(() => {
        console.log("AuthContext User: ", user);

        // if (loading) {
        if (authTokens) {
            updateToken()
        }

        const REFRESH_INTERVAL = 1000 * 60 * 100 // 100 min
        let interval = setInterval(() => {
            if (authTokens) {
                updateToken()
            }
        }, REFRESH_INTERVAL)
        return () => clearInterval(interval)

    }, [loading])

    let contextData = {
        user: user,
        authTokens: authTokens,
        loginUser: loginUser,
        logoutUser: logoutUser,
    }

    return (
        <AuthContext.Provider value={contextData}>
            {children}
        </AuthContext.Provider>
    )
}