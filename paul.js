let lastTwoPoints = [];

const W = 600;
// const W = document.documentElement.clientWidth;
const H = 600;
// const H = document.documentElement.clientHeight;

const MIN_ANGLE = 60;
const MIN_DISTANCE = Math.min(W, H) / 20;
const MAX_DISTANCE = Math.min(W, H) / 4;

let svg = document.querySelector('svg');
let path = document.querySelector('path');

svg.style.width = W;
svg.style.height = H;

createPath();

function getPoint() {
  let x = getRandomNumber(W * 0.6) + W * 0.2;
  let y = getRandomNumber(H * 0.6) + H * 0.2;

  let point = [x, y];

  if (lastTwoPoints.length < 2) {
    lastTwoPoints.push(point);
  } else {
    if (
      getAngle(...lastTwoPoints, point) < MIN_ANGLE ||
      getDistance(lastTwoPoints[1], point) < MIN_DISTANCE ||
      getDistance(lastTwoPoints[1], point) > MAX_DISTANCE
    ) {
      point = getPoint();
    } else {
      lastTwoPoints.shift();
      lastTwoPoints.push(point);
    }
  }
  return point;
}

function pointString() {
  let point = getPoint();
  return `${point[0]} ${point[1]} `;
}

function getDistance(pointA, pointB) {
  return Math.sqrt((pointA[0] - pointB[0]) ** 2 + (pointA[1] - pointB[1]) ** 2);
}

function getAngle(pointA, pointB, pointC) {
  // angle to pointB
  let a = getDistance(pointA, pointB);
  let b = getDistance(pointB, pointC);
  let c = getDistance(pointC, pointA);
  return Math.acos((a * a + b * b - c * c) / (2 * a * b)) * (180 / Math.PI);
}

function createPath() {
  let path_string = `M ${pointString()} C ${pointString()} ${pointString()} ${pointString()}`;

  for (let i = 0; i < 6; i++) {
    path_string += `S ${pointString()} ${pointString()} `;
  }

  path.setAttribute('d', path_string);
}

function getRandomNumber(max) {
  return Math.floor(Math.random() * max);
}
