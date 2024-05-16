/* eslint-disable no-useless-escape */
function isImgUrl(imgUrl: string) {
    const regExp = new RegExp(/^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/)
    return regExp.test(imgUrl)
}

export default isImgUrl