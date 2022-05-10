function signupForm(event) {
    event.preventDefault();

    // grabbing the data from the form
    const username = document.querySelector("#username-signup").value.trim();
    const email = document.querySelector("#email-signup").value.trim();
    const password = document.querySelector("#password-signup").value.trim();

    // if all information is provided
    if (username && email && password) {
        fetch("/api/users", {
            method: "post",
            body: JSON.stringify({
                username,
                email,
                password
            }),
            headers: { "Content-Type": "application/json" }
         }).then((response) => {console.log(response)})
    }
}

document.querySelector(".signup-form").addEventListener("submit", signupForm);