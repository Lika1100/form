import { action, computed, makeObservable, observable, runInAction } from "mobx"
import { BASE_URL, API_ENDPOINTS } from "configs/baseUrl"
import ApiStore from "store/ApiStore"
import { CategoryModel } from "store/models/products"
import { Meta } from "utils/meta"
import { ILocalStore } from "utils/useLocalStore"


type PrivateFields = "_meta" | "_list" 

export default class CategoryStore implements ILocalStore {
    private _apiStore = new ApiStore()
    _list: CategoryModel[] = []
    private _meta: Meta = Meta.initial
    constructor() {
        makeObservable<CategoryStore, PrivateFields>(this, {
            _list: observable,
            _meta: observable,
            list: computed,
            meta: computed,
            getList: action,
        })
    }

    get list() {
        return this._list
    }

    get meta(): Meta {
        return this._meta
    }
    

    async getList() {
        this._list = []
        this._meta = Meta.loading
        const {data, status} = await this._apiStore.get<CategoryModel[]>(`${BASE_URL}${API_ENDPOINTS.CATEGORIES}`)

        runInAction(() => {
            if (status === 200) {
                this._meta = Meta.success
                this._list = data
                return 
            }

            this._meta = Meta.error
        })

        return data
        
    }

    destroy(): void {
        this._apiStore.destroy()
    }
}