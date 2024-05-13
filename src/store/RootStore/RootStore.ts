import AuthStore from "./AuthStore";
import CartStore from "./CartStore";
import ListStore from "./ListStore";
import QueryParamsStore from "./QueryParamsStore";

export default class RootStore {
  readonly query = new QueryParamsStore();
  readonly fullList = new ListStore();
  readonly cart = new CartStore();
  readonly user = new AuthStore();
}