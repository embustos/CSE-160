var gl;
var canvas;
var a_Position;
var a_UV;
var a_Normal;
var u_FragColor;
var u_ModelMatrix;
var u_ProjectionMatrix;
var u_ViewMatrix;
var u_GlobalRotateMatrix;
var u_Sampler0;
var u_Sampler1;
var u_Sampler2;
var u_whichTexture;
var u_applyLighting;
var u_NormalViz;
var u_LightOn;
var u_LightPos;
var u_LightColor;
var u_SpotLightOn;
var u_SpotLightPos;
var u_SpotLightDir;
var u_SpotLightCutoff;
var u_CameraPos;

var g_camera;
var g_lastMouseX = -1;
var g_startTime  = performance.now() / 1000.0;
var g_seconds    = 0;

var g_lightOn      = true;
var g_spotLightOn  = true;
var g_normalViz    = false;
var g_animateLight = true;
var g_lightAngle   = 0;
var g_lightRadius  = 5;
var g_lightHeight  = 3;
var g_lightPos     = [5, 3, 0];

var g_spotLightPos = [0, 4, 0];
var g_spotLightDir = [0, -1, 0];
var g_spotCutoff   = Math.cos(25 * Math.PI / 180);

var VSHADER_SOURCE = `
   precision mediump float;
   attribute vec4 a_Position;
   attribute vec2 a_UV;
   attribute vec3 a_Normal;
   varying vec2 v_UV;
   varying vec3 v_Normal;
   varying vec3 v_VertPos;
   uniform mat4 u_ModelMatrix;
   uniform mat4 u_GlobalRotateMatrix;
   uniform mat4 u_ViewMatrix;
   uniform mat4 u_ProjectionMatrix;
   void main() {
      vec4 worldPos = u_ModelMatrix * a_Position;
      gl_Position = u_ProjectionMatrix * u_ViewMatrix * u_GlobalRotateMatrix * worldPos;
      v_UV      = a_UV;
      v_VertPos = worldPos.xyz;
      v_Normal  = normalize(mat3(u_ModelMatrix) * a_Normal);
   }`;

var FSHADER_SOURCE = `
   precision mediump float;
   varying vec2 v_UV;
   varying vec3 v_Normal;
   varying vec3 v_VertPos;
   uniform vec4 u_FragColor;
   uniform sampler2D u_Sampler0;
   uniform sampler2D u_Sampler1;
   uniform sampler2D u_Sampler2;
   uniform int u_whichTexture;
   uniform int u_applyLighting;
   uniform int u_NormalViz;
   uniform int u_LightOn;
   uniform vec3 u_LightPos;
   uniform vec3 u_LightColor;
   uniform int u_SpotLightOn;
   uniform vec3 u_SpotLightPos;
   uniform vec3 u_SpotLightDir;
   uniform float u_SpotLightCutoff;
   uniform vec3 u_CameraPos;
   void main() {
      vec4 baseColor;
      if (u_whichTexture == -2) {
         baseColor = u_FragColor;
      } else if (u_whichTexture == -1) {
         baseColor = vec4(v_UV, 1.0, 1.0);
      } else if (u_whichTexture == 0) {
         baseColor = texture2D(u_Sampler0, v_UV);
      } else if (u_whichTexture == 1) {
         baseColor = texture2D(u_Sampler1, v_UV);
      } else if (u_whichTexture == 2) {
         baseColor = texture2D(u_Sampler2, v_UV);
      } else {
         baseColor = vec4(1.0, 0.2, 0.2, 1.0);
      }

      if (u_NormalViz == 1) {
         gl_FragColor = vec4(normalize(v_Normal) * 0.5 + 0.5, 1.0);
         return;
      }

      if (u_applyLighting == 0 || (u_LightOn == 0 && u_SpotLightOn == 0)) {
         gl_FragColor = baseColor;
         return;
      }

      vec3 norm    = normalize(v_Normal);
      vec3 viewDir = normalize(u_CameraPos - v_VertPos);
      vec3 lighting = vec3(0.2);

      if (u_LightOn == 1) {
         vec3 L     = normalize(u_LightPos - v_VertPos);
         float diff = max(dot(norm, L), 0.0);
         vec3 R     = reflect(-L, norm);
         float spec = pow(max(dot(viewDir, R), 0.0), 32.0);
         lighting  += u_LightColor * diff + u_LightColor * spec * 0.5;
      }

      if (u_SpotLightOn == 1) {
         vec3 toLight  = normalize(u_SpotLightPos - v_VertPos);
         vec3 spotDir  = normalize(u_SpotLightDir);
         float cosAng  = dot(spotDir, -toLight);
         if (cosAng > u_SpotLightCutoff) {
            float spotFactor = pow(cosAng, 8.0);
            float diff = max(dot(norm, toLight), 0.0);
            vec3 R     = reflect(-toLight, norm);
            float spec = pow(max(dot(viewDir, R), 0.0), 32.0);
            vec3 sc    = vec3(1.0, 0.95, 0.8);
            lighting  += spotFactor * (sc * diff + sc * spec * 0.5);
         }
      }

      gl_FragColor = vec4(baseColor.rgb * lighting, baseColor.a);
   }`;


