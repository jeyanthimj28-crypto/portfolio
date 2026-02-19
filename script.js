const canvas = document.getElementById("scrollCanvas");
const context = canvas.getContext("2d");

const frameCount = 240;
const currentFrame = index => 
  `frames/ezgif-frame-${String(index).padStart(3, '0')}.jpg`;

const images = [];
let loadedImages = 0;

canvas.width = 1920;   // Change to your image width
canvas.height = 1080;  // Change to your image height

// Preload images
for (let i = 1; i <= frameCount; i++) {
  const img = new Image();
  img.src = currentFrame(i);
  img.onload = () => {
    loadedImages++;
    if (loadedImages === 1) {
      context.drawImage(img, 0, 0);
    }
  };
  images.push(img);
}

function updateImage(index) {
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.drawImage(images[index], 0, 0);
}

window.addEventListener("scroll", () => {
  const scrollTop = window.scrollY;
  const maxScroll = document.body.scrollHeight - window.innerHeight;
  const scrollFraction = scrollTop / maxScroll;
  const frameIndex = Math.min(
    frameCount - 1,
    Math.floor(scrollFraction * frameCount)
  );

  updateImage(frameIndex);
});
