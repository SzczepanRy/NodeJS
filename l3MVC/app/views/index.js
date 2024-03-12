class JsEvents {

    constructor() {

    }

    init() {

    }


    getKind() {
        const kindSel = document.querySelector(".kind")
        return kindSel.value
    }

    addListiner() {
        const addBtn = document.querySelector('.add')
        addBtn.addEventListener("click", () => {

            //this.getKind
            //handle add
        })
    }


    async fetchMe(url, body) {
        let res = await fetch(`http://localhost:3000/${url}`, {
            method: "post",
            headers: {
                "Content-Type": 'application/json'

            },
            body: JSON.stringify(body)
        })
        let strData = res.text()
        return JSON.stringify(strData)
    }

}



window.addEventListener("load", () => {

    const events = new JsEvents()
    events.init()
})