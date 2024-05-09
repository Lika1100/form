function isImgUrl(imgUrl: string) {
    const regExp = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/
    return regExp.test(imgUrl)
}

export default isImgUrl