import cn from "classnames";
import React from 'react';
import { useSpringCarousel } from 'react-spring-carousel';
import ArrowLeft from "components/Icons/ArrowLeft";
import ArrowRight from "components/Icons/ArrowRight";
import styles from "./Carousel.module.scss";

type CarouselProps = {
  images: string[]
}

export default function Carousel({ images }: CarouselProps) {
  const { carouselFragment, slideToPrevItem, slideToNextItem } = useSpringCarousel({
    withLoop: true,
    items: images.map((image, i) => {
      return {
        id: `item - ${i}`,
        renderItem: (<img src={image} className={styles.carouselImg} />)
      }
    })
  })
  return (
    <div className={cn(styles.carousel)}>
      <ArrowLeft onClick={slideToPrevItem} className={cn(styles.carouselButtonPrev, styles.carouselButton)} />
      {carouselFragment}
      <ArrowRight onClick={slideToNextItem} className={cn(styles.carouselButtonNext, styles.carouselButton)} />
    </div>
  )
}
