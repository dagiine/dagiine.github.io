const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
let coord = { x: 0, y: 0 };
let isDrawing = false;
let currentColor = "#ffffff"; 
let brushSize = 5;

const sizeInput = document.getElementById("size-input");
const image = document.getElementById("image");
const colorButtons = document.querySelectorAll(".color-btn");
const clearCanvasButton = document.getElementById("clear-canvas");

function resizeCanvas() {
    canvas.width = image.width;
    canvas.height = image.height;
    redrawImage();
}

function redrawImage() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
}

sizeInput.addEventListener("input", (e) => {
    brushSize = e.target.value;
});

colorButtons.forEach((button) => {
    button.addEventListener("click", () => {
        currentColor = button.style.backgroundColor;
    });
});

clearCanvasButton.addEventListener("click", () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    redrawImage();
});

canvas.addEventListener("mousedown", start);
canvas.addEventListener("mouseup", stop);
canvas.addEventListener("mousemove", draw);

function start(event) {
    isDrawing = true;
    reposition(event);
}

function stop() {
    isDrawing = false;
}

function reposition(event) {
    const rect = canvas.getBoundingClientRect();
    coord.x = event.clientX - rect.left;
    coord.y = event.clientY - rect.top;
}

function draw(event) {
    if (!isDrawing) return;
    ctx.beginPath();
    ctx.lineWidth = brushSize;
    ctx.strokeStyle = currentColor;
    ctx.lineCap = "round";

    ctx.moveTo(coord.x, coord.y); 
    reposition(event);
    ctx.lineTo(coord.x, coord.y); 
    ctx.stroke();
}

function changeImage(imagePath) {
    image.src = imagePath;  
    image.onload = resizeCanvas;  
}

image.onload = resizeCanvas;
window.addEventListener("resize", resizeCanvas);