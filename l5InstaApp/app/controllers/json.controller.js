import { photos } from "../model.js";

export default class JsonController {
    constructor() {
        this.currentPhotos = [...photos];
    }

    _findId(id) {
        let photoArr = this.currentPhotos.filter((photo) => {
            if (photo.id == id) {
                return photo;
            }
        });
        if (photoArr.length == 1) {
            return { foundId: true, item: photoArr[0] };
        } else {
            return { foundId: false, item: "no item with id " + id };
        }
    }

    getAll() {
        return { message: "succes", value: this.currentPhotos };
    }

    getSingle(id) {
        let { foundId, item } = this._findId(id);

        if (foundId) {
            return { message: "succes", value: item };
        } else {
            return { message: "did not find id ", value: null };
        }
    }

    deleteSingle(id) {
        let { foundId, item } = this._findId(id);
        if (!foundId) {
            return { message: "did not find id ", value: null };
        } else {
            this.currentPhotos = this.currentPhotos.filter((photo) => {
                if (photo.id != id) {
                    return photo;
                }
            });
            return { message: "deleted sucessfuly", value: item };
        }
    }
    addSingle(data) {
        let { foundId, item } = this._findId(data.id);
        if (!foundId) {
            this.currentPhotos = [...this.currentPhotos, data];
            // console.log(this.currentPhotos);
            return { message: "added sucessfuly", value: null };
        } else {
            return { message: "item with the id exisits ", value: item };
        }
    }

    updateSingle(id, data) {
        //zakładam że tylko id w body req

        let { foundId, item } = this._findId(id);
        if (!foundId) {
            return { message: "item with the id does not exisitst ", value: nil };
        } else {
            console.log(item.history);
            item = item.history.push(data);
            return { message: "added sucessfuly", value: item };
        }
    }
}
