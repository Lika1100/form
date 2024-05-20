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

export default isValidDate;