function setupWebGL() {
   canvas = document.getElementById('asg3');
   if (!canvas) { console.log('Failed to get canvas'); return; }
   gl = getWebGLContext(canvas);
   if (!gl) { console.log('Failed to get WebGL context'); return; }
   gl.enable(gl.DEPTH_TEST);
}

function connectVariablesToGLSL() {
   if (!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)) {
      console.log('Failed to initialise shaders.'); return;
   }

   a_Position = gl.getAttribLocation(gl.program, 'a_Position');
   a_UV       = gl.getAttribLocation(gl.program, 'a_UV');
   a_Normal   = gl.getAttribLocation(gl.program, 'a_Normal');
   if (a_Position < 0 || a_UV < 0 || a_Normal < 0) {
      console.log('Failed to get attribute location(s)'); return;
   }

   u_FragColor          = gl.getUniformLocation(gl.program, 'u_FragColor');
   u_ModelMatrix        = gl.getUniformLocation(gl.program, 'u_ModelMatrix');
   u_GlobalRotateMatrix = gl.getUniformLocation(gl.program, 'u_GlobalRotateMatrix');
   u_ViewMatrix         = gl.getUniformLocation(gl.program, 'u_ViewMatrix');
   u_ProjectionMatrix   = gl.getUniformLocation(gl.program, 'u_ProjectionMatrix');
   u_whichTexture       = gl.getUniformLocation(gl.program, 'u_whichTexture');
   u_Sampler0           = gl.getUniformLocation(gl.program, 'u_Sampler0');
   u_Sampler1           = gl.getUniformLocation(gl.program, 'u_Sampler1');
   u_Sampler2           = gl.getUniformLocation(gl.program, 'u_Sampler2');
   u_applyLighting      = gl.getUniformLocation(gl.program, 'u_applyLighting');
   u_NormalViz          = gl.getUniformLocation(gl.program, 'u_NormalViz');
   u_LightOn            = gl.getUniformLocation(gl.program, 'u_LightOn');
   u_LightPos           = gl.getUniformLocation(gl.program, 'u_LightPos');
   u_LightColor         = gl.getUniformLocation(gl.program, 'u_LightColor');
   u_SpotLightOn        = gl.getUniformLocation(gl.program, 'u_SpotLightOn');
   u_SpotLightPos       = gl.getUniformLocation(gl.program, 'u_SpotLightPos');
   u_SpotLightDir       = gl.getUniformLocation(gl.program, 'u_SpotLightDir');
   u_SpotLightCutoff    = gl.getUniformLocation(gl.program, 'u_SpotLightCutoff');
   u_CameraPos          = gl.getUniformLocation(gl.program, 'u_CameraPos');

   var identityM = new Matrix4();
   gl.uniformMatrix4fv(u_ModelMatrix, false, identityM.elements);
}

function isPowerOf2(value) { return (value & (value - 1)) === 0; }

function initTextures() {
   var image0 = new Image(), image1 = new Image(), image2 = new Image();
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
   if (!texture) { console.log('Failed to create texture'); return; }
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
}

