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


var g_wallsVBO     = null;
var g_wallVertCnt  = 0;

function buildWallsVBO() {
   var cubeCount = 0;
   for (var x = 0; x < 32; x++) {
      for (var z = 0; z < 32; z++) cubeCount += g_map[x][z];
   }

   var FLOATS_PER_CUBE = 36 * 5;
   var data = new Float32Array(cubeCount * FLOATS_PER_CUBE);
   var o = 0;

   for (var x = 0; x < 32; x++) {
      for (var z = 0; z < 32; z++) {
         var h = g_map[x][z];
         if (h === 0) continue;
         for (var y = 0; y < h; y++) {
            var tx = x - 16, ty = y - 0.25, tz = z - 16;
            for (var i = 0; i < _UNIT_CUBE.length; i += 5) {
               data[o++] = _UNIT_CUBE[i  ] + tx;
               data[o++] = _UNIT_CUBE[i+1] + ty;
               data[o++] = _UNIT_CUBE[i+2] + tz;
               data[o++] = _UNIT_CUBE[i+3];
               data[o++] = _UNIT_CUBE[i+4];
            }
         }
      }
   }

   g_wallVertCnt = cubeCount * 36;
   g_wallsVBO = gl.createBuffer();
   gl.bindBuffer(gl.ARRAY_BUFFER, g_wallsVBO);
   gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);

   console.log('Walls VBO: ' + cubeCount + ' cubes, ' +
               (data.byteLength / 1024).toFixed(1) + ' KB');
}

function drawMap() {
   gl.uniform1i(u_whichTexture, 2);
   gl.uniform4f(u_FragColor, 0.8, 0.75, 0.6, 1.0);

   var I = new Matrix4();
   gl.uniformMatrix4fv(u_ModelMatrix, false, I.elements);

   var F = Float32Array.BYTES_PER_ELEMENT;
   gl.bindBuffer(gl.ARRAY_BUFFER, g_wallsVBO);
   gl.vertexAttribPointer(a_Position, 3, gl.FLOAT, false, F * 5, 0);
   gl.enableVertexAttribArray(a_Position);
   gl.vertexAttribPointer(a_UV,       2, gl.FLOAT, false, F * 5, F * 3);
   gl.enableVertexAttribArray(a_UV);

   gl.drawArrays(gl.TRIANGLES, 0, g_wallVertCnt);
}


var g_gems = [
   { pos: [-5, 0.4, -5], col: [1.0, 0.85, 0.2, 1.0], collected: false, name: 'Sun Gem'  },
   { pos: [ 8, 0.4,  4], col: [0.75, 0.3, 1.0, 1.0], collected: false, name: 'Star Gem' },
   { pos: [-7, 0.4,  9], col: [0.2, 1.0, 0.75, 1.0], collected: false, name: 'Sea Gem'  },
];

function drawTreasures() {
   var px = g_camera.eye.elements[0];
   var pz = g_camera.eye.elements[2];

   for (var i = 0; i < g_gems.length; i++) {
      var G = g_gems[i];
      if (G.collected) continue;

      var dx = px - G.pos[0], dz = pz - G.pos[2];
      if (dx * dx + dz * dz < 1.5 * 1.5) {
         G.collected = true;
         updateStoryUI();
         continue;
      }

      var c = new Cube();
      c.color      = G.col;
      c.textureNum = -2;
      c.matrix.translate(G.pos[0], G.pos[1], G.pos[2]);
      c.matrix.rotate(g_seconds * 45 + i * 30, 0, 1, 0);
      c.matrix.scale(0.3, 0.3, 0.3);
      c.matrix.translate(-0.5, -0.5, -0.5);
      c.renderfast();
   }
}

function updateStoryUI() {
   var el  = document.getElementById('story');
   var btn = document.getElementById('restart');
   if (!el) return;

   var got = 0, missing = [];
   for (var i = 0; i < g_gems.length; i++) {
      if (g_gems[i].collected) got++;
      else missing.push(g_gems[i].name);
   }
   if (got === g_gems.length) {
      el.innerHTML = '<b>All gems recovered!</b> The garden is whole again.';
      if (btn) btn.style.display = 'inline-block';
   } else {
      el.innerHTML = 'Gems found: <b>' + got + ' / ' + g_gems.length +
                     '</b> &nbsp;|&nbsp; Still missing: ' + missing.join(', ');
      if (btn) btn.style.display = 'none';
   }
}

var g_originalMap = null;

function snapshotOriginalMap() {
   g_originalMap = [];
   for (var i = 0; i < g_map.length; i++) {
      g_originalMap.push(g_map[i].slice());
   }
}

function restartGame() {
   for (var x = 0; x < 32; x++) {
      for (var z = 0; z < 32; z++) {
         g_map[x][z] = g_originalMap[x][z];
      }
   }
   buildWallsVBO();

   for (var i = 0; i < g_gems.length; i++) g_gems[i].collected = false;

   g_camera.reset();

   updateStoryUI();
}


function drawAllShapes() {
   var sky = new Cube();
   sky.color = [0.53, 0.81, 0.92, 1.0];
   sky.textureNum = 1;
   sky.matrix.scale(50, 50, 50);
   sky.matrix.translate(-0.5, -0.5, -0.5);
   sky.render();

   var floor = new Cube();
   floor.color = [0.2, 0.9, 0.4, 1.0];
   floor.textureNum = 0;
   floor.matrix.translate(0, -0.35, 0);
   floor.matrix.scale(32, 0.1, 32);
   floor.matrix.translate(-0.5, 0, -0.5);
   floor.render();

   drawMap();

   drawTreasures();
}
