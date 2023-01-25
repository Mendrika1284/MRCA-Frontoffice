
let saveToken = (token) => {
    localStorage.setItem('token', token)
}

let saveEmail = (email) => {
    localStorage.setItem('email', email)
}

let saveData = (data) => {
    let toStringData = JSON.stringify(data);
    localStorage.setItem('data',toStringData);
}

let saveId = (id) => {
    localStorage.setItem('id', id)
}

let saveIdArtisan = (id) => {
    localStorage.setItem('idArtisan', id)
}

let logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('email')
    localStorage.removeItem('id')
    localStorage.removeItem('artisan')
    localStorage.removeItem('data')
}

let isLogged = () => {
    let token = localStorage.getItem('token')
    return !!token
}

export const loginService = {
    saveToken, saveEmail, saveId,saveIdArtisan, logout, isLogged, saveData
}