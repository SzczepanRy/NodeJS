import photos from "../model.js";

export default class JsonController {
    constructor() {
        this.currentPhotos = [...photos]
    }


    _findId(id) {
        let photoArr = this.currentPhotos.filter((photo) => {
            if (photo.id == id) {
                return photo
            }
        })
        if (photoArr.length == 1) {
            return true, photoArr[0]
        } else {
            return false, null

        }
    }

    getAll() {
        return { message: "succes", value: this.currentPhotos }
    }

    getSingle(id) {
        let foundId, item = this._findId(id)
        if (foundId) {
            return { message: "succes", value: item }
        } else {
            return { message: "did not find id ", value: item }

        }
    }

    deleteSingle(id) {
        let foundId, item = this._findId(id)
        if (!foundId) {
            return { message: "did not find id ", value: item }
        } else {
            this.currentPhotos = this.currentPhotos.filter((photo) => {
                if (photo.id != id) {
                    return photo
                }
            })
            return { message: "deleted sucessfuly", value: null }
        }
    }
    addSingle(data) {
        let foundId, item = this._findId(data.id)

        if (!foundId) {
            this.currentPhotos = [...this.currentPhotos, data]
            return { message: "added sucessfuly", value: null }
        } else {
            return { message: "item with the id exisits ", value: item }

        }

    }


    uddateSingle(id) {

        //zakładam że tylko id w body req

        let foundId, item = this._findId(id)


        if (!foundId) {
            item = item.history.append(data)
            return { message: "item with the id exisits ", value: item }
        } else {
            this.currentPhotos = [...this.currentPhotos, data]
            return { message: "added sucessfuly", value: null }

        }
    }



}