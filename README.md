# NEXTJS-blik-payments

Simple example of blik payments using stripe.

Live: https://nextjs-blik-payments-k7ed.vercel.app/

### Usage

Enter price higher than 3 pln and random blik code and click pay!
This is simulatiion of blik payment using stripe.
If You wanna make this working and start earning money on this you have to enter "**live**" keys.

## Installation

1. Create stripe accont and get API keys https://stripe.com/
2. Clone the repo
   ```sh
   git clone https://github.com/mpoweredo/NEXTJS-blik-payments.git
   ```
3. Install NPM packages
   ```sh
   npm install
   ```
4. Enter your stripe live/test api keys in `.env` file
   ```
   NEXT_PUBLIC_PUBLISHABLE_KEY=<Your secret key>
   NEXT_PUBLIC_SECRET_KEY=<Your secret key>
   ...
   ```
