var g_map = [
   [4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4],
   [4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4],
   [4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4],
   [4,0,0,2,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,3,0,0,0,0,0,4],
   [4,0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,0,0,0,0,0,4],
   [4,0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,0,0,0,0,0,4],
   [4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4],
   [4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4],
   [4,0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,0,4],
   [4,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,4],
   [4,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,4],
   [4,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,4],
   [4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4],
   [4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4],
   [4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4],
   [4,0,0,0,0,0,0,0,0,0,0,0,0,0,2,2,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4],
   [4,0,0,0,0,0,0,0,0,0,0,0,0,0,2,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4],
   [4,0,0,0,0,0,0,0,0,0,0,0,0,0,2,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4],
   [4,0,0,0,0,0,0,0,0,0,0,0,0,0,2,2,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4],
   [4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4],
   [4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4],
   [4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4],
   [4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4],
   [4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4],
   [4,0,0,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4],
   [4,0,0,3,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4],
   [4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4],
   [4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4],
   [4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4],
   [4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4],
   [4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4],
   [4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4],
];

var g_sphere1 = null;
var g_sphere2 = null;
var g_model   = null;

var g_wallsVBO    = null;
var g_wallVertCnt = 0;

function buildWallsVBO() {
   var cubeCount = 0;
   for (var x = 0; x < 32; x++)
      for (var z = 0; z < 32; z++) cubeCount += g_map[x][z];

   var FLOATS_PER_CUBE = 36 * 8;
   var data = new Float32Array(cubeCount * FLOATS_PER_CUBE);
   var o = 0;

   for (var x = 0; x < 32; x++) {
      for (var z = 0; z < 32; z++) {
         var h = g_map[x][z];
         if (h === 0) continue;
         for (var y = 0; y < h; y++) {
            var tx = x - 16, ty = y - 0.25, tz = z - 16;
            for (var i = 0; i < _UNIT_CUBE.length; i += 8) {
               data[o++] = _UNIT_CUBE[i  ] + tx;
               data[o++] = _UNIT_CUBE[i+1] + ty;
               data[o++] = _UNIT_CUBE[i+2] + tz;
               data[o++] = _UNIT_CUBE[i+3];
               data[o++] = _UNIT_CUBE[i+4];
               // inward-facing normals: camera and light are inside the map
               data[o++] = -_UNIT_CUBE[i+5];
               data[o++] = -_UNIT_CUBE[i+6];
               data[o++] = -_UNIT_CUBE[i+7];
            }
         }
      }
   }

   g_wallVertCnt = cubeCount * 36;
   g_wallsVBO    = gl.createBuffer();
   gl.bindBuffer(gl.ARRAY_BUFFER, g_wallsVBO);
   gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);
   console.log('Walls VBO: ' + cubeCount + ' cubes, ' +
               (data.byteLength / 1024).toFixed(1) + ' KB');
}

function drawMap() {
   gl.uniform1i(u_whichTexture, 2);
   gl.uniform4f(u_FragColor, 0.8, 0.75, 0.6, 1.0);
   gl.uniform1i(u_applyLighting, 1);

   var I = new Matrix4();
   gl.uniformMatrix4fv(u_ModelMatrix, false, I.elements);

   var F = Float32Array.BYTES_PER_ELEMENT;
   gl.bindBuffer(gl.ARRAY_BUFFER, g_wallsVBO);
   gl.vertexAttribPointer(a_Position, 3, gl.FLOAT, false, F * 8, 0);
   gl.enableVertexAttribArray(a_Position);
   gl.vertexAttribPointer(a_UV,       2, gl.FLOAT, false, F * 8, F * 3);
   gl.enableVertexAttribArray(a_UV);
   gl.vertexAttribPointer(a_Normal,   3, gl.FLOAT, false, F * 8, F * 5);
   gl.enableVertexAttribArray(a_Normal);

   gl.drawArrays(gl.TRIANGLES, 0, g_wallVertCnt);
}

function drawAllShapes() {
   var sky = new Cube();
   sky.color      = [0.53, 0.81, 0.92, 1.0];
   sky.textureNum = 1;
   sky.lit        = false;
   sky.matrix.scale(50, 50, 50);
   sky.matrix.translate(-0.5, -0.5, -0.5);
   sky.render();

   var floor = new Cube();
   floor.color      = [0.2, 0.9, 0.4, 1.0];
   floor.textureNum = 0;
   floor.lit        = true;
   floor.matrix.translate(0, -0.35, 0);
   floor.matrix.scale(32, 0.1, 32);
   floor.matrix.translate(-0.5, 0, -0.5);
   floor.render();

   drawMap();

   if (g_sphere1) {
      g_sphere1.matrix = new Matrix4();
      g_sphere1.matrix.translate(-3, 0.8, 2);
      g_sphere1.render();
   }

   if (g_sphere2) {
      g_sphere2.matrix = new Matrix4();
      g_sphere2.matrix.translate(4, 0.8, -2);
      g_sphere2.render();
   }

   if (g_model) {
      g_model.matrix = new Matrix4();
      g_model.matrix.translate(0, 0.46, -6);
      g_model.matrix.rotate(180, 0, 1, 0);
      g_model.matrix.scale(0.3, 0.3, 0.3);
      g_model.render();
   }

   var lc = new Cube();
   lc.color      = [1.0, 1.0, 0.2, 1.0];
   lc.textureNum = -2;
   lc.lit        = false;
   lc.matrix.translate(g_lightPos[0], g_lightPos[1], g_lightPos[2]);
   lc.matrix.scale(0.3, 0.3, 0.3);
   lc.matrix.translate(-0.5, -0.5, -0.5);
   lc.render();

   var sc = new Cube();
   sc.color      = [1.0, 0.95, 0.7, 1.0];
   sc.textureNum = -2;
   sc.lit        = false;
   sc.matrix.translate(g_spotLightPos[0], g_spotLightPos[1], g_spotLightPos[2]);
   sc.matrix.scale(0.4, 0.4, 0.4);
   sc.matrix.translate(-0.5, -0.5, -0.5);
   sc.render();
}
