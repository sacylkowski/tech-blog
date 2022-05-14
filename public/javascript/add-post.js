async function newForm(event) {
    event.preventDefault();

    // grabbing post-title and post-url from the form
    const title = document.querySelector("input[name='post-title']").value;
    const post_url = document.querySelector("input[name='post-url']").value;

    const response = await fetch(`/api/posts`, {
        method: "POST",
        body: JSON.stringify({
            title,
            post_url
        }),
        headers: { "Content-Type": "application/json" }
    });
    if (response.ok) {
        document.location.replace("/dashboard");
    } else {
        alert(response.statusText);
    }
}

document.querySelector(".new-post-form").addEventListener("submit", newForm);