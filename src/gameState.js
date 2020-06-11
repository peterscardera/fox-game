const gameState = {
  current: "INIT",
  clock: 1,
  tick() {
    this.clock++;
    console.log("clock", this.clock);
  },
  //when someone clicks
  handleUserAction(icon) {
    console.log(icon);
  },
};

export default gameState;
