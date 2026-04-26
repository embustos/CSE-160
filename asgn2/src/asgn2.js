// Global variables
var gl;
var canvas;
var a_Position;
var u_FragColor;
var u_ModelMatrix;
var u_GlobalRotateMatrix;


var gAnimalGlobalRotation = 0;
var g_jointAngle1 = 0;   // upper leg
var g_jointAngle2 = 0;   // lower leg
var g_jointAngle3 = 0;   // paw (3rd joint in chain)
var g_tailAngle   = 0;   // tail wag
var g_Animation   = false;


var g_mouseDown = false;
var g_mouseLastX = 0;


var g_poked    = false;
var g_pokeTime = 0;


var g_startTime = performance.now() / 1000.0;
var g_seconds   = 0;


var g_lastFrameTime = performance.now();
var g_frameCount    = 0;


var VSHADER_SOURCE =
    'attribute vec4 a_Position;\n' +
    'uniform mat4 u_ModelMatrix;\n' +
    'uniform mat4 u_GlobalRotateMatrix;\n' +
    'void main() {\n' +
    '  gl_Position = u_GlobalRotateMatrix * u_ModelMatrix * a_Position;\n' +
    '}\n';


var FSHADER_SOURCE =
    'precision mediump float;\n' +
    'uniform vec4 u_FragColor;\n' +
    'void main() {\n' +
    '  gl_FragColor = u_FragColor;\n' +
    '}\n';

function setupWebGL() {
    canvas = document.getElementById('asg2');
    if (!canvas) { console.log('Failed to retrieve canvas'); return; }
    gl = getWebGLContext(canvas);
    if (!gl)     { console.log('Failed to get WebGL context'); return; }
    gl.enable(gl.DEPTH_TEST);
}

function connectVariablesToGLSL() {
    if (!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)) {
        console.log('Failed to initialize shaders'); return;
    }
    a_Position = gl.getAttribLocation(gl.program, 'a_Position');
    if (a_Position < 0) { console.log('Failed to get a_Position'); return; }

    u_FragColor = gl.getUniformLocation(gl.program, 'u_FragColor');
    if (!u_FragColor) { console.log('Failed to get u_FragColor'); return; }

    u_ModelMatrix = gl.getUniformLocation(gl.program, 'u_ModelMatrix');
    if (!u_ModelMatrix) { console.log('Failed to get u_ModelMatrix'); return; }

    u_GlobalRotateMatrix = gl.getUniformLocation(gl.program, 'u_GlobalRotateMatrix');
    if (!u_GlobalRotateMatrix) { console.log('Failed to get u_GlobalRotateMatrix'); return; }

    gl.uniformMatrix4fv(u_ModelMatrix, false, new Matrix4().elements);
}

function addActionsForHtmlUI() {
    document.getElementById('camera').addEventListener('input', function() {
        gAnimalGlobalRotation = this.value;
        renderScene();
    });

    // Joint sliders
    document.getElementById('joint1').addEventListener('input', function() {
        g_jointAngle1 = this.value;
        renderScene();
    });
    document.getElementById('joint2').addEventListener('input', function() {
        g_jointAngle2 = this.value;
        renderScene();
    });
    document.getElementById('joint3').addEventListener('input', function() {
        g_jointAngle3 = this.value;
        renderScene();
    });
    document.getElementById('tail').addEventListener('input', function() {
        g_tailAngle = this.value;
        renderScene();
    });

    document.getElementById('animate_on').onclick  = function() { g_Animation = true; };
    document.getElementById('animate_off').onclick = function() { g_Animation = false; };

    canvas.addEventListener('mousedown', function(e) {
        if (e.shiftKey) {
            g_poked    = true;
            g_pokeTime = g_seconds;
        } else {
            g_mouseDown  = true;
            g_mouseLastX = e.clientX;
        }
    });
    canvas.addEventListener('mousemove', function(e) {
        if (!g_mouseDown) return;
        gAnimalGlobalRotation += (e.clientX - g_mouseLastX) * 0.5;
        g_mouseLastX = e.clientX;
        renderScene();
    });
    canvas.addEventListener('mouseup', function() { g_mouseDown = false; });
}

function updateAnimationAngles() {
    if (g_poked) {
        var elapsed = g_seconds - g_pokeTime;
        if (elapsed < 1.5) {
            var s = Math.sin(elapsed * 10);
            g_jointAngle1 = 30 * s;
            g_jointAngle2 = 15 * Math.abs(s);
            g_jointAngle3 = 10 * Math.abs(s);
            g_tailAngle   = 60 * s;
        } else {
            g_poked       = false;
            g_jointAngle1 = 0;
            g_jointAngle2 = 0;
            g_jointAngle3 = 0;
            g_tailAngle   = 0;
        }
        return;
    }

    if (g_Animation) {
        g_jointAngle1 = 20 * Math.sin(g_seconds * 3);
        g_jointAngle2 = 10 + 10 * Math.sin(g_seconds * 3 + Math.PI / 2);
        g_jointAngle3 = 5 + 5 * Math.sin(g_seconds * 3 + Math.PI / 2);
        g_tailAngle   = 20 * Math.sin(g_seconds * 2);
    }
}

function updatePerformance() {
    g_frameCount++;
    var now     = performance.now();
    var elapsed = now - g_lastFrameTime;
    if (elapsed >= 1000) {
        var fps = Math.round(g_frameCount * 1000 / elapsed);
        document.getElementById('perf').innerHTML = 'FPS: ' + fps;
        g_frameCount    = 0;
        g_lastFrameTime = now;
    }
}

function tick() {
    g_seconds = performance.now() / 1000.0 - g_startTime;
    updateAnimationAngles();
    renderScene();
    updatePerformance();
    requestAnimationFrame(tick);
}

function renderScene() {
    g_globalRotMat.setIdentity();
    g_globalRotMat.rotate(gAnimalGlobalRotation, 0, 1, 0);
    gl.uniformMatrix4fv(u_GlobalRotateMatrix, false, g_globalRotMat.elements);

    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    drawAllShapes();
}

function main() {
    setupWebGL();
    connectVariablesToGLSL();
    initBuffers();      
    initCubeVBO();      
    initShapes();      
    addActionsForHtmlUI();

    gl.clearColor(0.1, 0.1, 0.15, 1.0);

    requestAnimationFrame(tick);
}
