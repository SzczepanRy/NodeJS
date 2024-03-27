class Animal {
    constructor(name, color) {
        this.name = name;
        this.color = color;
    }

    // inne potrzebne funkcje
}

let animalsArray = [];

export const deleteAnimal = (id) => {
    try {
        animalsArray = animalsArray.filter((el) => {
            if (el.id != id) {
                return el;
            }
        });
        return { status: "deleted animal", animal: animalsArray };
    } catch (err) {
        return { status: "error : " + err };
    }
};
export const updateAnimal = (id, body) => {
    try {
        body = JSON.parse(body);

        animalsArray = animalsArray.map((el) => {
            if (el.id != id) {
                return el;
            } else {
                // body["id"] = animalsArray.length
                body["id"] = id;
                return body;
            }
        });
        return { status: "updated animals", animal: animalsArray };
    } catch (err) {
        return { status: "error : " + err };
    }
};

export { Animal, animalsArray };
