document.addEventListener('DOMContentLoaded', () => {
    const boardSize = 20;
    const board = document.getElementById('game-board');
    const scoreElement = document.getElementById('score');
    const snake = [{ x: 10, y: 10 }];
    let food = generateFood();
    let score = 0;
  
    function generateFood() {
      const x = Math.floor(Math.random() * boardSize);
      const y = Math.floor(Math.random() * boardSize);
      return { x, y };
    }
  
    function draw() {
      board.innerHTML = '';
      drawSnake();
      drawFood();
    }
  
    function drawSnake() {
      snake.forEach(segment => {
        const snakeSegment = document.createElement('div');
        snakeSegment.className = 'snake';
        snakeSegment.style.gridColumn = segment.x + 1;
        snakeSegment.style.gridRow = segment.y + 1;
        board.appendChild(snakeSegment);
      });
    }
  
    function drawFood() {
      const foodElement = document.createElement('div');
      foodElement.className = 'food';
      foodElement.style.gridColumn = food.x + 1;
      foodElement.style.gridRow = food.y + 1;
      board.appendChild(foodElement);
    }
  
    function move() {
      const head = { ...snake[0] };
      switch (direction) {
        case 'UP':
          head.y = (head.y - 1 + boardSize) % boardSize;
          break;
        case 'DOWN':
          head.y = (head.y + 1) % boardSize;
          break;
        case 'LEFT':
          head.x = (head.x - 1 + boardSize) % boardSize;
          break;
        case 'RIGHT':
          head.x = (head.x + 1) % boardSize;
          break;
      }
  
      snake.unshift(head);
  
      if (head.x === food.x && head.y === food.y) {
        food = generateFood();
        score += 10;
        updateScore();
      } else {
        snake.pop();
      }
    }
  
    function updateScore() {
      scoreElement.textContent = 'Score: ' + score;
    }
  
    function checkCollision() {
      const head = snake[0];
      for (let i = 1; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
          gameOver();
        }
      }
    }
  
    function gameOver() {
      alert('Game Over! Your score is: ' + score);
      resetGame();
    }
  
    function resetGame() {
      snake.length = 1;
      snake[0] = { x: 10, y: 10 };
      food = generateFood();
      score = 0;
      updateScore();
    }
  
    let direction = 'RIGHT';
  
    window.addEventListener('keydown', (event) => {
      switch (event.key) {
        case 'ArrowUp':
          if (direction !== 'DOWN') direction = 'UP';
          break;
        case 'ArrowDown':
          if (direction !== 'UP') direction = 'DOWN';
          break;
        case 'ArrowLeft':
          if (direction !== 'RIGHT') direction = 'LEFT';
          break;
        case 'ArrowRight':
          if (direction !== 'LEFT') direction = 'RIGHT';
          break;
      }
    });
  
    function gameLoop() {
      move();
      checkCollision();
      draw();
    }
  
    setInterval(gameLoop, 200);
  });
      