import cn from "classnames";
import { observer } from 'mobx-react-lite';
import * as React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'components/Button';
import Input from 'components/Input';
import Loader from 'components/Loader';
import Text from 'components/Text';
import rootStore from 'store/RootStore/instance';
import styles from "./Payment.module.scss";

function Payment() {
    const [cardNum, setCardNum] = useState("")
    const [cardMonth, setCardMonth] = useState("")
    const [cardYear, setCardYear] = useState("")
    const [cardCvc, setCardCvc] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [alertMessage, setAlertMessage] = useState({
        text: "",
        show: "hidden"
    })
    const navigate = useNavigate()

    const total = rootStore.cart.cart
        .map(({ price, count }) => price !== null ? price * count : 0)
        .reduce((acc, prev) => acc + prev, 0)
    

    const isAuth = rootStore.user.isAuthorized

    function onPay() {
        setTimeout(() => {
            setIsLoading(false)
            setAlertMessage((prev) => {
                prev.show = "show"
                prev.text = "Your payment is success"
                return prev
            })            
        }, 3000)
        setIsLoading(true)
    }

    function onClick() {
        setAlertMessage(() => {
            return { ...alertMessage, show: "hidden" }
        })
        navigate("/")
    }
    if (isLoading) {
        return (
            <div className={styles.paymentLoader}>
                <Text>Please, wait. We check your payment</Text>
                <Loader size="l"/>
            </div>
        )
    }

    return (
        <div className={styles.wrap}>
            <div className={cn(styles.wrapMessage, styles[alertMessage.show])}>
                <Text view="p-20" className={styles.wrapMessageText}>
                    {alertMessage.text}
                </Text>
                <Button
                    className={styles.wrapMessageButton}
                    onClick={onClick}
                >
                    OK
                </Button>
            </div>
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
                <Button 
                  className={styles.paymentButton} 
                  disabled={!isAuth || alertMessage.show === "show" } onClick={onPay}>
                    Pay {total === 0 ? "" : `${total}$`}
                </Button>
            </form>
        </div>
    )
}

export default observer(Payment)
