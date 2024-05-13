export interface UserApi {
    id: number,
    email: string,
    password: string,
    name: string,
    role: string,
    avatar: string,
}

export interface UserModel {
    id: number,
    email: string,
    password: string,
    name: string,
    role: string,
    avatar: string,
}

export const normalizeUser = (from: UserApi): UserApi => ({
    id: from.id,
    email: from.email,
    password: from.password,
    name: from.name,
    role: from.role,
    avatar: from.avatar,
})