import { animalsArray, deleteAnimal, updateAnimal } from "./model.js";

const controller = {
    add: (body) => {
        try {
            body = JSON.parse(body);
            body["id"] = animalsArray.length;
            animalsArray.push(body);
            return { status: "added animal", animal: animalsArray };
        } catch (err) {
            return { status: "error : " + err };
        }
    },
    delete: (id) => {
        try {
            deleteAnimal(id);
            return { status: "deleted animal", animal: animalsArray };
        } catch (err) {
            return { status: "error : " + err };
        }
    },
    update: (id, body) => {
        try {
            updateAnimal(id, body);
            return { status: "updated animals", animal: animalsArray };
        } catch (err) {
            return { status: "error : " + err };
        }
    },
    getall: () => {
        try {
            return { status: "got animals", animal: animalsArray };
        } catch (err) {
            return { status: "error : " + err };
        }
    },
};
export default controller;
