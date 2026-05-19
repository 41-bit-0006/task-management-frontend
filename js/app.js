const API = "http://localhost/API/";

function register() {

    fetch(API + "register.php", {
        method: "POST", headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            username: document.getElementById("regUsername").value,
            password: document.getElementById("regPassword").value
        })
    })
    .then(res => res.json())
    .then(data => {

        if(data.status === "success"){

            document.getElementById("regMsg").innerText = "Registration Successful";

            setTimeout(() => {
                window.location.href = "index.html";
            }, 1000);

        } else {

            document.getElementById("regMsg").innerText = "Registration Failed";
        }
    });
}

function login() {

    fetch(API + "login.php", {
        method: "POST", headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            username: document.getElementById("loginUsername").value,
            password: document.getElementById("loginPassword").value
        })
    })
    .then(res => res.json())
    .then(data => {

        if(data.status === "success"){

            localStorage.setItem("token", data.token);

            window.location.href = "dashboard.html";

        } else {

            document.getElementById("loginMsg").innerText = "Invalid Username or Password";
        }
    });
}

function addTask() {

    fetch(API + "add_task.php", {
        method: "POST", headers: {
            "Content-Type": "application/json",
            "Authorization": localStorage.getItem("token")
        },
        body: JSON.stringify({
            task: document.getElementById("taskInput").value
        })
    })
    .then(res => res.json())
    .then(data => {

        alert("Task Added Successfully");

        document.getElementById("taskInput").value = "";

        getTasks();
    });
}

function getTasks() {

    fetch(API + "get_task.php", {
        method: "GET", headers: {
            "Authorization": localStorage.getItem("token")
        }
    })
    .then(res => res.json())
    .then(data => {

        let output = "";

        data.forEach(task => {

            output += `<li>${task.task}</li>`;
        });

        document.getElementById("taskList").innerHTML = output;
    });
}

function logout(){

    fetch(API + "logout.php", {
        method: "POST",headers: {
            "Authorization": localStorage.getItem("token")
        }
    })
    .then(res => res.json())
    .then(data => {

        localStorage.removeItem("token");

        window.location.href = "index.html";
    });
}
