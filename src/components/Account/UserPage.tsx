import cn from "classnames";
import * as React from 'react'
import DeliveryIcon from "components/Icons/Delivery";
import DiscountIcon from "components/Icons/Discount";
import NewsIcon from "components/Icons/NewsIcon";
import ReceiptsIcon from "components/Icons/ReceiptsIcon";
import Text from 'components/Text';
import rootStore from 'store/RootStore/instance';
import styles from "./UserPage.module.scss";

function UserPage() {
    return (
        <div className={styles.user}>
            <div className={cn(styles.userAccount, styles.userAccountInfo)}>
                <img src={rootStore.user.user.avatar} className={styles.userAvatar} />
                <div>
                    <Text view='title'>Name: {rootStore.user.user.name}</Text>
                    <Text view='p-20'>E-mail: {rootStore.user.user.email}</Text>
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
                        Do not miss the new collection of clothes in a week
                    </Text>
                </div>
            </div>
        </div>
    )
}

export default UserPage