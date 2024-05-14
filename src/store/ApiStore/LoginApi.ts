import axios from "axios"

async function loginApi(email: string, password: string) {
    const response = await axios.post("https://api.escuelajs.co/api/v1/auth/login", {
        email: email,
        password: password
    })

    return response
}

export default loginApi