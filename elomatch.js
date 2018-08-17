let queue = [];
// After 6 seconds, an elo with a difference of 100 will match.
let defaultTimeWeight = 0.15;
let defaultEloDistance = 1000;
let defaultRefreshRate = 1000;

let notify = (match) => {};

let matchInterval;

/*
Sets the notify parameter for the player match.
    @notify - Any function to be called with parameter to pass through the match
No return.
 */
function setNotify(newNotify){
    notify = newNotify;
}

/*
Sets the elo distance to be matched.
    @defaultEloDistance - Any number
No return.
 */
function setRequiredEloDistance(newDefaultEloDistance){
    defaultEloDistance = newDefaultEloDistance;
}

/*
Sets the default time weight to be matched.
    @defaultTimeWeight - Any number
No return.
 */
function setRequiredDefaultTimeWeight(newDefaultTimeWeight){
    defaultTimeWeight = newDefaultTimeWeight;
}

/*
Sets the default refresh weight to be matched.
    @defaultTimeWeight - Any number
No return.
 */
function setDefaultRefreshRate(newDefaultRefreshRate){
    clearInterval(matchInterval);
    defaultRefreshRate = newDefaultRefreshRate;
    matchInterval = setInterval(matchPlayers, defaultRefreshRate);
}

/*
Clears the match making queue.
No return.
 */
function clearMatchMaking(){
    queue = [];
}

/*
Stops the interval and matchmaking process. Saves all the data.
No return
 */
function stopMatchMaking(){
    clearInterval(matchInterval);
}

/*
Stops the interval and matchmaking process and clears the match making queue.
 */
function stopAndClearMatchMaking(){
    stopMatchMaking();
    clearMatchMaking();
}

/*
Starts the interval and matchmaking process.
 */
function startMatchMaking(){
    matchInterval = setInterval(matchPlayers, defaultRefreshRate);
}

/*
Computes the elo distance between two objects based off their timestamp and elo. Priority is given to the user with
the longer wait time.
    @user - Requires an object with properties "elo" which is a number and "timestamp" which is a number.
    @target - Requires an object with properties "elo" which is a number and "timestamp" which is a number.
    @timeWeight - Is default to defaultTimeWeight(0.15) but acts as a percentage. This is optional.
Returns the computed eloDistance which is a number.
 */
function getEloDistance(user, target){
    const timeStamp = Date.now();
    const userWait = timeStamp - user.timestamp;
    const targetWait = timeStamp - target.timestamp;
    return Math.abs(user.player.elo - target.player.elo) + Math.max(userWait,targetWait) * defaultTimeWeight;
}

/*
Adds player to the queue.
    @player - Requires an object with property "elo" which is a number.
Returns nothing.
 */
function addPlayer(player){
    queue.push({
        player,
        timestamp: Date.now(),
    });
}

/*
Matches players in an O(n^2) solution. Optimize later.
Calls notify.
Returns nothing.
 */
function matchPlayers() {
    if(queue.length < 2) return;
    let matched = {};
    for(let i = 0; i<queue.length; ++i){
        for(let j = 0; j<queue.length; ++j){
            if(i !== j){
                const eloDistance = getEloDistance(queue[i], queue[j]);
                if(eloDistance >= defaultEloDistance && !matched.hasOwnProperty(i) && !matched.hasOwnProperty(j)){
                    matched[i] = {
                        index: i,
                        notified: false,
                        matchedWithIndex: j,
                    };
                    matched[j] = {
                        index: j,
                        notified: false,
                        matchedWithIndex: i,
                    };
                    break;
                }
            }
        }
    }
    for(let player in matched){
        if(matched[player].hasOwnProperty("notified") &&
            matched[player].hasOwnProperty("index") &&
            matched[player].hasOwnProperty("matchedWithIndex") &&
            !matched[player].notified){
            matched[player].notified = true;
            matched[matched[player].matchedWithIndex].notified = true;
            notify([queue[matched[player].index].player, queue[matched[player].matchedWithIndex].player]);
        }
    }

    queue = queue.filter((value, index) => {
       return !matched.hasOwnProperty(index);
    });

}

module.exports = {
    addPlayer,
    setNotify,
    setRequiredEloDistance,
    setRequiredDefaultTimeWeight,
    setDefaultRefreshRate,
    clearMatchMaking,
    stopMatchMaking,
    startMatchMaking,
    stopAndClearMatchMaking,
};