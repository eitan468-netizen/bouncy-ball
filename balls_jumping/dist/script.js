const container = document.getElementById('container');
const gravity = 0.8;
const friction = 0.7; // How much energy is lost per bounce

// Color Map for specific keys
const colorMap = {
  r: '#e74c3c', // Red
  g: '#2ecc71', // Green
  b: '#3498db', // Blue
  y: '#f1c40f', // Yellow
  o: '#e67e22', // Orange
  p: '#9b59b6', // Purple
  w: '#ecf0f1', // White
  k: '#000000', // Black
};

document.addEventListener('keydown', (e) => {
  createBall(e.key);
});

function createBall(key) {
  const ball = document.createElement('div');
  ball.classList.add('ball');
  
  // Determine color: Defined in map OR random matte color
  const color = colorMap[key.toLowerCase()] || getRandomMatteColor();
  ball.style.backgroundColor = color;
  
  container.appendChild(ball);

  // Physics properties
  let x = Math.random() * (window.innerWidth - 50); // Random start X
  let y = -50; // Start above screen
  
  // Random horizontal velocity (-8 to 8) so it rolls eventually
  let vx = (Math.random() - 0.5) * 15; 
  // Ensure it's never 0 so it always rolls
  if (Math.abs(vx) < 2) vx = 5; 

  let vy = 0;
  let rotation = 0;
  
  // Bounces: Randomly choose between 4 and 6
  let maxBounces = Math.floor(Math.random() * 3) + 4; 
  let currentBounces = 0;
  let rolling = false;

  function update() {
    // Apply gravity
    if (!rolling) {
      vy += gravity;
    }
    
    // Update positions
    x += vx;
    y += vy;
    
    // Rotation for visual rolling effect
    rotation += vx * 2; 

    // Floor Collision
    const floor = window.innerHeight - 50;
    
    if (y > floor) {
      y = floor;
      
      // Bounce Logic
      if (currentBounces < maxBounces) {
        vy *= -friction; // Reverse and dampen velocity
        currentBounces++;
      } else {
        // Stop bouncing, start rolling
        rolling = true;
        vy = 0;
        // Logic to roll off screen
        // We keep vx as is, so it just slides away
      }
    }

    // Apply styles
    ball.style.transform = `translate(${x}px, ${y}px) rotate(${rotation}deg)`;

    // Cleanup: Remove ball if it goes off screen left or right
    if (x > window.innerWidth + 100 || x < -100) {
      ball.remove();
    } else {
      requestAnimationFrame(update);
    }
  }

  requestAnimationFrame(update);
}

function getRandomMatteColor() {
  // Generates nice pastel/matte colors
  const hue = Math.floor(Math.random() * 360);
  return `hsl(${hue}, 60%, 55%)`;
}