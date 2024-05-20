import cn from 'classnames';
import { observer } from 'mobx-react-lite';
import * as React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'components/Button';
import Input from 'components/Input';
import Loader from 'components/Loader';
import Text from 'components/Text';
import rootStore from 'store/RootStore/instance';
import styles from './Payment.module.scss';

function Payment() {
  const [cardNum, setCardNum] = useState('1111 2222 3333 4444');
  const [cardMonth, setCardMonth] = useState('01');
  const [cardYear, setCardYear] = useState('25');
  const [cardCvc, setCardCvc] = useState('123');
  const [isLoading, setIsLoading] = useState(false);
  const [alertMessage, setAlertMessage] = useState({
    text: '',
    show: 'hidden'
  });

  const navigate = useNavigate();

  const total = rootStore.cart.getSum();
  const isAuth = rootStore.user.isAuthorized;

  function isValidDate(card: string, month: string, year: string, cvc: string) {
    const isValidCard = card.split(" ").join("").length === 16
    const isValidMonth = month.length === 2 && +month > 0 && +month <= 12
    const isValidYear = year.length === 2 && +year > 24 && +year <= 99
    const isValidCvc = cvc.length === 3 && typeof +cvc === 'number'

    if (isValidCard && isValidMonth && isValidYear && isValidCvc) {
      return true
    } else {
      return false
    }
  }

  function formattedCard() {
    setCardNum(() => cardNum.replace(/\W/gi, '').replace(/(.{4})/g, '$1 ').trim())
  }

  const isValid = isValidDate(cardNum, cardMonth, cardYear, cardCvc)

  function onPay() {
    setTimeout(() => {
      setIsLoading(false);
      setAlertMessage((prev) => {
        prev.show = 'show';
        prev.text = 'Your payment is success';
        return prev;
      });
    }, 3000);
    setIsLoading(true);
  }

  function onClick() {
    setAlertMessage(() => {
      return { ...alertMessage, show: 'hidden' };
    });
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
      <div className={cn(styles.wrapMessage, styles[alertMessage.show])}>
        <Text view="p-20" className={styles.wrapMessageText}>
          {alertMessage.text}
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
