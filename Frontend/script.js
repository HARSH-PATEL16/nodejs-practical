const handleRegisterFormSubmit = () => {
    event.preventDefault();
    let username = document.getElementById('username').value;
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;
    let confirm_password = document.getElementById('confirm_password').value;

    const data = {
        username,
        email,
        password,
        confirm_password
    };

    console.log('data', data);

    // axios.post("url", data).then(function (response) {
    //     console.log(response)
    // })
}

const handleLoginFormSubmit = () => {
    event.preventDefault();
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;

    const data = {
        email,
        password
    };
    
    console.log('data', data);

    // axios.post("url", data).then(function (response) {
    //     console.log(response)
    // })

}

const handleChangePassword = () => {
    event.preventDefault();
    let current_password = document.getElementById('current_password').value;
    let new_password = document.getElementById('new_password').value;
    let confirm_password = document.getElementById('confirm_password').value;

    const data = {
        current_password,
        new_password,
        confirm_password
    };

    console.log('data', data);

    // axios.post("url", data).then(function (response) {
    //     console.log(response)
    // })
}

const logout = () => {
    alert('logout Successful');

    // axios.post("url", data).then(function (response) {
    //     console.log(response)
    // })
}