function main() {
   setupWebGL();
   connectVariablesToGLSL();

   initCubeVBO();
   initBuffers();
   buildWallsVBO();

   g_sphere1 = new Sphere();
   g_sphere1.color = [0.3, 0.6, 1.0, 1.0];

   g_sphere2 = new Sphere();
   g_sphere2.color = [1.0, 0.4, 0.3, 1.0];

   g_model = new Model();
   g_model.color = [0.8, 0.85, 0.9, 1.0];
   fetch('dragon.obj')
      .then(function(r) { return r.text(); })
      .then(function(text) { g_model.loadOBJ(text); })
      .catch(function(e) { console.log('dragon.obj failed to load:', e); });

   g_camera = new Camera();

   document.onkeydown = keydown;
   canvas.onmousemove  = function(ev) { mouseCam(ev); };
   canvas.onmouseleave = function()   { g_lastMouseX = -1; };

   document.getElementById('toggleLight').onclick = function() {
      g_lightOn = !g_lightOn;
      this.textContent = 'Point Light: ' + (g_lightOn ? 'ON' : 'OFF');
   };
   document.getElementById('toggleSpotLight').onclick = function() {
      g_spotLightOn = !g_spotLightOn;
      this.textContent = 'Spot Light: ' + (g_spotLightOn ? 'ON' : 'OFF');
   };
   document.getElementById('toggleNormalViz').onclick = function() {
      g_normalViz = !g_normalViz;
      this.textContent = 'Normal Viz: ' + (g_normalViz ? 'ON' : 'OFF');
   };
   document.getElementById('toggleAnimLight').onclick = function() {
      g_animateLight = !g_animateLight;
      this.textContent = 'Animate Light: ' + (g_animateLight ? 'ON' : 'OFF');
   };

   document.getElementById('lightAngle').oninput = function() {
      g_animateLight = false;
      document.getElementById('toggleAnimLight').textContent = 'Animate Light: OFF';
      g_lightAngle = parseFloat(this.value);
   };
   document.getElementById('lightHeight').oninput = function() {
      g_lightHeight = parseFloat(this.value);
   };
   initTextures();
   gl.clearColor(0.0, 0.0, 0.0, 1.0);
   requestAnimationFrame(tick);
}

function keydown(ev) {
   switch(ev.key) {
      case 'w': case 'W': case 'ArrowUp':    g_camera.forward();  break;
      case 's': case 'S': case 'ArrowDown':  g_camera.back();     break;
      case 'a': case 'A': case 'ArrowLeft':  g_camera.left();     break;
      case 'd': case 'D': case 'ArrowRight': g_camera.right();    break;
      case 'q': case 'Q':                    g_camera.panLeft();  break;
      case 'e': case 'E':                    g_camera.panRight(); break;
   }
   renderScene();
}

function mouseCam(ev) {
   var rect   = canvas.getBoundingClientRect();
   var mouseX = ev.clientX - rect.left;
   if (g_lastMouseX < 0) { g_lastMouseX = mouseX; return; }
   var dx = mouseX - g_lastMouseX;
   g_lastMouseX = mouseX;
   if (dx < 0) g_camera.panMLeft(-dx * 0.3);
   else if (dx > 0) g_camera.panMRight(dx * 0.3);
}

function tick() {
   g_seconds = performance.now() / 1000.0 - g_startTime;

   if (g_animateLight) {
      g_lightAngle = (g_seconds * 45) % 360;
      var slider = document.getElementById('lightAngle');
      if (slider) slider.value = g_lightAngle;
   }

   var rad = g_lightAngle * Math.PI / 180;
   g_lightPos[0] = g_lightRadius * Math.cos(rad);
   g_lightPos[1] = g_lightHeight;
   g_lightPos[2] = g_lightRadius * Math.sin(rad);

   renderScene();
   requestAnimationFrame(tick);
}

function renderScene() {
   gl.uniformMatrix4fv(u_ProjectionMatrix, false, g_camera.projMat.elements);
   gl.uniformMatrix4fv(u_ViewMatrix,       false, g_camera.viewMat.elements);

   var globalRotMat = new Matrix4();
   gl.uniformMatrix4fv(u_GlobalRotateMatrix, false, globalRotMat.elements);

   gl.uniform1i(u_NormalViz,   g_normalViz   ? 1 : 0);
   gl.uniform1i(u_LightOn,     g_lightOn     ? 1 : 0);
   gl.uniform1i(u_SpotLightOn, g_spotLightOn ? 1 : 0);
   gl.uniform3f(u_LightPos,    g_lightPos[0],   g_lightPos[1],   g_lightPos[2]);
   gl.uniform3f(u_LightColor,  1.0, 1.0, 1.0);
   gl.uniform3f(u_SpotLightPos,  g_spotLightPos[0], g_spotLightPos[1], g_spotLightPos[2]);
   gl.uniform3f(u_SpotLightDir,  g_spotLightDir[0], g_spotLightDir[1], g_spotLightDir[2]);
   gl.uniform1f(u_SpotLightCutoff, g_spotCutoff);
   gl.uniform3f(u_CameraPos,
      g_camera.eye.elements[0],
      g_camera.eye.elements[1],
      g_camera.eye.elements[2]);

   gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
   drawAllShapes();
}
