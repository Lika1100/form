import cn from "classnames";
import * as React from "react";
import styles from "./DotsLoader.module.scss";

export default function DotsLoader() {
  return (
    <div className={styles.dots}>
        <div className={cn(styles.dotsDot, styles.dotsDot1)}></div>
        <div className={cn(styles.dotsDot, styles.dotsDot2)}></div>
        <div className={cn(styles.dotsDot, styles.dotsDot3)}></div>
    </div>
  )
}
