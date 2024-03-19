import { animalsArray } from "./model.js"

const controller = {
    add: (body) => {

        try {
            body = JSON.parse(body)
            body["id"] = animalsArray.length
            animalsArray.push(body)
            return { 'status': 'added animal', "animal": animalsArray }
        } catch (err) {
            return { "status": "error" }
        }
    },
    delete: (id) => {

        try {
            animalsArray = animalsArray.filter((el) => {
                if (el.id != id) {
                    return el
                }
            })
            return { 'status': 'deleted animal', "animal": animalsArray }
        } catch (err) {
            return { "status": "error" }
        }
    },
    update: (id, body) => {

        try {
            body = JSON.parse(body)

            animalsArray = animalsArray.map((el) => {
                if (el.id != id) {

                    return el
                } else {
                    // body["id"] = animalsArray.length
                    return body
                }
            })
            return { 'status': 'updated animals', "animal": animalsArray }
        } catch (err) {
            return { "status": "error" }
        }

    },
    getall: () => {
        try {

            return { 'status': 'got animals', "animal": animalsArray }
        } catch (err) {
            return { "status": "error" }
        }
    }

}
export default controller