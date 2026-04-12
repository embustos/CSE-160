const SQ = 0;
const TRI = 1;
const CIRC = 2;
const SPRAY_SQ = 4;
const SPRAY_TRI = 5;
const SPRAY_CIRC = 6;

var gl;
var canvas;
var attribLoc;
var colorLoc;
var sizeLoc;

var shapeLog = [];

var currColor = [0.5, 0.5, 0.5, 1.0];
var currSize = 5;
var currType = SQ;
var currSegs = 12;
var mouseDown = false;
var showPicture = false;

var VSHADER_SOURCE =
    'attribute vec4 attribLoc;\n' +
    'uniform float sizeLoc;\n' +
    'void main() {\n' +
    ' gl_Position = attribLoc;\n' +
    ' gl_PointSize = sizeLoc;\n' +
    '}\n';

var FSHADER_SOURCE =
    'precision mediump float;\n' +
    'uniform vec4 colorLoc;\n' +
    'void main() {\n' +
    '  gl_FragColor = colorLoc;\n' +
    '}\n';

function addActionsForHtmlUI(){
   document.getElementById('clear').onclick = function() { shapeLog = []; showPicture = false; renderAllShapes(); };
   document.getElementById('picture').onclick = function() { showPicture = !showPicture; renderAllShapes(); };
   document.getElementById('square').onclick = function() { currType = SQ; };
   document.getElementById('triangle').onclick = function() { currType = TRI; };
   document.getElementById('circle').onclick = function() { currType = CIRC; };
   document.getElementById('spray-sq').onclick = function() { currType = SPRAY_SQ; };
   document.getElementById('spray-tri').onclick = function() { currType = SPRAY_TRI; };
   document.getElementById('spray-circ').onclick = function() { currType = SPRAY_CIRC; };

   document.getElementById('red').addEventListener('input', function() { currColor[0] = this.value * 0.1; });
   document.getElementById('green').addEventListener('input', function() { currColor[1] = this.value * 0.1; });
   document.getElementById('blue').addEventListener('input', function() { currColor[2] = this.value * 0.1; });

   document.getElementById('size').addEventListener('input', function() { currSize = parseFloat(this.value); });
   document.getElementById('sCount').addEventListener('input', function() { currSegs = parseFloat(this.value); });
}

function setupWebGL(){
   canvas = document.getElementById('asg1');
   if (!canvas) {
       console.log('Failed to retrieve the <canvas> element');
       return;
   }

   gl = canvas.getContext("webgl", { preserveDrawingBuffer: true });
   if (!gl) {
       console.log('Failed to get the rendering context for WebGL');
       return;
   }
   gl.enable(gl.BLEND);
   gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
}

function connectVariablesToGLSL(){
   if (!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)) {
       console.log('Failed to initialize shaders.');
       return;
   }

   attribLoc = gl.getAttribLocation(gl.program, 'attribLoc');
   if (attribLoc < 0) {
       console.log('Failed to get attribLoc');
       return;
   }

   colorLoc = gl.getUniformLocation(gl.program, 'colorLoc');
   if (!colorLoc) {
       console.log('Failed to get colorLoc');
       return;
   }

   sizeLoc = gl.getUniformLocation(gl.program, 'sizeLoc');
   if (!sizeLoc) {
       console.log('Failed to get sizeLoc');
       return;
   }
}

function main() {
   setupWebGL();
   connectVariablesToGLSL();
   addActionsForHtmlUI();

   canvas.onmousedown = function(ev) {
      click(ev);
      mouseDown = true;
   };
   canvas.onmouseup = function(ev) {
      mouseDown = false;
   };
   canvas.onmousemove = function(ev) {
      if (mouseDown) {
         click(ev);
      }
   };

   gl.clearColor(0.0, 0.0, 0.0, 1.0);
   gl.clear(gl.COLOR_BUFFER_BIT);
}

function convertCoordinatesEventToGL(ev){
   var x = ev.clientX;
   var y = ev.clientY;
   var rect = ev.target.getBoundingClientRect();

   x = ((x - rect.left) - canvas.width / 2) / (canvas.width / 2);
   y = (canvas.height / 2 - (y - rect.top)) / (canvas.height / 2);

   return [x, y];
}

function click(ev) {
   var [x, y] = convertCoordinatesEventToGL(ev);

   if (currType == SPRAY_SQ || currType == SPRAY_TRI || currType == SPRAY_CIRC) {
      var radius = currSize * 0.02;
      for (var s = 0; s < 20; s++) {
         var ang = Math.random() * 2 * Math.PI;
         var dist = Math.random() * radius;
         var sprayShape;
         if (currType == SPRAY_SQ) {
            sprayShape = new Point();
         } else if (currType == SPRAY_TRI) {
            sprayShape = new Triangle();
         } else {
            sprayShape = new Circle();
            sprayShape.sCount = currSegs;
         }
         sprayShape.position = [x + Math.cos(ang) * dist, y + Math.sin(ang) * dist];
         sprayShape.color = currColor.slice();
         sprayShape.size = 2;
         sprayShape.outline = 0;
         shapeLog.push(sprayShape);
      }

      var splashRadius = radius * 3;
      for (var j = 0; j < 10; j++) {
         var sAng = Math.random() * 2 * Math.PI;
         var sDist = radius + Math.random() * splashRadius;
         var splash;
         if (currType == SPRAY_SQ) {
            splash = new Point();
         } else if (currType == SPRAY_TRI) {
            splash = new Triangle();
         } else {
            splash = new Circle();
            splash.sCount = currSegs;
         }
         var sColor = currColor.slice();
         sColor[3] = 0.05 + Math.random() * 0.2;
         splash.position = [x + Math.cos(sAng) * sDist, y + Math.sin(sAng) * sDist];
         splash.color = sColor;
         splash.size = 1;
         splash.outline = 0;
         shapeLog.push(splash);
      }
   } else {
      var shape;
      if (currType == SQ) {
         shape = new Point();
      } else if (currType == TRI) {
         shape = new Triangle();
      } else if (currType == CIRC) {
         shape = new Circle();
         shape.sCount = currSegs;
      }
      if (!shape) return;
      shape.position = [x, y];
      shape.color = currColor.slice();
      shape.size = currSize;
      shape.outline = 0;
      shapeLog.push(shape);
   }

   renderAllShapes();
}

function renderAllShapes(){
   gl.clear(gl.COLOR_BUFFER_BIT);

   if (showPicture) {
      drawPicture();
   }

   var len = shapeLog.length;
   for (var i = 0; i < len; i++) {
      shapeLog[i].render();
   }
}
