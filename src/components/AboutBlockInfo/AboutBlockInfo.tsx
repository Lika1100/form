import * as React from 'react';
import { animated, config, useSpring } from 'react-spring';
import Text from 'components/Text';
import styles from "./AboutBlockInfo.module.scss"

export default function AboutBlockInfo() {
  const [{ background }] = useSpring(
    () => ({
      from: { background: "#ff615d" },
      to: [
        { background: '#bad5ea' },
        { background: '#fd8769' },
        { background: '#356d94' },
        { background: '#ffdcb3' },
        { background: '#477672' },
      ],
      config: config.molasses,
      loop: {
        reverse: true,
      },
    }),
    []
  )

  return (
    <div className={styles.container}>
      <div className={styles.containerSquares}>
        <div className={styles.containerSquaresBlock}>
          <Text view='p-20' className={styles.containerSquaresBlockText}>
            Lorem ipsum odor amet, consectetuer adipiscing elit. Primis eros nunc fringilla id rutrum nibh.
            Orci convallis pulvinar urna fusce at purus neque nam leo?
          </Text>
        </div>
        <div className={styles.containerSquaresBlock} />
        <div className={styles.containerSquaresBlock}>
          <Text view='title' className={styles.containerSquaresBlockText}>
            Augue malesuada massa torquent diam tortor; porttitor dis massa. Habitasse nunc ad placerat;
            ante netus gravida a porttitor. Ridiculus proin etiam justo vivamus.
          </Text>
        </div>
        <animated.div className={styles.containerSquaresBlock} style={{ background }} >
          <Text view='title' className={styles.containerSquaresBlockText}>
            Ridiculus proin etiam justo dignissim suscipit maecenas.
          </Text>
        </animated.div>
      </div>
      <animated.div className={styles.containerBackground} style={{ background }} />
    </div>
  )
}
