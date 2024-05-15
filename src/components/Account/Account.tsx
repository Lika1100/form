import cn from "classnames";
import { observer } from 'mobx-react-lite';
import React, { useState } from 'react';
import Button from 'components/Button';
import Input from 'components/Input';
import Loader from 'components/Loader';
import Text from 'components/Text';
import isValidEmail from 'configs/isValidEmail';
import isValidPassword from 'configs/isValidPassword';
import { statusAuth } from 'store/RootStore/AuthStore/AuthStore';
import rootStore from 'store/RootStore/instance';
import { Meta } from 'utils/meta';
import UserPage from './UserPage';
import styles from "./Account.module.scss"

function Account() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [alertMessage, setAlertMessage] = useState({
        text: "",
        show: "hidden"
    })


    if (rootStore.user.meta === Meta.loading) {
        <Loader size='l' />
    }

    const onClick = () => {
        setAlertMessage((prev) => {
            prev.show = "show"
            return {
                ...prev
            }
        })

        if (!isValidEmail(email) && !isValidPassword(password)) {
            setAlertMessage((prev) => {
                prev.text = "Please, check your e-mail and password"
                return {
                    ...prev
                }
            })
        } else if (!isValidEmail(email)) {
            setAlertMessage((prev) => {
                prev.text = "Please, check your e-mail"
                return {
                    ...prev
                }
            })
        } else if (!isValidPassword(password)) {
            setAlertMessage((prev) => {
                prev.text = "Please, check your password"
                return {
                    ...prev,
                }
            })
        } else if (isValidEmail(email) && isValidPassword(password) && rootStore.user.authStatus === statusAuth.auth) {
            setAlertMessage((prev) => {
                prev.show = "hidden"
                return {
                    ...prev
                }
            })
        } else {
            setAlertMessage((prev) => {
                prev.show = "show"
                prev.text = "Something wrong, not authorized, please try again"
                return {
                    ...prev
                }
            })
        }

        rootStore.user.login(email, password)

    }

    return (
        <>
            {rootStore.user.authStatus === statusAuth.unknown && (
                <div className={styles.account}>
                    <div className={cn(styles.accountMessage, styles[alertMessage.show])}>
                        <Text view="p-20" className={styles.accountMessageText}>
                            {alertMessage.text}
                        </Text>
                        <Button
                            className={styles.accountMessageButton}
                            onClick={() => setAlertMessage(() => {
                                return { ...alertMessage, show: "hidden" }
                            })}
                        >
                            OK
                        </Button>
                    </div>
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
                            value={email.trim()}
                            onChange={setEmail}
                            className={!isValidEmail(email) && email.length > 0 ? styles.accountInput : ""}
                        />
                        <Input
                            type='password'
                            placeholder='Password'
                            value={password.trim()}
                            onChange={setPassword}
                            className={!isValidPassword(password) && password.length > 0 ? styles.accountInput : ""}
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
