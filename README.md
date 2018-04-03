# Marvel Test

## Prerequisites

Node^7.+
Npm / Yarn

## Getting Started

clone & cd into this repo <br/>
In your Terminal `yarn install / npm install` <br/>
Then run `yarn start / npm start`<br/>
Finally, browse `localhost:3000`<br/>


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

As Marvel allows only 3 000 calls/month, even with a cookie or localstorage, we can't have more than 3k users.<br/>
To fix that, we could save once the data in our own database and update it every day with a cron job. <br/>
Though, this is not really a real life example as you are not supposed to work with a call limit that low.

### Other changes





