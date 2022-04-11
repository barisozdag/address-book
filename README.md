# Address Book

## Install

Clone the repo and install dependencies:

```bash
git clone https://github.com/barisozdag/address-book.git address-book
cd address-book
npm install
cd backend
npm install
cd frontend
npm install

```

## Starting Development

Start the app in the `dev` environment:

- Start your mongodb instance
- Create `.env` file in `backend` directory with `MONGODB` variable

```
MONGODB=mongodb://127.0.0.1:27017/addressbook
```
- Run npm script

```bash
npm run dev
```

## Building for Production

To build app:

```bash
npm run build
```

## Running in Production

Start the app in the `production` environment:

```bash
npm run start
```
