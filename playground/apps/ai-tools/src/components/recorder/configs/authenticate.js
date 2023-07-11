const aunthenticate = () => {
    let userInfo = JSON.parse(localStorage.getItem("userInfo"))
    if (userInfo && userInfo.privateKey ) {
        return true;
    }
    return false;
}

export default aunthenticate;


