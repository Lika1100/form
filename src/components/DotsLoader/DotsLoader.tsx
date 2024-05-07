import cn from "classnames";
import styles from "./DotsLoader.module.scss";
import * as React from "react";

export default function DotsLoader() {
  return (
    <div className={styles.dots}>
        <div className={cn(styles.dots__dot, styles.dots__dot_1)}></div>
        <div className={cn(styles.dots__dot, styles.dots__dot_2)}></div>
        <div className={cn(styles.dots__dot, styles.dots__dot_3)}></div>
    </div>
  )
}
