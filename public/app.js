const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let running = false;

ctx.font = '16px Arial';
ctx.fillStyle = '#000000';

animate();

let last = performance.now();
let fps = 0;
let frameCount = 0;
let fpsTimer = 0;

function animate() {
    const now = performance.now();
    frameCount++;
    fpsTimer += now - last;
    
    if (fpsTimer >= 1000) {
        fps = frameCount;
        frameCount = 0;
        fpsTimer = 0;
    }
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillText("FPS: " + fps, 25, 25);
    last = now;
    requestAnimationFrame(animate);
}

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});
