const ApiBase = "http://localhost:3000";

async function signup(){
    const username = document.getElementById("SignUpUsername").value;
    const password = document.getElementById("SignUpPassword").value;

    try {
        await axios.post(`${ApiBase}/signup`, {
            username: username,
            password: password
        });
        alert("You are signed up");
    } catch (err) {
        alert("There was a problem with signup.");
    }
}

async function Signin(){
    const username = document.getElementById("SignInUsername").value;
    const password = document.getElementById("SignInPassword").value;

    try {
        const response = await axios.post(`${ApiBase}/signin`, {
            username: username,
            password: password
        });

        localStorage.setItem("token", response.data.token);
        alert("You are signed in.");
    } catch (err) {
        alert("Sign-in failed. Check your credentials.");
    }
}

async function GetUserInfo(){
    try {
        const response = await axios.get(`${ApiBase}/me`, {
            headers: {
                token: localStorage.getItem("token")
            }
        });
        document.getElementById("information").innerHTML = `Username = ${response.data.username} and Password = ${response.data.password}`;
    } catch (err) {
        alert("Failed to retrieve user information.");
    }
}

function Logout() {
    localStorage.removeItem("token");
    alert("You have been logged out.");
    document.getElementById("information").innerHTML = "";
}

GetUserInfo();
