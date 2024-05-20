import cn from 'classnames';
import { observer } from 'mobx-react-lite';
import * as React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'components/Button';
import Input from 'components/Input';
import Loader from 'components/Loader';
import Text from 'components/Text';
import isValidDate from 'configs/isValidDate';
import InputStore from 'store/InputStore/InputStore';
import rootStore from 'store/RootStore/instance';
import { useLocalStore } from 'utils/useLocalStore';
import styles from './Payment.module.scss';

function Payment() {
  const [cardNum, setCardNum] = useState('1111 2222 3333 4444');
  const [cardMonth, setCardMonth] = useState('01');
  const [cardYear, setCardYear] = useState('25');
  const [cardCvc, setCardCvc] = useState('123');
  const [isLoading, setIsLoading] = useState(false);
  const inputStore = useLocalStore(() => new InputStore())

  const navigate = useNavigate();

  const total = rootStore.cartStore.getSum();
  const isAuth = rootStore.userStore.isAuthorized;

  function formattedCard() {
    setCardNum(() => cardNum.replace(/\W/gi, '').replace(/(.{4})/g, '$1 ').trim())
  }

  const isValid = isValidDate(cardNum, cardMonth, cardYear, cardCvc)
  const message = 'Your payment is success'
  function onPay() {
    setTimeout(() => {
      setIsLoading(false);
      inputStore._isError = true
    }, 3000);
    setIsLoading(true)
  }

  function onClick() {
    inputStore._isError = false
    navigate('/');
  }
  
  if (isLoading) {
    return (
      <div className={styles.paymentLoader}>
        <Text>Please, wait. We check your payment</Text>
        <Loader size="l" />
      </div>
    );
  }
  
  return (
    <div className={styles.wrap}>
      <div className={cn(styles.wrapMessage, inputStore.isError ? styles.show : "")}>
        <Text view="p-20" className={styles.wrapMessageText}>
          {message}
        </Text>
        <Button className={styles.wrapMessageButton} onClick={onClick}>
          OK
        </Button>
      </div>
      <form onSubmit={(e) => e.preventDefault()} className={styles.payment}>
        {!isAuth && <Text view="p-20">Please log in to continue the payment</Text>}
        <div className={styles.paymentData}>
          <div className={styles.paymentNum}>
            <Input 
              placeholder="1111 2222 3333 4444" 
              value={cardNum} 
              onChange={setCardNum} 
              onBlur={() => formattedCard()}/>
          </div>
          <div className={styles.paymentMonth}>
            <Input placeholder="MM" value={cardMonth} onChange={setCardMonth} />
          </div>
          <div>
            <Input className={styles.paymentYear} placeholder="YY" value={cardYear} onChange={setCardYear} />
          </div>
          <div className={styles.paymentCvc}>
            <Input placeholder="CVC" value={cardCvc} onChange={setCardCvc} />
          </div>
        </div>
        <Button className={styles.paymentButton} disabled={!isAuth || !isValid || total === 0} onClick={onPay}>
          Pay {total === 0 ? '' : `${total}$`}
        </Button>
      </form>
    </div>
  );
}

export default observer(Payment);
