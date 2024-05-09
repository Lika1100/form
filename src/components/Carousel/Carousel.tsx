import React from 'react';
import { useSpringCarousel } from 'react-spring-carousel';
import styles from "./Carousel.module.scss";
import cn from "classnames";

type CarouselProps = {
    images: string[],
    className?: string
}

export default function Carousel({images, className}: CarouselProps) {

  console.log(images, images.length)

  const { carouselFragment, slideToPrevItem, slideToNextItem} = useSpringCarousel({
    withLoop: true,
    items: images.map((image, i) => {
      return {
                id: `item - ${i}`,
                renderItem: (<img src={image} className={className}/>)
              }
    })
  })
  return (
    <div className={cn(styles.carousel)}>
        <button onClick={slideToPrevItem} className={cn(styles.carouselButtonPrev, styles.carouselButton)}/>
            <div>{carouselFragment}</div>
        <button onClick={slideToNextItem} className={cn(styles.carouselButtonNext, styles.carouselButton)}/>
    </div>
  )
}
