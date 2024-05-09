import cn from "classnames";
import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.svg";
import user from "../../assets/user.svg";
import cart from "../../assets/cart.svg";
import styles from "./Header.module.scss";
import * as React from "react";

export default function Header() {
    const [isOpen, setIsOpen] = useState(false)
    const onClick = () => {
        setIsOpen(prev => !prev)
    }

    return (
        <>
            <header className={styles.header}>
                <Link to="/">
                    <img src={logo} className={styles.headerLogo}/>
                </Link>
                    <button 
                      className={styles.headerBurgerImg}
                      onClick={onClick}
                    />
                <nav 
                    className={cn(styles.headerItems, 
                                  styles.headerBurger,
                                  {[styles.headerBurgerOpen]: isOpen})}
                >
                        <button 
                          onClick={() => setIsOpen(false)}
                          className={styles.headerCloseImg}
                        />
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
                          to="#" 
                          className={styles.headerItem} 
                          onClick={() => setIsOpen(false)}>
                            About us
                        </Link>
                </nav>
                <nav className={styles.headerIcons}>
                    <Link to="/cart">
                        <img src={cart} className={styles.headerIconCart}/>
                    </Link>
                    <Link to="#">
                        <img src={user} className={styles.headerIconUser}/>
                    </Link>
                </nav>
            </header>
        </>
    )
}
