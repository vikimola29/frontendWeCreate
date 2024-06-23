import {createContext, useState, useEffect} from 'react'
import jwtDecode from 'jwt-decode';
import {useNavigate} from 'react-router-dom'

const AuthContext = createContext()

export default AuthContext;

export const AuthProvider = ({children}) => {

    // let [user, setUser] = useState(() => (localStorage.getItem('authTokens') ? jwtDecode(localStorage.getItem('authTokens')) : null))
    // let [authTokens, setAuthTokens] = useState(() => (localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null))

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

    let loginUser = async (username, password) => {
        // e.preventDefault()

        console.log("TOKEN")

        // const username = e.target.username.value;
        // const password = e.target.password.value;

        console.log('Attempting to log in with:', {username, password});


        const response = await fetch('http://127.0.0.1:8000/backend/api/token/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            // body: JSON.stringify({username: e.target.username.value, password: e.target.password.value})
            body: JSON.stringify({username, password})
        });

        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }

        let data = await response.json();

        if (data) {
            localStorage.setItem('authTokens', JSON.stringify(data));
            setAuthTokens(data)
            setUser(jwtDecode(data.access))

            setIsAuthenticated('true');
            localStorage.setItem('isAuthenticated', 'true');

            navigate('/')
            console.log("YO")
        } else {
            alert('Something went wrong while logging in the user!')
        }
    }

    let logoutUser = () => {
        localStorage.removeItem('authTokens')
        setAuthTokens(null)
        setUser(null)

        navigate('/')
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
        console.log("User: ", user);

        // if (loading) {
        if (authTokens) {
            updateToken()
        }

        const REFRESH_INTERVAL = 1000 * 60 * 4 // 4 minutes
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