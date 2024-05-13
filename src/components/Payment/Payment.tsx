import React, { useState } from 'react'

export default function Payment() {
    const [cardInfo, setCardInfo] = useState({
        cardNum: "",
        month: "",
        year: "",
        cvc: ""
    })


    return (
        <form onSubmit={(e) => e.preventDefault()}>
            <input type='text' placeholder='4111 1111 1111 1111' value={cardInfo.cardNum} onChange={(e) => setCardInfo(prev => {
                return {
                    ...prev,
                    cardNum: e.target.value
                }
            })} />
            <input type='text' placeholder='MM' value={cardInfo.month} onChange={(e) => setCardInfo(prev => {
                return {
                    ...prev,
                    month: e.target.value
                }
            })} />
            <input type='text' placeholder='YY' value={cardInfo.year} onChange={(e) => setCardInfo(prev => {
                return {
                    ...prev,
                    year: e.target.value
                }
            })} />
            <input type='text' placeholder='CVC' value={cardInfo.cvc} onChange={(e) => setCardInfo(prev => {
                return {
                    ...prev,
                    cvc: e.target.value
                }
            })} />
            <button>Отправить</button>
        </form>
    )
}
