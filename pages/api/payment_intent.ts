import Stripe from 'stripe'
import type { NextApiRequest, NextApiResponse } from 'next'

const stripe = new Stripe(process.env.NEXT_PUBLIC_SECRET_KEY!, {
    apiVersion: '2022-08-01',
})

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === 'POST') {
        try {
            const { amount } = req.body

            const paymentIntent = await stripe.paymentIntents.create({
                amount,
                currency: 'pln',
                payment_method_types: ['blik'],
            })

            res.status(200).send({ client_secret: paymentIntent.client_secret })
        } catch (err) {
            // res.status(500).json({ statusCode: 500, message: err.message })
            console.log(err)
        }
    } else {
        res.setHeader('Allow', 'POST')
        res.status(405).end('Method Not Allowed')
    }
}
