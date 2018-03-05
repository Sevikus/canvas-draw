var canvas,
  context,
  dragging = false,
  dragStartLocation,
  snapshot,
  textOrLine = true,
  line3 = false;


function getCanvasCoordinates(event) {
  var x = event.clientX - canvas.getBoundingClientRect().left;
  var y = event.clientY - canvas.getBoundingClientRect().top;
  return {x: x, y: y};
} 

function takeSnapshot() {
  snapshot = context.getImageData(0, 0, canvas.width, canvas.height);
}

function restoreSnapshot() {
  context.putImageData(snapshot, 0, 0);
}

function Lines(x, y) {
  this.x = x;
  this.y = y;
}

function drawLine(position) {
  if (textOrLine) {
  var ang;
  ang = Math.atan2(position.x - dragStartLocation.x, position.y - dragStartLocation.y) * 180 / Math.PI;
  ang += 180;
  var z = 5;  
    if (ang < 22.5 || ang > 337.5 || (157.5 < ang && ang < 202.5)) {    
      context.beginPath();
      context.moveTo(dragStartLocation.x, dragStartLocation.y);
      context.lineTo(dragStartLocation.x, position.y);
      context.stroke();
          if(line3) {
          context.beginPath();
          context.moveTo(dragStartLocation.x - z, dragStartLocation.y);
          context.lineTo(dragStartLocation.x - z, position.y);
          context.stroke();
          context.beginPath();
          context.moveTo(dragStartLocation.x, dragStartLocation.y);
          context.lineTo(dragStartLocation.x - z, dragStartLocation.y);
          context.stroke();
          context.beginPath();
          context.moveTo(dragStartLocation.x, position.y);
          context.lineTo(dragStartLocation.x - z, position.y);
          context.stroke();

          context.beginPath();
          var halfY = (dragStartLocation.y - position.y) / 2;
          context.moveTo(dragStartLocation.x, dragStartLocation.y - halfY);
          context.lineTo(dragStartLocation.x - z, dragStartLocation.y - halfY);
          context.stroke();


        }
    }
    if ((67.5 < ang && ang < 112.5) || (247.5 < ang && ang < 292.5)) {
      context.beginPath();
      context.moveTo(dragStartLocation.x, dragStartLocation.y);
      context.lineTo(position.x, dragStartLocation.y);
      context.stroke();
      if(line3) {
          context.beginPath();
          context.moveTo(dragStartLocation.x, dragStartLocation.y - z);
          context.lineTo(position.x, dragStartLocation.y - z);
          context.stroke();
          context.beginPath();
          context.moveTo(dragStartLocation.x, dragStartLocation.y);
          context.lineTo(dragStartLocation.x, dragStartLocation.y - z);
          context.stroke();
          context.beginPath();
          context.moveTo(position.x, dragStartLocation.y);
          context.lineTo(position.x, dragStartLocation.y - z);
          context.stroke();

          context.beginPath();
          var halfX = (dragStartLocation.x - position.x) / 2;
          context.moveTo(dragStartLocation.x - halfX, dragStartLocation.y);
          context.lineTo(dragStartLocation.x - halfX, dragStartLocation.y - z);
          context.stroke();
      }    
    }
    
    if ((22.5 < ang && ang < 67.5) || (202.5 < ang && ang < 247.5)) {
      var leftUpY = dragStartLocation.y + (position.x - dragStartLocation.x);
      context.beginPath();
      context.moveTo(dragStartLocation.x, dragStartLocation.y);
      context.lineTo(position.x, leftUpY);
      context.stroke();
    }

    if ((112.5 < ang && ang < 157.5) || (292.5 < ang && ang < 337.5)) {
      var leftDownY = dragStartLocation.y - (position.x - dragStartLocation.x);
      context.beginPath();
      context.moveTo(dragStartLocation.x, dragStartLocation.y);
      context.lineTo(position.x, leftDownY);
      context.stroke();
    }   
  }
}

function dragStart(event) {
  dragging = true;
  dragStartLocation = getCanvasCoordinates(event);
  takeSnapshot();
}

function drag(event) {
  var position;
  if (dragging === true) {
    restoreSnapshot();
    position = getCanvasCoordinates(event);
    drawLine(position);
  }
}

function dragStop(event) {
  dragging = false;
  restoreSnapshot();
  var position = getCanvasCoordinates(event);
  drawLine(position);
}

function changeLineWidth() {
  context.lineWidth = this.value;
  event.stopPropagation();
}

function changeLineColor() {
  context.strokeStyle = this.value;
  event.stopPropagation();
}

function writeText(position) {
  textOrLine = false;
  canvas.addEventListener('click', write);
}
  function write() {
  if (textOrLine === false) { 
  var position = getCanvasCoordinates(event);
  console.log(position.x, position.y);
  context.font = "25px Arial";
    context.strokeText(prompt(""), position.x, position.y);
    }
}

function writeLine() {
  textOrLine = true;
}

function noDash() {
  context.setLineDash([0,0]);
  line3 = false;
}
function dashed1() {
  context.setLineDash([10,10]);
}
function dashed2() {
  context.setLineDash([6,6]);
}
function dashed3() {
  context.setLineDash([10,5]);
}

function lined3() {
  line3 = true;
  console.log(line3);
}

function init() {
  canvas = document.getElementById('canvas');
  context = canvas.getContext('2d');
  var lineWidth = document.getElementById('lineWidth');
  var strokeColor = document.getElementById('strokeColor'); 
  context.strokeStyle = strokeColor.value;
  context.lineWidth = lineWidth.value;
  context.lineCap = 'round';
  context.setLineDash([0,0]);
  canvas.addEventListener('mousedown', dragStart);
  canvas.addEventListener('mousemove', drag);
  canvas.addEventListener('mouseup', dragStop);
  lineWidth.addEventListener("input", changeLineWidth);
  strokeColor.addEventListener("input", changeLineColor);

  document.querySelector(".write").addEventListener("click", writeText);
  document.querySelector(".line").addEventListener("click", writeLine);

  document.querySelector(".noDash").addEventListener("click", noDash);
  document.querySelector(".dash1").addEventListener("click", dashed1);
  document.querySelector(".dash2").addEventListener("click", dashed2);
  document.querySelector(".dash3").addEventListener("click", dashed3);

  document.querySelector(".line3").addEventListener("click", lined3);
}

window.addEventListener('load', init);