import cn from "classnames";
import { observer } from "mobx-react-lite";
import { useState } from "react";
import * as React from "react";
import { Link } from "react-router-dom";
import BurgerIcon from "components/Icons/Burger";
import CartIcon from "components/Icons/CartIcon";
import CloseIcon from "components/Icons/CloseIcon";
import LogoIcon from "components/Icons/Logo";
import UserIcon from "components/Icons/UserIcon";
import rootStore from "store/RootStore/instance";
import styles from "./Header.module.scss";

function Header() {
    const [isOpen, setIsOpen] = useState(false);

    const onClick = () => {
        setIsOpen(prev => !prev)
    }

    const amountOfProducts = rootStore.cart.cart
        .map(({ count }) => count)
        .reduce((a, b) => a + b, 0)

    return (
        <>
            <header className={styles.header}>
                <Link to="/">
                    <LogoIcon className={styles.headerLogo} />
                </Link>
                <BurgerIcon
                    className={styles.headerBurgerImg}
                    onClick={onClick}
                />
                <nav
                    className={cn(styles.headerItems,
                        styles.headerBurger,
                        { [styles.headerBurgerOpen]: isOpen })}
                >
                    <CloseIcon onClick={() => setIsOpen(false)} className={styles.headerCloseImg} />
                    <Link to="/"
                        className={styles.headerItem}
                        onClick={() => setIsOpen(false)}>
                        Products
                    </Link>
                    <Link
                        to="/categories"
                        className={styles.headerItem}
                        onClick={() => setIsOpen(false)}>
                        Categories
                    </Link>
                    <Link
                        to="/about"
                        className={styles.headerItem}
                        onClick={() => setIsOpen(false)}>
                        About us
                    </Link>
                </nav>
                <nav className={styles.headerIcons}>
                    <Link to="/cart" className={styles.headerCart}>
                        {amountOfProducts !== 0 && <div className={styles.headerIconNum}>{amountOfProducts}</div>}
                        <CartIcon className={styles.headerIconCart} />
                    </Link>
                    <Link to="/user">
                        <UserIcon className={styles.headerIconUser} />
                    </Link>
                </nav>
            </header>
        </>
    )
}

export default observer(Header)
