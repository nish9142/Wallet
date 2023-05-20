# Wallet Transaction System

This project is a wallet transaction system,where you can create wallets and perform transactions like credit and debit operations.

The core technology stack used in this project is:
- Frontend: React (with Material UI for styling)
- Backend: Node.js with Express
- Database: MongoDB (using Mongoose as an Object Document Mapper)

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.


### Installing

1. Clone the repository to your local machine.
```bash
git clone  https://github.com/nish9142/Wallet.git
```
2. Navigate into the project directory.
```bash
cd Wallet
```
3. Install the dependencies.
```bash
npm install
```
4. Navigate into frontend project directory.
```bash
cd ../frontend
```
5. Install the dependencies.
```bash
npm install
```
6. Navigate into the project directory.
```bash
cd ..
```
7. Start the development server.
```bash
npm start
```
The application should now be running at `http://localhost:8080`.

## Features

- Wallet creation: You can create wallets which will hold your balance.
- Transaction: You can perform credit or debit operations on a specific wallet.
- View transactions: View all transactions made on a specific wallet.

## Usage

1. **Create a Wallet:** Navigate to the 'Create Wallet' page from the navigation menu, enter the wallet name and click on 'Create Wallet'.
2. **Perform Transactions:** Navigate to a specific wallet, enter the amount and description for the transaction, select the transaction type (credit or debit), and click on 'Create Transaction'.
3. **View Transactions:** Click on the 'All Transactions' link on a wallet page to view all transactions performed on the wallet. Transactions can be sorted by date or amount.
