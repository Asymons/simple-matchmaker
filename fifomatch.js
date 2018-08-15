const queue = [];

addPlayer = (id, notify) => {
  queue.push(id);
  while(queue.length >= 2){
      const matchedPlayers = [queue.shift(), queue.shift()];
      notify(matchedPlayers);
  }
};

module.exports = {
    addPlayer,
};