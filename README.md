# Simple Matchmaker

## Features
- FIFO Matchmaking

## How to use

#### Install (via npm)
```bash
npm i --save simple-matchmaker
```
#### Quick Example
```js
const matchmaker = require('simple-matchmaker');

const notify = (result) => { 
  console.log(result);
};

matchmaker.addPlayer('Alessio',notify);
matchmaker.addPlayer('John',notify);
// notify is called at this point
...
```

####

## Coming Soon
- Elo based Matchmaking

## Documentation

- `addPlayer(object, notify)` takes in an object to store in a queue as the first argument. In the second argument, notify will be fired when the list reaches capacity of two or more elements and first objects put into the queue are removed until the size is less than 2.
