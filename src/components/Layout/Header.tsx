import cn from "classnames";
import { useState } from "react";
import { Link } from "react-router-dom";
import burger from "../../assets/burger.svg";
import close from "../../assets/close.svg";
import styles from "./Header.module.scss";
import * as React from "react";

export default function Header() {
    const [isOpen, setIsOpen] = useState(false)
    const onClick = () => {
        setIsOpen(prev => !prev)
    }
    return (
        <>
            <header className={cn(styles.header)}>
                <Link to="/">
                    <svg className={styles.header__logo}>
                        <use xlinkHref="/sprite.svg#logo" />
                    </svg>
                    
                </Link>
                    <img 
                      onClick={onClick}
                      src={burger} 
                      className={styles.header__burgerImg}
                    />
                <nav className={cn(styles.header__items, styles.header__burger,{[styles.header__burger_open]: isOpen})}>
                        <img 
                          onClick={() => setIsOpen(false)}
                          src={close} 
                          className={styles.header__closeImg}
                        />
                        <Link to="/" 
                          className={styles.header__item} 
                          onClick={() => setIsOpen(false)}>
                            Products
                        </Link>
                        <Link 
                          to="/categories"  
                          className={styles.header__item} 
                          onClick={() => setIsOpen(false)}>
                            Categories
                        </Link>
                        <Link 
                          to="#" 
                          className={styles.header__item} 
                          onClick={() => setIsOpen(false)}>
                            About us
                        </Link>
                </nav>
                <nav className={styles.header__icons}>
                    <Link to="/cart">
                        <svg className={styles.header__iconCart}>
                            <use xlinkHref="/sprite.svg#cart" />
                        </svg>
                    </Link>
                    <Link to="#">
                        <svg className={styles.header__iconUser}>
                            <use xlinkHref="/sprite.svg#user" />
                        </svg>
                    </Link>

                </nav>
            </header>
        </>
    )
}
