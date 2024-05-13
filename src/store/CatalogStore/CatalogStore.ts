import { IReactionDisposer, action, computed, makeObservable, observable, reaction, runInAction } from "mobx";
import { BASE_URL } from "configs/baseUrl";
import getItems from "store/ApiStore/ApiStore";
import { QueryParam } from "store/RootStore/QueryParamsStore";
import rootStore from "store/RootStore/instance";
import { ProductModel } from "store/models/products";
import { Meta } from "utils/meta";
import { ILocalStore } from "utils/useLocalStore";

type PrivateFields = "_meta" | "_list" | "_params" | "_search" | "_select" | "_pageParam" | "_fullList" | "_all"

export default class CatalogStore implements ILocalStore {
    private _apiStore = getItems
    _list: ProductModel[] = []
    private _meta: Meta = Meta.initial
    _params: string = ""
    private _search: QueryParam = rootStore.query.getParam("title")
    private _select: QueryParam = rootStore.query.getParam("categoryId")
    private _pageParam: QueryParam = rootStore.query.getParam("page")
    private _fullList: ProductModel[] = rootStore.fullList.fullList
    _all: ProductModel[] = []


    constructor() {
        makeObservable<CatalogStore, PrivateFields>(this, {
            _list: observable.ref,
            _meta: observable,
            _params: observable,
            _search: observable,
            _select: observable,
            _pageParam: observable,
            _fullList: observable,
            _all: observable,
            all: computed,
            list: computed,
            meta: computed,
            getList: action
        })
    }


    get list() {
        return this._list
    }

    get meta(): Meta {
        return this._meta
    }

    get all(): ProductModel[] {
        return this._all
    }


    async getList(endpoint: string, params: string) {
        this._params = params
        this._list = []
        this._meta = Meta.loading
        const { data, status } = await this._apiStore<ProductModel[]>(`${BASE_URL}${endpoint}${this._params}`)

        runInAction(() => {
            if (status === 200) {
                this._list = data
                this._all = rootStore.fullList.getUniqList(this._list)
                this._meta = Meta.success
                return data
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

    private readonly _listReactionPage: IReactionDisposer = reaction(
        () => rootStore.fullList.fullList,
        (fullList) => {
            this._fullList = fullList
        }
    );

    destroy(): void {
        this._qpReactionTitle()
        this._qpReactionCategoryId()
        this._qpReactionPage()
        this._listReactionPage()
    }
}