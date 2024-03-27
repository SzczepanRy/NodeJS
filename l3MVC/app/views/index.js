class JsEvents {
    constructor() {}

    init() {
        this.addListiner();
        this.addFiveListiner();
        this.deleteListiner();
        this.updateListiner();
    }

    parseAnimals(obj) {
        let deleteSel = document.querySelector(".delete");
        deleteSel.innerHTML = "";
        let animals = obj.animal;
        console.log(animals);
        for (let el of animals) {
            let idSel = document.createElement("option");
            idSel.value = el.id;
            idSel.innerText = el.id;

            deleteSel.append(idSel);
        }
    }

    getKind() {
        const kindSel = document.querySelector(".kind");
        return kindSel.value;
    }
    getColor() {
        const colorSel = document.querySelector(".color");
        return colorSel.value;
    }
    getId() {
        const idSel = document.querySelector(".delete");
        return idSel.value;
    }

    addListiner() {
        const addBtn = document.querySelector(".add");
        addBtn.addEventListener("click", async () => {
            let kind = this.getKind();
            let color = this.getColor();

            let res = await this.fetchMe("add", { kind, color });

            // console.log(res);
            this.parseAnimals(res);
            window.alert(JSON.stringify(res, null, 5));
        });
    }
    addFiveListiner() {
        const addBtn = document.querySelector(".addFive");
        addBtn.addEventListener("click", async () => {
            let kind = this.getKind();
            let color = this.getColor();
            let res;
            for (let i = 0; i < 5; i++) {
                res = await this.fetchMe("add", { kind, color });
            }
            this.parseAnimals(res);

            // console.log(res);
            window.alert(JSON.stringify(res, null, 5));
        });
    }
    deleteListiner() {
        const Btn = document.querySelector(".deleteSelected");
        Btn.addEventListener("click", async () => {
            let id = this.getId();

            let res = await this.fetchMe("delete/" + id, {});

            this.parseAnimals(res);

            // console.log(res);
            window.alert(JSON.stringify(res, null, 5));
        });
    }
    updateListiner() {
        const Btn = document.querySelector(".updateSelected");
        Btn.addEventListener("click", async () => {
            let id = this.getId();
            let kind = this.getKind();
            let color = this.getColor();
            let res = await this.fetchMe("update/" + id, { kind, color });

            this.parseAnimals(res);

            // console.log(res);
            window.alert(JSON.stringify(res, null, 5));
        });
    }

    async fetchMe(url, body) {
        let res = await fetch(`http://localhost:3000/${url}`, {
            method: "post",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        });
        let strData = await res.text();
        return JSON.parse(strData);
    }
}

window.addEventListener("load", () => {
    const events = new JsEvents();
    events.init();
});
