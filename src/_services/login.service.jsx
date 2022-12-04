
let saveToken = (token) => {
    localStorage.setItem('token', token)
}

let saveEmail = (email) => {
    localStorage.setItem('email', email)
}

let logout = () => {
    localStorage.removeItem('token')
}

let isLogged = () => {
    let token = localStorage.getItem('token')
    return !!token
}

export const loginService = {
    saveToken, saveEmail, logout, isLogged
}