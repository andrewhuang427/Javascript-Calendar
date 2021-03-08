/**
 * Logging Existing User
 * 
 */
function loginAjax(event) {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    const data = {
        "username": username,
        "password": password,
    };

    fetch("authenticate.php", {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "content-type": "application/json" }
    })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                hideLoginButtons();
                document.getElementById("username-heading").textContent = "User: " + username;
                localStorage.setItem("user", username);
                localStorage.setItem("status", "loggedIn");
                localStorage.setItem("token", data.token)
                loginModal.style.display = "none";
                document.getElementById("logout-btn").style.visibility = "visible";
                updateCalendar();
            }
            else {
                alert(data.message);
            }
        }
        )
        .catch(err => console.error(err));
}

document.getElementById("login-btn").addEventListener("click", loginAjax, false);


/**
 * Registering User
 * 
 */
function registerAjax(event) {
    const newUsername = document.getElementById("register-username").value;
    const newPassword = document.getElementById("register-password").value;
    const confirmation = document.getElementById("confirmation-password").value;
    if (newPassword == confirmation) {

        const data = {
            "username": newUsername,
            "password": newPassword
        };

        fetch("register.php", {
            method: "POST",
            body: JSON.stringify(data),
            headers: { "content-type": "application/json" }
        })
            .then(response => response.json())
            .then(data => {
                console.log(data)
                if (data.success) {
                    hideLoginButtons();
                    document.getElementById("username-heading").textContent = "User: " + newUsername;
                    localStorage.setItem("token", data.token);
                    localStorage.setItem("user", newUsername);
                    localStorage.setItem('status', 'loggedIn');
                }
                else {
                    alert("username already exists");
                }
            })
            .catch(err => console.error(err));
        registerModal.style = display = "none";
        document.getElementById("logout-btn").style.visibility = "visible";
    }
    else {
        alert("Confirmation password must match");
    }
}

document.getElementById("register-btn").addEventListener("click", registerAjax, false);


/**
 * Logging User Out
 * 
 */
function logoutAjax(event) {
    fetch("logout.php", {
        method: "POST",
    })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(err => console.error(err));

    document.getElementById("login-modal-opener").style.visibility = "visible";
    document.getElementById("register-modal-opener").style.visibility = "visible";
    document.getElementById("username-heading").textContent = "";
    localStorage.removeItem("status");
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    updateCalendar();

    document.getElementById("logout-btn").style.visibility = "hidden";

}

document.getElementById("logout-btn").addEventListener("click", logoutAjax, false);

if (localStorage.getItem("user") != null) {
    hideLoginButtons()
    document.getElementById("username-heading").textContent = "User: " + localStorage.getItem("user");
}

function hideLoginButtons() {
    document.getElementById("login-modal-opener").style.visibility = "hidden";
    document.getElementById("register-modal-opener").style.visibility = "hidden";
}
