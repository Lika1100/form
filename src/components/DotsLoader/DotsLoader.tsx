import cn from "classnames";
import styles from "./DotsLoader.module.scss";
import * as React from "react";

export default function DotsLoader() {
  return (
    <div className={styles.dots}>
        <div className={cn(styles.dotsDot, styles.dotsDot1)}></div>
        <div className={cn(styles.dotsDot, styles.dotsDot2)}></div>
        <div className={cn(styles.dotsDot, styles.dotsDot3)}></div>
    </div>
  )
}
