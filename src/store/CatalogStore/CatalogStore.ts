import { IReactionDisposer, action, computed, makeObservable, observable, reaction, runInAction } from "mobx";
import { API_ENDPOINTS, BASE_URL } from "configs/baseUrl";
import limit from "configs/limit";
import getItems from "store/ApiStore/ApiStore";
import { QueryParam } from "store/RootStore/QueryParamsStore";
import rootStore from "store/RootStore/instance";
import { ProductModel } from "store/models/products";
import { Meta } from "utils/meta";
import { ILocalStore } from "utils/useLocalStore";

type PrivateFields = "_meta" | "_list" | "_params" | "_all"

export default class CatalogStore implements ILocalStore {
    private _apiStore = getItems
    _list: ProductModel[] = []
    private _meta: Meta = Meta.initial
    _params: string = ""
    private _title: QueryParam = rootStore.query.getParam("title")
    private _categoryId: QueryParam = rootStore.query.getParam("categoryId")
    private _page: QueryParam = rootStore.query.getParam("page")
    private _fullList: ProductModel[] = rootStore.fullList.fullList
    _all: ProductModel[] = []
    _limit: number = limit

    constructor() {
        makeObservable<CatalogStore, PrivateFields>(this, {
            _list: observable.ref,
            _meta: observable,
            _params: observable,
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


    async getList() {
        this._list = []
        this._meta = Meta.loading

        const pageParams = rootStore.query.getParam("page")
        const page = pageParams === undefined ? "1" : pageParams
        const titleParams = rootStore.query.getParam("title") === undefined ? "" : rootStore.query.getParam("title")
        const id = rootStore.query.getParam("categoryId") === undefined ? "" : rootStore.query.getParam("categoryId")
        this._params = `?offset=${this._limit * +page - this._limit}&limit=${this._limit}&title=${titleParams}&categoryId=${id}`

        const { data, status } = await this._apiStore<ProductModel[]>(`${BASE_URL}${API_ENDPOINTS.PRODUCTS}${this._params}`)

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
        (title) => {
            this._title = title
        }
    );

    private readonly _qpReactionCategoryId: IReactionDisposer = reaction(
        () => rootStore.query.getParam('categoryId'),
        (categoryId) => {
            this._categoryId = categoryId
        }
    );

    private readonly _qpReactionPage: IReactionDisposer = reaction(
        () => rootStore.query.getParam('page'),
        (page) => {
            this._page = page
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