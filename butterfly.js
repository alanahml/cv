(function () {
  // Duration of one full GIF loop in milliseconds — adjust to match your butterfly.gif
  const LOOP_DURATION = 1400;
  const GIF_SRC = 'assets/butterfly.gif';
  const SIZE = 40;

  const wrap = document.createElement('div');
  wrap.style.cssText = [
    'position:fixed',
    'top:0',
    'left:0',
    'width:' + SIZE + 'px',
    'height:' + SIZE + 'px',
    'pointer-events:none',
    'z-index:99999',
    'transform:translate(-50%,-50%)',
    'will-change:transform',
  ].join(';');

  // Canvas shows the first (paused) frame
  const canvas = document.createElement('canvas');
  canvas.width = SIZE;
  canvas.height = SIZE;
  canvas.style.cssText = 'position:absolute;top:0;left:0;display:none';
  const ctx = canvas.getContext('2d');

  // Img plays the live GIF on click
  const img = document.createElement('img');
  img.style.cssText = [
    'position:absolute',
    'top:0',
    'left:0',
    'width:' + SIZE + 'px',
    'height:' + SIZE + 'px',
    'display:none',
  ].join(';');

  wrap.appendChild(canvas);
  wrap.appendChild(img);

  // Load GIF, draw first frame to canvas, then show canvas
  const loader = new Image();
  loader.onload = function () {
    ctx.drawImage(loader, 0, 0, SIZE, SIZE);
    canvas.style.display = 'block';
  };
  loader.src = GIF_SRC;

  // Cursor tracking
  document.addEventListener('mousemove', function (e) {
    wrap.style.left = e.clientX + 'px';
    wrap.style.top = e.clientY + 'px';
  });

  // Click: play one loop then return to paused frame
  var playing = false;
  document.addEventListener('click', function () {
    if (playing) return;
    playing = true;

    // Reset GIF to frame 0 by clearing and re-setting src
    img.src = '';
    img.src = GIF_SRC;
    img.style.display = 'block';
    canvas.style.display = 'none';

    setTimeout(function () {
      img.style.display = 'none';
      canvas.style.display = 'block';
      playing = false;
    }, LOOP_DURATION);
  });

  document.body.appendChild(wrap);
})();
