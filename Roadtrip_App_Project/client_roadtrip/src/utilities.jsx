import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const signUp = async(name, email, password) => {
    let response = await axios.post('/users/' , {
        'name': name,
        'email' : email,
        'password' : password
    })
    console.log(response.data.success)
    return response.data.success
}


export const signIn = async(email, password, setUser) => {
    let response = await axios.put('/users/', {
        'email' : email,
        'password' : password
    })

    setUser({...response.data, user: true})
    // console.log(response.data.name)
    console.log(response.data.login)
    if (response.data.login){
        console.log('yes it made it in')
        // window.location.href =("/tester/")

    }
}

export const currUser = async() =>{
    let response = await axios.get('/users/')
    console.log(response.data)
    return response.data
}

export const logOut = async(setUser) => {
    let response = await axios.post('/users/')
    if(response.data.logout){
        setUser(null)
    }
}