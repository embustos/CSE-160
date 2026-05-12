var gl;
var canvas;
var a_Position;
var a_UV;
var u_FragColor;
var u_ModelMatrix;
var u_ProjectionMatrix;
var u_ViewMatrix;
var u_GlobalRotateMatrix;
var u_Sampler0;
var u_Sampler1;
var u_Sampler2;
var u_whichTexture;

var g_camera;

var g_lastMouseX = -1;

var g_startTime = performance.now() / 1000.0;
var g_seconds = 0;


var VSHADER_SOURCE = `
   precision mediump float;
   attribute vec4 a_Position;
   attribute vec2 a_UV;
   varying vec2 v_UV;
   uniform mat4 u_ModelMatrix;
   uniform mat4 u_GlobalRotateMatrix;
   uniform mat4 u_ViewMatrix;
   uniform mat4 u_ProjectionMatrix;
   void main() {
      gl_Position = u_ProjectionMatrix * u_ViewMatrix * u_GlobalRotateMatrix * u_ModelMatrix * a_Position;
      v_UV = a_UV;
   }`;


var FSHADER_SOURCE = `
   precision mediump float;
   varying vec2 v_UV;
   uniform vec4 u_FragColor;
   uniform sampler2D u_Sampler0;
   uniform sampler2D u_Sampler1;
   uniform sampler2D u_Sampler2;
   uniform int u_whichTexture;
   void main() {
      if (u_whichTexture == -2) {
         gl_FragColor = u_FragColor;
      } else if (u_whichTexture == -1) {
         gl_FragColor = vec4(v_UV, 1.0, 1.0);
      } else if (u_whichTexture == 0) {
         gl_FragColor = texture2D(u_Sampler0, v_UV);
      } else if (u_whichTexture == 1) {
         gl_FragColor = texture2D(u_Sampler1, v_UV);
      } else if (u_whichTexture == 2) {
         gl_FragColor = texture2D(u_Sampler2, v_UV);
      } else {
         gl_FragColor = vec4(1.0, 0.2, 0.2, 1.0);
      }
   }`;



function setupWebGL() {
   canvas = document.getElementById('asg3');
   if (!canvas) {
      console.log('Failed to retrieve the <canvas> element');
      return;
   }
   gl = getWebGLContext(canvas);
   if (!gl) {
      console.log('Failed to get the rendering context for WebGL');
      return;
   }
   gl.enable(gl.DEPTH_TEST);
}



function connectVariablesToGLSL() {
   if (!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)) {
      console.log('Failed to initialize shaders.');
      return;
   }

   a_Position = gl.getAttribLocation(gl.program, 'a_Position');
   if (a_Position < 0) { console.log('Failed to get a_Position'); return; }

   a_UV = gl.getAttribLocation(gl.program, 'a_UV');
   if (a_UV < 0) { console.log('Failed to get a_UV'); return; }

   u_FragColor = gl.getUniformLocation(gl.program, 'u_FragColor');
   if (!u_FragColor) { console.log('Failed to get u_FragColor'); return; }

   u_ModelMatrix = gl.getUniformLocation(gl.program, 'u_ModelMatrix');
   if (!u_ModelMatrix) { console.log('Failed to get u_ModelMatrix'); return; }

   u_GlobalRotateMatrix = gl.getUniformLocation(gl.program, 'u_GlobalRotateMatrix');
   if (!u_GlobalRotateMatrix) { console.log('Failed to get u_GlobalRotateMatrix'); return; }

   u_ViewMatrix = gl.getUniformLocation(gl.program, 'u_ViewMatrix');
   if (!u_ViewMatrix) { console.log('Failed to get u_ViewMatrix'); return; }

   u_ProjectionMatrix = gl.getUniformLocation(gl.program, 'u_ProjectionMatrix');
   if (!u_ProjectionMatrix) { console.log('Failed to get u_ProjectionMatrix'); return; }

   u_whichTexture = gl.getUniformLocation(gl.program, 'u_whichTexture');
   if (!u_whichTexture) { console.log('Failed to get u_whichTexture'); return; }

   u_Sampler0 = gl.getUniformLocation(gl.program, 'u_Sampler0');
   if (!u_Sampler0) { console.log('Failed to get u_Sampler0'); return; }

   u_Sampler1 = gl.getUniformLocation(gl.program, 'u_Sampler1');
   if (!u_Sampler1) { console.log('Failed to get u_Sampler1'); return; }

   u_Sampler2 = gl.getUniformLocation(gl.program, 'u_Sampler2');
   if (!u_Sampler2) { console.log('Failed to get u_Sampler2'); return; }

   var identityM = new Matrix4();
   gl.uniformMatrix4fv(u_ModelMatrix, false, identityM.elements);
}



