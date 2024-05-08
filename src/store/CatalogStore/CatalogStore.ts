import { ProductApi } from './../models/products/productsItem';
import { IReactionDisposer, action, computed, makeObservable, observable, reaction, runInAction } from "mobx";
import { BASE_URL } from "configs/baseUrl";
import { QueryParam } from "store/RootStore/QueryParamsStore";
import rootStore from "store/RootStore/instance";
import { ProductModel, normalizeProduct } from "store/models/products";
import { Meta } from "utils/meta";
import { ILocalStore } from "utils/useLocalStore";
import getItems from "store/ApiStore/ApiStore";

type PrivateFields = "_meta" | "_list" | "_params" | "_search" | "_select" | "_pageParam"

export default class CatalogStore implements ILocalStore {
    private _apiStore = getItems
    _list: ProductModel[] = []
    private _meta: Meta = Meta.initial
    _params: string = ""
    private _search: QueryParam = rootStore.query.getParam("title")
    private _select: QueryParam = rootStore.query.getParam("categoryId")
    private _pageParam: QueryParam = rootStore.query.getParam("page")

    constructor() {
        makeObservable<CatalogStore, PrivateFields>(this, {
            _list: observable,
            _meta: observable,
            _params: observable,
            _search: observable,
            _select: observable,
            _pageParam: observable,
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
    

    async getList(endPoint: string, params: string) {
        this._params = params
        this._list = []
        this._meta = Meta.loading
        const {data, status} = await this._apiStore<ProductModel[]>(`${BASE_URL}${endPoint}${this._params}`)

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

    
    private readonly _qpReactionTitle: IReactionDisposer = reaction(
        () => rootStore.query.getParam('title'),
        (search) => {
          this._search = search
        }
    );

    private readonly _qpReactionCategoryId: IReactionDisposer = reaction(
        () => rootStore.query.getParam('categoryId'),
        (select) => {
          this._select = select
        }
    );

    private readonly _qpReactionPage: IReactionDisposer = reaction(
        () => rootStore.query.getParam('page'),
        (pageParam) => {
          this._pageParam = pageParam
        }
    );

    destroy(): void {
        this._qpReactionTitle()
        this._qpReactionCategoryId()
        this._qpReactionPage()
    }
}