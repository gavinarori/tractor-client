import React from 'react'
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'

import axios from 'axios'
import { useState } from 'react'
import CheckoutForm from './CheckoutForm'
import { stripe_sky } from '../utils/config'

const stripePromise = loadStripe(stripe_sky)

const Stripe = ({ price, orderId }) => {
    const [clientSecret, setClientSecret] = useState('')
    const apperance = {
        theme: 'stripe'
    }
    const options = {
        apperance,
        clientSecret
    }
    const create_payment = async () => {
        try {
            const { data } = await axios.post('https://tractor-backend-xk1t.onrender.com/api/order/create-payment', { price }, { withCredentials: true })
            setClientSecret(data.clientSecret)
        } catch (error) {
            console.log(error.response.data)
        }
    }
    return (
        <div className='mt-4'>
            {
                clientSecret ? (
                    <Elements options={options} stripe={stripePromise}>
                        <CheckoutForm orderId={orderId} />
                    </Elements>
                ) : <button onClick={create_payment} className='px-10 py-[6px] rounded-lg hover:shadow-orange-500/20 hover:shadow-lg bg-black text-white'>Start Payment</button>
            }
        </div>
    )
}

export default Stripe