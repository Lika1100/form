
import rootStore from "store/RootStore/instance";

export type indexRemoveProps = {
    id: number;
    title: string;
    image: string;
    price: number;
    count?: number;
    update: <T = any>(value: T, key?: any) => Promise<any>,
    getAll: <T = any>() => Promise<T[]>,
    getByID: <T = any>(id: string | number) => Promise<T>
};

function removeFromCart({ title, price, image, id, getByID, update, getAll }: indexRemoveProps) {
    getByID(id).then((res) => {
        update({ id, price, title, image, count: res.count - 1 })
        getAll().then((res) => {
            rootStore.cart.upDateCart(res)
        })
    })
}

export default removeFromCart