import axios from "axios";

async function auth(token: string) {
    const res = await axios.get("https://api.escuelajs.co/api/v1/auth/profile", {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    })
    return res
}

export default auth