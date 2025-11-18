let totalSeconds = 135;
let remainingSeconds = totalSeconds;
let timerInterval = null;

const canvas = document.getElementById("fieldCanvas");
const ctx = canvas.getContext("2d");

let mockX = 400;     // mid field
let mockY = 225;
let mockAngle = 0;
let fieldPixelSizeX = 800;
let fieldPixelSizeY = 400;

/* Gets the robot position from network tables
* Robot position [x, y, angle] 
*/
NetworkTables.addKeyListener('/SmartDashboard/robotPosition', (key, value) => {
    posArray = value;
    mockX = posArray[0] / 16.4592 * fieldPixelSizeX;
    mockY = posArray[1] / 8.2296 * fieldPixelSizeY;
    mockAngle = posArray[2];
});

const fieldImg = new Image();
fieldImg.src = "images/field.png"; // replace later

const robotImg = new Image();
robotImg.src = "images/robot.png"; // replace later

function drawField() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (fieldImg.complete && fieldImg.naturalWidth > 0) {
        ctx.drawImage(fieldImg, 0, 0, canvas.width, canvas.height);
    } else {
        ctx.fillStyle = "#0a3";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    ctx.save();
    ctx.translate(mockX, mockY);
    ctx.rotate(mockAngle * Math.PI / 180);

    if (robotImg.complete && robotImg.naturalWidth > 0) {
        ctx.drawImage(robotImg, -25, -25, 50, 50);
    } else {
        ctx.fillStyle = "yellow";
        ctx.fillRect(-25, -25, 50, 50);
    }

    ctx.restore();
}

// Spin animation
setInterval(() => {
    drawField();
}, 30);

drawField();