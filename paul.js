let lastTwoPoints = [];
const WIDTH = 400;
const HEIGHT = 400;
const MIN_ANGLE = 60;
const MIN_DISTANCE = Math.min(WIDTH, HEIGHT) / 20;
const MAX_DISTANCE = Math.min(WIDTH, HEIGHT) / 4;

let svg = document.querySelector('svg');
let path = document.querySelector('path');
svg.style.width = WIDTH;
svg.style.height = HEIGHT;
createPath();

function getPoint() {
  let point = [
    Math.floor(Math.random() * WIDTH * 0.6) + WIDTH * 0.2,
    Math.floor(Math.random() * HEIGHT * 0.6) + HEIGHT * 0.2,
  ];
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
  let a = getDistance(pointA, pointB);
  let b = getDistance(pointB, pointC);
  let c = getDistance(pointC, pointA);
  return Math.acos((a * a + b * b - c * c) / (2 * a * b)) * (180 / Math.PI);
}
function createPath() {
  let pathString = `M ${pointString()} C ${pointString()} ${pointString()} ${pointString()}`;
  for (let i = 0; i < 6; i++) {
    pathString += `S ${pointString()} ${pointString()} `;
  }
  path.setAttribute('d', pathString);
}
