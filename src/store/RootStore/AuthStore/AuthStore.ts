import { makeAutoObservable, runInAction } from "mobx";
import auth from "store/ApiStore/AuthApi";
import loginApi from "store/ApiStore/LoginApi";
import { UserModel, normalizeUser } from "store/models/user/userModel";
import { Meta } from "utils/meta";

type PrivateFields = "_user" | "_meta" | "_token" | "_authStatus" | "_loginData";

export enum statusAuth {
    unknown = "unknown",
    auth = "auth",
    noAuth = "noAuth"
}

export default class CartStore {
    private _user: UserModel = {
        id: 0,
        email: "",
        password: "",
        name: "",
        role: "",
        avatar: "",
    }
    private _apiLogin = loginApi
    private _apiAuth = auth
    private _loginData = {
        email: "",
        password: ""
    }
    private _meta: Meta = Meta.initial
    private _token: string = ""
    private _authStatus: statusAuth = statusAuth.unknown

    constructor() {
        makeAutoObservable<CartStore, PrivateFields>(this)
    }

    get user() {
        return this._user
    }

    get authStatus() {
        return this._authStatus
    }

    get meta() {
        return this._meta
    }

    get isAuthorized(): boolean {
        return this._authStatus === statusAuth.auth;
    }

    async login(email: string, password: string) {
        this._meta = Meta.loading

        try {
            this._loginData = { email, password }
            const { data } = await this._apiLogin(email, password)
            this._token = data.access_token
            await this.authUser()
            this._meta = Meta.success
        } catch (err) {
            this._meta = Meta.error;
        }
    }

    async authUser() {
        try {
            const { status, data } = await this._apiAuth(this._token)
            runInAction(() => {
                if (status === 200) {
                    this._user = normalizeUser({ ...data })
                    this._authStatus = statusAuth.auth
                }
            })
        } catch (error) {
            this._authStatus = statusAuth.noAuth
        }
    }


    destroy() { }
}