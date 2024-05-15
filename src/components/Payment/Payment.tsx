import * as React from 'react';
import { useState } from 'react';
import Button from 'components/Button';
import Input from 'components/Input';
import Text from 'components/Text';
import { statusAuth } from 'store/RootStore/AuthStore/AuthStore';
import rootStore from 'store/RootStore/instance';
import styles from "./Payment.module.scss";


export default function Payment() {
    const [cardNum, setCardNum] = useState("")
    const [cardMonth, setCardMonth] = useState("")
    const [cardYear, setCardYear] = useState("")
    const [cardCvc, setCardCvc] = useState("")

    const total = rootStore.cart.cart
        .map(({ price, count }) => price !== null ? price * count : 0)
        .reduce((acc, prev) => acc + prev, 0)

    const isAuth = rootStore.user.authStatus === statusAuth.auth
    return (
        <div className={styles.wrap}>
            <form
                onSubmit={(e) => e.preventDefault()}
                className={styles.payment}
            >
                {!isAuth && (
                    <Text view='p-20'>Please log in to continue the payment</Text>
                )}
                <div className={styles.paymentData}>
                    <div className={styles.paymentNum}>
                        <Input
                            placeholder='Card number'
                            value={cardNum}
                            onChange={setCardNum} />
                    </div>
                    <div className={styles.paymentMonth}>
                        <Input
                            placeholder='MM'
                            value={cardMonth}
                            onChange={setCardMonth}
                        />
                    </div>
                    <div>
                        <Input
                            className={styles.paymentYear}
                            placeholder='YY'
                            value={cardYear}
                            onChange={setCardYear}
                        />
                    </div>
                    <div className={styles.paymentCvc}>

                        <Input
                            placeholder='CVC'
                            value={cardCvc}
                            onChange={setCardCvc}
                        />
                    </div>
                </div>
                <Button className={styles.paymentButton} disabled={!isAuth}>Оплатить {total === 0 ? "" : `${total}$`}</Button>
            </form>
        </div>
    )
}
