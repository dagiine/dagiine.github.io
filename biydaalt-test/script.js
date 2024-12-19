// Select elements
const colorInput = document.getElementById('color-input');
const sizeInput = document.getElementById('size-input');
const image = document.getElementById('image');
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const xmasTreeButton = document.getElementById('xmas-tree');
const reindeerButton = document.getElementById('reindeer');
const gingerbreadButton = document.getElementById('gingerbread-man');
const clearCanvasButton = document.getElementById('clear-canvas'); // New button

// Color buttons
const greenButton = document.getElementById('green');
const brownButton = document.getElementById('brown');
const yellowButton = document.getElementById('yellow');
const redButton = document.getElementById('red');
const blueButton = document.getElementById('blue');
const brownishYellowButton = document.getElementById('brownish-yellow');
const pinkButton = document.getElementById('pink');
const cyanButton = document.getElementById('cyan');

let isDrawing = false;
let currentColor = '#008000'; // Default color is green
let brushSize = sizeInput.value;

// Set initial drawing settings
colorInput.addEventListener('input', (e) => {
    currentColor = e.target.value;
});

// Button color handlers
greenButton.addEventListener('click', () => {
    currentColor = '#008000'; // Green
});

brownButton.addEventListener('click', () => {
    currentColor = '#8B4513'; // Brown
});

yellowButton.addEventListener('click', () => {
    currentColor = '#FFFF00'; // Yellow
});

redButton.addEventListener('click', () => {
    currentColor = '#FF0000'; // Red
});

blueButton.addEventListener('click', () => {
    currentColor = '#0000FF'; // Blue
});

brownishYellowButton.addEventListener('click', () => {
    currentColor = '#D2B48C'; // Brownish Yellow
});

pinkButton.addEventListener('click', () => {
    currentColor = '#FFC0CB'; // Pink
});

cyanButton.addEventListener('click', () => {
    currentColor = '#00FFFF'; // Cyan
});

// Brush size handler
sizeInput.addEventListener('input', (e) => {
    brushSize = e.target.value;
});

// Resize canvas to match image size
function resizeCanvas() {
    // Ensure the canvas size is valid and not 0x0
    if (image.complete) {
        canvas.width = image.width;
        canvas.height = image.height;
        redrawImage(); // Redraw the image every time the canvas is resized
    }
}

// Redraw the image on the canvas so it remains visible while drawing
function redrawImage() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear before redrawing
    ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
}

// Ensure canvas is resized when the image is loaded or changed
image.onload = resizeCanvas;
window.addEventListener('resize', resizeCanvas);

// Drawing logic
canvas.addEventListener('mousedown', (e) => {
    isDrawing = true;
    draw(e);
});

canvas.addEventListener('mousemove', (e) => {
    if (isDrawing) {
        draw(e);
    }
});

canvas.addEventListener('mouseup', () => {
    isDrawing = false;
});

canvas.addEventListener('mouseleave', () => {
    isDrawing = false;
});

function draw(event) {
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    ctx.lineWidth = brushSize;
    ctx.lineCap = 'round';
    ctx.strokeStyle = currentColor;

    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + 5, y + 5); // Increase the line length to make it visible
    ctx.stroke();
}

// Change image on button click
function changeImage(imageSrc) {
    image.src = imageSrc;
    image.onload = resizeCanvas;
}

xmasTreeButton.addEventListener('click', () => {
    changeImage('xmas-tree.png');
});

reindeerButton.addEventListener('click', () => {
    changeImage('reindeer.png');
});

gingerbreadButton.addEventListener('click', () => {
    changeImage('gingerbread-man.png');
});

// Clear canvas functionality
clearCanvasButton.addEventListener('click', () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clears the canvas
    redrawImage(); // Redraws the image to make it visible again
});