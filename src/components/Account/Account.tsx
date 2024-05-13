import axios from 'axios'
import { action, toJS } from 'mobx';
import { observer } from 'mobx-react-lite';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'components/Button';
import Input from 'components/Input';
import Loader from 'components/Loader';
import Text from 'components/Text';
import useNavigatePages from 'configs/useNavigatePages';
import { statusAuth } from 'store/RootStore/AuthStore/AuthStore';
import rootStore from 'store/RootStore/instance';
import { Meta } from 'utils/meta';
import UserPage from './UserPage';
import styles from "./Account.module.scss"

function Account() {
    const { goToUserPage } = useNavigatePages()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")


    if (rootStore.user.meta === Meta.loading) {
        <Loader size='l' />
    }


    const onClick = () => {
        rootStore.user.login(email, password)
    }

    return (
        <>
            {rootStore.user.authStatus === statusAuth.unknown && (
                <div className={styles.account}>
                    <Text view="title">Login</Text>
                    <Text color='secondary'>
                        Valid e-mail: john@mail.com or admin@mail.com
                    </Text>
                    <Text color='secondary'>
                        Valid password: changeme or admin123
                    </Text>
                    <form
                        onSubmit={(e) => e.preventDefault()}
                        className={styles.accountForm}
                    >
                        <Input
                            placeholder='E-mail'
                            value={email}
                            onChange={setEmail}
                        />
                        <Input
                            placeholder='Password'
                            value={password}
                            onChange={setPassword}
                        />
                        <Button
                            onClick={onClick}
                            className={styles.accountButton}
                        >
                            Отправить
                        </Button>
                    </form>
                </div>
            )}
            {rootStore.user.authStatus === statusAuth.auth && (
                <UserPage />
            )}
        </>
    )
}

export default observer(Account)
