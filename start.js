let game=`
   <div class="info-Cont">
    <div id="live"></div>
    <div id="score">score:0</div>
  </div>
  <div id="board">
    <div id="balle"></div>
    <div id="paddle"></div>
  </div>
  `
let startbuton=document.getElementById('stbuton')
startbuton.addEventListener('click', () => {
  document.body.innerHTML = game;

  // Create and append the script
  const script = document.createElement('script');
  script.type = 'module';
  script.src = 'ball.js';
  document.body.appendChild(script);
});