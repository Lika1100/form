import { action, computed, makeObservable, observable, runInAction } from "mobx";
import { BASE_URL } from "configs/baseUrl";
import { ProductModel } from "store/models/products";
import { Meta } from "utils/meta";
import { ILocalStore } from "utils/useLocalStore";
import getItems from "store/ApiStore/ApiStore";

type PrivateFields = "_item" | "_meta"

export default class ItemStore implements ILocalStore {
    private _apiStore = getItems
    private _item: ProductModel = {
        id: 0,
        images: [],
        title: "",
        price: 0,
        description: "",
        category: {
            id: 0,
            name: "",
            image: "",
            creationAt: new Date(),
            updatedAt: new Date()
        }
    }
    private _meta: Meta = Meta.initial

    get item(): ProductModel {
        return this._item
    }

    get meta(): Meta {
        return this._meta
    }

    async getItem(endpoint: string, id: string) {
        this._meta = Meta.loading

        const {data, status} = await this._apiStore<ProductModel>(`${BASE_URL}${endpoint}${id}`)

        runInAction(() => {
            if (status === 200) {
                this._meta = Meta.success
                this._item = Object.assign(data, {})
                return
            }

            this._meta = Meta.error
        })
    }

    constructor() {
        makeObservable<ItemStore, PrivateFields>(this, {
            _item: observable,
            _meta: observable,
            item: computed,
            meta: computed,
            getItem: action,
        })
    }

   

    destroy(): void {}
}