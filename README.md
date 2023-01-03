# Simple Planning Poker

## Development Dependencies

- Node.js v18

## Environment Variables

Create a `.env.local` file in the project root and set the following values.

```
REACT_APP_SUPABASE_URL=<Your Supabase Project URL>
REACT_APP_SUPABASE_ANON_KEY=<Your Supabase anon API key>
```

## Available Scripts

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Supabase CLI

### login to supabase

`npx supabase login`

### link project

`npx supabase link --project-ref <Project reference ID>`

### migrate db

`npx supabase db push`

### generate types

`npx supabase gen types typescript --linked > generated-schema.ts`

### create a function

`npx supabase functions new <function name>`

### deploy a function

`npx supabase functions deploy <function name>`

### set environment variables for functions

`npx supabase secrets set NAME1=VALUE1 NAME2=VALUE2`
