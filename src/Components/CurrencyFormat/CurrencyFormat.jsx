import React from 'react'
import numeral from 'numeral'
import { amET } from '@mui/material/locale'

const CurrencyFormat = ({ amount })=> {
    const FormatedAmount = numeral(amount).format("$0,0.00")

    return (
        <div>
      {FormatedAmount}
        </div>
    )
}

export default CurrencyFormat
