import * as React from "react";
import { useSearchParams } from "react-router-dom";
import rootStore from "store/RootStore/instance";
import styles from "./Search.module.scss";

const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const [value, setValue] = React.useState(searchParams.get("title"))
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
    searchParams.set("title", e.target.value)
  }
  const onSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault()
    
    if (value?.length === 0) {
      searchParams.delete("title")
    }
    searchParams.delete("page")
    setSearchParams(searchParams)
    rootStore.query.setSearch(searchParams.toString())
  }
  return (
    <form
      onSubmit={onSubmit}
      className={styles.form}
    >
      <input
        type="text"
        placeholder="Search property"
        value={value === null ? "" : value}
        onChange={handleChange}
        className={styles.form__inputText}
      />
      <input
        type="submit"
        name="submit"
        className={styles.form__inputSubmit}
      />
    </form>
  );
};

export default Search;
