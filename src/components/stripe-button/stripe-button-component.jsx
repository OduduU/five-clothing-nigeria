import React from 'react'
import StripeCheckout from 'react-stripe-checkout'

import './stripe-button.stles.scss'

const StripeCheckoutButton = ({price}) => {
    const priceForStripe = price * 100;
    const publishableKey = "pk_test_PmN7dN9HwijMPrUVsgRnVE9u006ShS1dUp";

    const onToken = token => {
        console.log('token :', token);
        alert('Payment Successful')
    }

    return (
        <StripeCheckout
            label='Pay Now'
            name="FIVE CLOTHING Ng"
            billingAddress
            shippingAddress
            image='https://svgshare.com/i/CUz.svg'
            description={`Your total is $${price}`}
            amount={priceForStripe}
            panelLabel='Pay Now'
            token={onToken}
            stripeKey={publishableKey}
        />
    )
}

export default StripeCheckoutButton;