function isPowerOf2(value) {
   return (value & (value - 1)) == 0;
}

function initTextures() {
   var image0 = new Image();
   var image1 = new Image();
   var image2 = new Image();

   image0.onload = function() { sendTexture(image0, gl.TEXTURE0, u_Sampler0, 0); };
   image1.onload = function() { sendTexture(image1, gl.TEXTURE1, u_Sampler1, 1); };
   image2.onload = function() { sendTexture(image2, gl.TEXTURE2, u_Sampler2, 2); };

   image0.src = 'grass.png';
   image1.src = 'sky.jpg';
   image2.src = 'wall.jpg';

   return true;
}

function sendTexture(image, textureUnit, samplerUniform, unitIndex) {
   var texture = gl.createTexture();
   if (!texture) {
      console.log('Failed to create texture object');
      return false;
   }
   gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1);
   gl.activeTexture(textureUnit);
   gl.bindTexture(gl.TEXTURE_2D, texture);
   gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, image);

   if (isPowerOf2(image.width) && isPowerOf2(image.height)) {
      gl.generateMipmap(gl.TEXTURE_2D);
   } else {
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
   }

   gl.uniform1i(samplerUniform, unitIndex);
   console.log('Texture loaded: unit ' + unitIndex);
}



function main() {
   setupWebGL();
   connectVariablesToGLSL();

   initCubeVBO();
   initBuffers();
   snapshotOriginalMap();
   buildWallsVBO();

   g_camera = new Camera();

   document.onkeydown = keydown;

   canvas.onmousemove = function(ev) { mouseCam(ev); };
   canvas.onmouseleave = function() { g_lastMouseX = -1; };

   document.getElementById('restart').onclick = restartGame;

   initTextures();
   updateStoryUI();

   gl.clearColor(0.0, 0.0, 0.0, 1.0);
   requestAnimationFrame(tick);
}



function keydown(ev) {
   switch(ev.key) {
      case 'w': case 'W': case 'ArrowUp':    g_camera.forward();    break;
      case 's': case 'S': case 'ArrowDown':  g_camera.back();       break;
      case 'a': case 'A': case 'ArrowLeft':  g_camera.left();       break;
      case 'd': case 'D': case 'ArrowRight': g_camera.right();      break;
      case 'q': case 'Q':                    g_camera.panLeft();    break;
      case 'e': case 'E':                    g_camera.panRight();   break;
      case 'f': case 'F':                    addBlockInFront();     break;
      case 'r': case 'R':                    removeBlockInFront();  break;
   }
   renderScene();
}

function getCellInFront(distance) {
   var fx = g_camera.at.elements[0] - g_camera.eye.elements[0];
   var fz = g_camera.at.elements[2] - g_camera.eye.elements[2];
   var len = Math.sqrt(fx * fx + fz * fz);
   if (len < 1e-4) return null;
   fx /= len; fz /= len;

   var wx = g_camera.eye.elements[0] + fx * distance;
   var wz = g_camera.eye.elements[2] + fz * distance;
   var mx = Math.floor(wx + 16);
   var mz = Math.floor(wz + 16);
   if (mx < 0 || mx >= 32 || mz < 0 || mz >= 32) return null;
   return { mx: mx, mz: mz };
}

function addBlockInFront() {
   var c = getCellInFront(1.2);
   if (!c) return;
   if (g_map[c.mx][c.mz] >= 4) return;
   g_map[c.mx][c.mz]++;
   buildWallsVBO();
}

function removeBlockInFront() {
   var c = getCellInFront(1.2);
   if (!c) return;
   if (g_map[c.mx][c.mz] <= 0) return;
   g_map[c.mx][c.mz]--;
   buildWallsVBO();
}

function mouseCam(ev) {
   var rect = canvas.getBoundingClientRect();
   var mouseX = ev.clientX - rect.left;

   if (g_lastMouseX < 0) {
      g_lastMouseX = mouseX;
      return;
   }

   var dx = mouseX - g_lastMouseX;
   g_lastMouseX = mouseX;

   var sensitivity = 0.3;
   if (dx < 0) {
      g_camera.panMLeft(-dx * sensitivity);
   } else if (dx > 0) {
      g_camera.panMRight(dx * sensitivity);
   }
}

function tick() {
   g_seconds = performance.now() / 1000.0 - g_startTime;
   renderScene();
   requestAnimationFrame(tick);
}


function renderScene() {
   gl.uniformMatrix4fv(u_ProjectionMatrix, false, g_camera.projMat.elements);

   gl.uniformMatrix4fv(u_ViewMatrix, false, g_camera.viewMat.elements);

   var globalRotMat = new Matrix4();
   gl.uniformMatrix4fv(u_GlobalRotateMatrix, false, globalRotMat.elements);

   gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

   drawAllShapes();
}
