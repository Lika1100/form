import cn from "classnames";
import { toJS } from 'mobx'
import { observer } from 'mobx-react-lite'
import React, { useEffect } from 'react'
import Text from 'components/Text';
import rootStore from 'store/RootStore/instance';
import styles from "./UserPage.module.scss";
import DeliveryIcon from "components/Icons/Delivery";
import ReceiptsIcon from "components/Icons/ReceiptsIcon";

function UserPage() {
    useEffect(() => {
        rootStore.user.authUser()
    }, [rootStore.user])

    const { name, avatar, role, email } = rootStore.user.user

    return (
        <>
            <Text view='title' className={styles.userText}>Profile</Text>
            <div className={styles.user}>
                <div className={styles.userAccount}>
                    <img src={avatar} className={styles.userAvatar} />
                    <div>
                        <Text view='title'>Name: {name}</Text>
                        <Text view='p-20'>E-mail: {email}</Text>
                    </div>
                </div>
                <div className={cn(styles.userAccount, styles.userAccountDelivery)}>
                    <DeliveryIcon />
                    <div>
                        <Text view='title'>Delivery</Text>
                        <Text view='p-20'>
                            The nearest delivery: not expected
                        </Text>
                    </div>
                </div>
                <div className={cn(styles.userAccount, styles.userAccountReceipts)}>
                    <ReceiptsIcon color="secondary" />
                    <div>
                        <Text view='title'>Electronic receipts</Text>
                        <Text view='p-20'>
                            The nearest delivery: not expected
                        </Text>
                    </div>
                </div>
            </div>
        </>


    )
}

export default observer(UserPage)