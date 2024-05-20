import cn from 'classnames';
import { observer, useLocalStore } from 'mobx-react-lite';
import React, { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'components/Button';
import Input from 'components/Input';
import Loader from 'components/Loader';
import Text from 'components/Text';
import isValidEmail from 'configs/isValidEmail';
import isValidPassword from 'configs/isValidPassword';
import InputStore from 'store/InputStore/InputStore';
import rootStore from 'store/RootStore/instance';
import { Meta } from 'utils/meta';
import styles from './Login.module.scss';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const inputStore = useLocalStore(() => new InputStore())
  
  const navigate = useNavigate();

  if (rootStore.userStore.meta === Meta.loading) {
    <Loader size="l" />;
  }
  const errorMessage = inputStore.getMessage(email, password);

  const onClick = useCallback(async () => {
    await rootStore.userStore.login(email, password);
    if (errorMessage.length > 0) {
      inputStore._isError = true
    } else {
      inputStore._isError = false
    }
  }, [email, inputStore, errorMessage.length, password]);

  if (rootStore.userStore.isAuthorized) {
    navigate('/user');
  }

  return (
    <div className={styles.account}>
      <div className={cn(styles.accountMessage, inputStore.isError ? styles.show : "")}>
        <Text view="p-20" className={styles.accountMessageText}>
          {errorMessage}
        </Text>
        <Button
          className={styles.accountMessageButton}
          onClick={() => inputStore._isError = false}
        >
          OK
        </Button>
      </div>
      <Text view="title">Login</Text>
      <Text color="secondary">Valid e-mail: john@mail.com or admin@mail.com</Text>
      <Text color="secondary">Valid password: changeme or admin123</Text>
      <form onSubmit={(e) => e.preventDefault()} className={styles.accountForm}>
        <Input
          placeholder="E-mail"
          value={email.trim()}
          onChange={setEmail}
          className={!isValidEmail(email) ? styles.accountInput : ''}
        />
        <Input
          type="password"
          placeholder="Password"
          value={password.trim()}
          onChange={setPassword}
          className={!isValidPassword(password) ? styles.accountInput : ''}
        />
        <Button onClick={onClick} className={styles.accountButton}>
          Отправить
        </Button>
      </form>
    </div>
  );
}

export default observer(Login);
