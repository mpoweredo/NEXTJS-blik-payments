import type { NextPage } from 'next'
import PaymentForm from '../components/PaymentForm'
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_PUBLISHABLE_KEY!)

const Home: NextPage = () => {
    return (
        <div className="h-screen w-full flex flex-col items-center justify-center sm:p-2 md:p-24 gap-8">
            <h1 className="bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 text-transparent bg-clip-text font-bold text-5xl">
                Give me some money...
            </h1>
            <Elements stripe={stripePromise}>
                <PaymentForm />
            </Elements>
        </div>
    )
}

export default Home
