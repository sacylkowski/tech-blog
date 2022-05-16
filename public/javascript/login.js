async function loginForm(event) {
    event.preventDefault();

    // grabbing the data from the form
    const username = document.querySelector("#username-login").value.trim();
    const password = document.querySelector("#password-login").value.trim();

    // if all information is provided
    if (username && password) {
        const response = await fetch("/api/users/login", {
            method: "post",
            body: JSON.stringify({
                username,
                password
            }),
            headers: { "Content-Type": "application/json" }
         });
         if (response.ok) {
             document.location.replace("/dashboard/");
         } else {
             alert(response.statusText);
         }
    }
}


async function signupForm(event) {
    event.preventDefault();

    // grabbing the data from the form
    const username = document.querySelector("#username-signup").value.trim();
    const password = document.querySelector("#password-signup").value.trim();

    // if all information is provided
    if (username && password) {
        const response = await fetch("/api/users", {
            method: "post",
            body: JSON.stringify({
                username,
                password
            }),
            headers: { "Content-Type": "application/json" }
         });
         if (response.ok) {
             document.location.replace("/dashboard/");
         } else {
             alert(response.statusText);
         }
    }
}

document.querySelector(".login-form").addEventListener("submit", loginForm);

document.querySelector(".signup-form").addEventListener("submit", signupForm);
