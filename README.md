# Marvel Test

## Prerequisites

Node^7.+
Npm or Yarn

## Getting Started

Open your terminal in your local working directory and run :<br/>
`git clone https://github.com/hpierre74/basic-marvel-react.git && cd basic-marvel-react` <br /> 
Install dependencies <br/>
 `yarn install` or `npm install` <br/>
Start development server <br/>
 `yarn start` or ` npm start`<br/>
In your browser, go to : <br/>
 `localhost:3000`<br/>


## Features

### List of Marvel Characters

#### Character Detail
You can see details from a specific character clicking on its listed representation.

#### Pick your favorite characters
You can easily add and remove your favorite characters clicking on the star icon.

## Improvements

### SEO and load performance

Using SSR (Razzle, React SSR) to improve app performances.

### Performance -> API calls

Set localstorage or cookie lasting 24h with express to reduce API calls to 1 call per user per day ( recommended by marvel api ).

### Solving API calls limit problem

As Marvel allows only 3k calls/day, even with a cookie or localstorage, we couldn't have more than 3k users daily.<br/>
To fix this problem, we could save once the data in the database and update it every day with a cron job or automate api key changes<br/>
Though, this is not a perfect real life example as you shouldn't work with those restrictions.










