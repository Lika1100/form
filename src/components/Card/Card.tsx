import cn from "classnames";
import { observer } from "mobx-react-lite";
import * as React from "react";
import Button from "components/Button";
import Text from "components/Text";
import useNavigatePages from "configs/useNavigatePages";
import { addProducts } from "utils/CartEvents/addProducts";
import img from "../../assets/imgSoon.jpg"
import styles from "./Card.module.scss";

export type CardProps = {
    id: number;
    title?: string;
    description?: string;
    images: string[];
    price?: number;
    className?: string
};

const Card: React.FC<CardProps> = ({ id, title, description, images, price, className }) => {
    const {goToProduct} = useNavigatePages()
    
    return (
        <div className={cn(className, styles.card)} key={id}>
            <img className={styles.card__image} 
              onClick={() => goToProduct(id)}
              src={images[0]} 
              alt="card" 
              onError={({currentTarget}) => currentTarget.src = img}
            />
            <div className={styles.card__titleContainer}>
                <Text view='p-20' maxLines={2} weight='bold' color='primary'>{title}</Text>
                <Text view='p-16' maxLines={3} color="secondary">{description}</Text>
                <div className={styles.card__footer}>
                    <Text view='p-18' weight='bold'>{`$${price}`}</Text>
                    <Button 
                      onClick={() => addProducts({id, price, title, images, count: 1})}
                      disabled={false} 
                      className={""}>
                        Add to Cart
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default observer(Card)
