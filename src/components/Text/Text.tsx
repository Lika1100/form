import cn from "classnames";
import * as React from 'react';
import styles from "./Text.module.scss";


export type TextProps = {
    className?: string;
    view?: 'title' | 'button' | 'p-20' | 'p-18' | 'p-16' | 'p-14';
    tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'div' | 'p' | 'span';
    weight?: 'normal' | 'medium' | 'bold';
    children: React.ReactNode;
    color?: 'primary' | 'secondary' | 'accent';
    maxLines?: number;
};

const Text: React.FC<TextProps> = ({ view, tag = "p", weight, children, color = "inherit", maxLines, className }) => {
    const Tag = tag
    return (
        <>
            <Tag className={view && cn(styles.text, styles[`text_${view}`], className)}
                style={{
                    fontWeight: weight,
                    color: `$text-${color}`,
                    WebkitLineClamp: maxLines,
                }}>
                {children}
            </Tag >
        </>
    )
}

export default Text;