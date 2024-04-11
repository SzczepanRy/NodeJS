import { tags } from "../model.js";

export default class TagController {
    constructor() {
        this.currentTags = [...tags];
        this.currentTagsFormated = this._makeFormated(tags);
    }

    _findId(id) {
        let tagArr = this.currentTagsFormated.filter((tag) => {
            if (tag.id == id) {
                return tag;
            }
        });
        if (tagArr.length == 1) {
            return { foundId: true, item: tagArr[0] };
        } else {
            return { foundId: false, item: "no item with id " + id };
        }
    }

    _findName(name) {
        let tagArr = this.currentTagsFormated.filter((tag) => {
            if (tag.name == name) {
                return tag;
            }
        });
        if (tagArr.length == 1 && tagArr.length <= 2) {
            return { foundName: true, item: "item with name alraedy exissts " };
        } else {
            return { foundName: false, item: "item with sutch a name does not exists" };
        }
    }
    _makeFormated(arr) {
        let result = arr.map((el, i) => {
            return { id: i, name: el, popularity: Math.round(Math.random() * 300) };
        });
        return result;
    }
    getAllRaw() {
        return { message: "succes", value: this.currentTags };
    }

    getAllFormated() {
        return { message: "succes", value: this.currentTagsFormated };
    }

    getSingle(id) {
        let { foundId, item } = this._findId(id);

        if (foundId) {
            return { message: "succes", value: item };
        } else {
            return { message: "did not find id ", value: null };
        }
    }

    addSingle(data) {
        // {
        //     "name":"#nowytag",
        //     "popularity": 1000000
        //   }

        let { foundName, item } = this._findName(data.name);
        if (!foundName) {
            this.currentTags = [...this.currentTags, data.name];
            this.currentTagsFormated = [...this.currentTagsFormated, { id: this.currentTagsFormated.length + 1, data }];
            // console.log(this.currentPhotos);
            return { message: "added sucessfuly", value: null };
        } else {
            return { message: "item with the name exisits ", value: item };
        }
    }

    // updateSingle(id, data) {
    //   //zakładam że tylko id w body req

    //   let { foundId, item } = this._findId(id);
    //   if (!foundId) {
    //     return { message: "item with the id does not exisitst ", value: nil };
    //   } else {
    //     item = item.history.append(data);
    //     return { message: "added sucessfuly", value: item };
    //   }
    // }
}
