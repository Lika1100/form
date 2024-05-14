import cn from "classnames";
import * as React from "react";
import Button from "components/Button";
import Carousel from "components/Carousel";
import Text from "components/Text";
import isImgUrl from "configs/isImgUrl";
import useNavigatePages from "configs/useNavigatePages";
//import { addProducts } from "utils/CartEvents/addProducts";
import rootStore from "store/RootStore/instance";
import { CategoryModel } from "store/models/products";
import img from "../../assets/imgSoon.jpg"
import styles from "./Card.module.scss";

export type CardProps = {
    id: number;
    title: string;
    description: string;
    images: string[];
    price: number;
    className?: string,
    category: CategoryModel,
    view?: "horizontal" | "vertical"
};

const Card: React.FC<CardProps> = ({ id, title, description, images, price, className, category, view = "vertical" }) => {
    const { goToProduct, goToPayment } = useNavigatePages()
    const imgUrl = images[0]
    const isUrl = isImgUrl(imgUrl)

    return (
        <div className={cn(className, styles.card, styles[`${view}`])} key={id}>
            {view === "vertical" && <img className={styles.cardImage}
                onClick={() => goToProduct(id)}
                src={isUrl ? imgUrl : img}
                alt="card"
            />}
            {view === "horizontal" && (
                <Carousel images={isUrl ? images : [img]} />
            )}
            <div className={styles.cardTitleContainer}>
                <Text view={view === "vertical" ? 'p-20' : "title"} maxLines={2} weight='bold' color='primary'>{title}</Text>
                <Text view='p-16' maxLines={3} color="secondary">{description}</Text>
                <div className={styles.cardFooter}>
                    <Text view={view === "vertical" ? 'p-18' : "title"} weight='bold' className={styles.cardPrice}>{`$${price}`}</Text>
                    <div className={styles.cardButtons}>
                        {view === "horizontal" && (
                            <Button view="white" onClick={goToPayment}>Buy Now</Button>
                        )}
                        <Button
                            onClick={() => rootStore.cart.addProduct({ id, price, title, images, count: 1, description, category })}
                        >
                            Add to Cart
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Card
