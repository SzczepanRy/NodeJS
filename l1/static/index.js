const button = document.querySelector("#button")
button.addEventListener("click", () => {
    console.log("AAAA");
    if (document.body.style.backgroundColor == "white") {

        document.body.style.backgroundColor = "black"

    } else {
        document.body.style.backgroundColor = 'white'

    }

})