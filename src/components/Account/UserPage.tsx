import cn from "classnames";
import { observer } from 'mobx-react-lite'
import React, { useEffect } from 'react'
import DeliveryIcon from "components/Icons/Delivery";
import ReceiptsIcon from "components/Icons/ReceiptsIcon";
import Text from 'components/Text';
import rootStore from 'store/RootStore/instance';
import styles from "./UserPage.module.scss";
import DiscountIcon from "components/Icons/Discount";
import NewsIcon from "components/Icons/NewsIcon";

function UserPage() {
    useEffect(() => {
        rootStore.user.authUser()
    }, [])

    const { name, avatar, role, email } = rootStore.user.user

    return (
        <>
            <div className={styles.user}>
                <div className={cn(styles.userAccount, styles.userAccountInfo)}>
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
                    <ReceiptsIcon />
                    <div>
                        <Text view='title'>Electronic receipts</Text>
                        <Text view='p-20'>
                            The nearest delivery: not expected
                        </Text>
                    </div>
                </div>
                <div className={cn(styles.userAccount, styles.userAccountDiscount)}>
                    <DiscountIcon />
                    <div>
                        <Text view='title'>Discount for you</Text>
                        <Text view='p-20'>
                            Get a discount on your first order
                        </Text>
                    </div>
                </div>
                <div className={cn(styles.userAccount, styles.userAccountNews)}>
                    <NewsIcon color="secondary" />
                    <div>
                        <Text view='title'>NEWS</Text>
                        <Text view='p-20'>
                            Don't miss the new collection of clothes in a week
                        </Text>
                    </div>
                </div>
            </div>
        </>


    )
}

export default observer(UserPage)