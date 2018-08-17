# Simple Matchmaker

## Features
- FIFO Matchmaking

## How to use

#### Install (via npm)
```bash
npm i --save simple-matchmaker
```
#### Quick Example
## FIFO Match
```js
const matchmaker = require('simple-matchmaker');

const notify = (result) => { 
  console.log(result);
};

matchmaker.fifomatch.addPlayer('Alessio',notify);
matchmaker.fifomatch.addPlayer('John',notify);
// notify is called at this point
...
```
## Elo Based Match
```js
const matchmaker = require('simple-matchmaker');

const notify = (result) => {
  console.log(result);
};
// Set notify you want to use.
matchmaker.elomatch.setNotify(notify);
// Begins the interval to check player matches
matchmaker.elomatch.startMatchMaking();

// Object must contain "elo" represented as a number
matchmaker.elomatch.addPlayer({elo: 1000, name: 'Alessio'});
matchmaker.elomatch.addPlayer({elo: 1100, name: 'John'});
// notify will be called a few seconds later
...
```

####

## Documentation

# FIFO Match
- `addPlayer(object, notify)` takes in an object to store in a queue as the first argument. In the second argument, notify will be fired when the list reaches capacity of two or more elements and first objects put into the queue are removed until the size is less than 2.

# Elo Based Match
Note: `notify` is automatically called once a match is found.

- `addPlayer(object)` takes in an object to store in a queue as the first argument. Object must contain "elo" property which is a number.
- `setNotify(notify)` sets the notify function to be used.
- `setRequiredEloDistance(newRequiredEloDistance)` sets the threshold where a match is considered where newRequiredEloDistance is a number. Default is 1000.
- `setRequiredDefaultTimeWeight(newRequiredDefaultTimeWeight)` sets the weight of time when computing a match where newRequiredDefaultTimeWeight should be a number resembling a decimal percentage. Default is 0.15.
- `setDefaultRefreshRate(newDefaultRefreshRate)` sets the default refresh rate of the interval when checking for matches between players and newDefaultRefreshRate should be a number. Default is 1000ms.
- `clearMatchMaking()` sets the player queue to an empty array.
- `stopMatchMaking()` calls clearInterval on the running match making interval.
- `startMatchMaking()` calls startInterval(notify, defaultRefreshRate).
- `stopAndClearMatchMaking()` calls stopMatchMaking() then clearMatchMaking().