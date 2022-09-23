import OtpInput from 'react-otp-input'
import React, { useState } from 'react'
import { useStripe } from '@stripe/react-stripe-js'
import ErrorMessage from './ErrorMessage'

const containerStyle = {
    justifyContent: 'space-between'
}

const inputStyle = {
    width: '45px',
    height: '45px',
    background: '#262626',
    borderRadius: '.25rem',
    outline: 'none',
    color: 'white',
    fontSize: '1.5rem',
}

const focusStyle = {
    color: 'white',
    border: '#fb7185 1px solid',
}

const PaymentForm = () => {
    const [isProcessing, setIsProcessing] = useState(false)
    const [otp, setOtp] = useState('')
    const [error, setError] = useState<Error | null>(null)
    const [confirmPayment, setConfirmPayment] = useState(false)
    const [hasEnded, setHasEnded] = useState(false)
    const [money, setMoney] = useState<string>('')
    const stripe = useStripe()

    const otpHandler = (value: string) => setOtp(value)

    const moneyHandler = ({ target }: React.ChangeEvent<HTMLInputElement>) =>
        setMoney(target.value)

    const submitHanlder = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsProcessing(true)
        setConfirmPayment(false)
        setHasEnded(false)

        if (!stripe || +money < 3) return

        try {
            setError(null)
            const response = await fetch('/api/payment_intent', {
                method: 'POST',
                body: JSON.stringify({
                    amount: +money * 100,
                }),
                headers: {
                    'Content-Type': 'application/json',
                },
            })

            const { client_secret } = await response.json()

            setConfirmPayment(true)
            // @ts-ignore I dont why but there is an error with .confirmBlikPayment "Property 'confirmBlikPayment' does not exist on type 'Stripe'"
            const { paymentIntent, error } = await stripe.confirmBlikPayment(
                client_secret,
                {
                    payment_method: {
                        blik: {},
                        billing_details: {},
                    },
                    payment_method_options: {
                        blik: {
                            code: otp,
                        },
                    },
                }
            )

            console.log(paymentIntent)

            if (error || paymentIntent.status !== 'succeeded')
                throw new Error(error)
            setHasEnded(true)
        } catch (error) {
            if (error instanceof Error) setError(error)
        }
        setConfirmPayment(false)
        setIsProcessing(false)
    }

    return (
        <form
            onSubmit={submitHanlder}
            className="flex flex-col w-full max-w-[380px] justify-center align-center gap-5"
        >
            <div className="flex w-full relative">
                <input
                    min={'3'}
                    onChange={moneyHandler}
                    placeholder="Money (in pln)"
                    type="number"
                    className="outline-none p-2 bg-[#262626] text-white w-full"
                />
                <p className="absolute top-1/2 right-3 translate-y-[-45%] text-lg font-semibold text-green-400">
                    PLN
                </p>
            </div>
            <div>
                <p className="text-white font-semibold mb-2">Enter blik code</p>
                <OtpInput
                    value={otp}
                    onChange={otpHandler}
                    containerStyle={containerStyle}
                    numInputs={6}
                    isInputNum={true}
                    inputStyle={inputStyle}
                    focusStyle={focusStyle}
                    shouldAutoFocus={true}
                />
            </div>
            <button
                disabled={isProcessing}
                className="w-full h-auto self-center disabled:border-gray-400 border-rose-400 hover:border-rose-500 border rounded-lg py-3 px-6 text-white hover:text-orange-200 disabled:text-gray-500 disabled:cursor-not-allowed text-3xl duration-200 cursor-pointer"
            >
                Pay
            </button>
            {confirmPayment && (
                <p className="text-rose-400 bg-semibold text-lg">
                    Confirm payment in your mobile app
                </p>
            )}
            {hasEnded && (
                <p className="text-green-400 bg-semibold text-lg">
                    Thank you for your support!
                </p>
            )}
            {error && <ErrorMessage />}
        </form>
    )
}

export default PaymentForm
