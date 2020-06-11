import { modFox, modScene } from "./ui";
import {
  RAIN_CHANCE,
  SCENES,
  DAY_LENGTH,
  NIGHT_LENGTH,
  getNextDieTime,
  getNextHungerTime,
} from "./constants";

const gameState = {
  current: "INIT",
  clock: 1,
  wakeTime: -1,
  sleepTime: -1,
  hungryTime: -1,
  dieTime: -1,

  tick() {
    this.clock++;
    console.log("clock", this.clock);
    if (this.clock === this.wakeTime) {
      this.wake();
    } else if (this.clock === this.sleepTime) {
      this.sleep();
    } else if (this.clock === this.hungryTime) {
      this.getHungry();
    } else if (this.clock === this.dieTime) {
      this.die();
    }
  },
  startGame() {
    console.log("hatch");
    this.current = "HATCHING";
    this.wakeTime = this.clock + 3;
    modFox("egg");
    modScene("day");
  },
  wake() {
    console.log("i woke up");
    this.current = "IDLING";
    this.wakeTime = -1;
    modFox("idling");
    //day = 0 rain = 1
    this.scene = Math.random() > RAIN_CHANCE ? 0 : 1;
    modScene(SCENES[this.scene]);
    this.sleepTime = this.clock + DAY_LENGTH;
    this.hungryTime = getNextHungerTime(this.clock);
  },
  sleep() {
    console.log("SLEEPING");
    modFox("sleep");
    modScene("night");
    this.wakeTime = this.scene + NIGHT_LENGTH;
  },
  getHungry() {
    this.current = "HUNGRY";
    this.dieTime = getNextDieTime(this.clock);
    this.hungryTime = -1;
    modFox("hungry");
  },
  //when someone clicks
  handleUserAction(icon) {
    // console.log(icon);
    if (
      ["SLEEP", "FEEDING", "CELEBRATING", "HATCHING"].includes(this.current)
    ) {
      // dont do anything
      return;
    }

    if (this.current === "INIT" || this.current === "DEAD") {
      this.startGame();
      return;
    }
    switch (icon) {
      case "weather":
        this.changeWeather();
        break;
      case "poop":
        this.cleanUpPoop();
        break;
      case "fish":
        this.feed();
        break;
    }
  },
  changeWeather() {
    console.log("changing weather");
  },
  cleanUpPoop() {
    console.log("clean poop");
  },
  feed() {
    console.log("feeed");
  },
  die() {
    console.log("dead");
  },
};

//BECAUSE THIS IS DYNAMMICALLY SCOPED (WHERE IT IS CALLED) the function is beeing called in buttons.js
//no matter where its called
export const handleUserAction = gameState.handleUserAction.bind(gameState);
export default gameState;
