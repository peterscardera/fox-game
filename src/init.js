const CLOCK_RATE = 4000;

function tick() {
  console.log("tick", Date.now);
}

async function init() {
  console.log("starting game");

  let nextTimeToTick = Date.now();

  function nextAnimationFrame() {
    const now = Date.now();

    if (nextTimeToTick <= now) {
      tick();
      nextTimeToTick = now + CLOCK_RATE;
    }
    requestAnimationFrame(nextAnimationFrame);
  }
  //not interupting stuff as requestAnimationFrame happens often
  requestAnimationFrame(nextAnimationFrame);
}
init();
