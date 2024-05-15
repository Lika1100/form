function isValidPassword(password: string) {
    const regExp = new RegExp(/^[A-Za-z0-9]\w{7,}$/i)
    return regExp.test(password)
}

export default isValidPassword