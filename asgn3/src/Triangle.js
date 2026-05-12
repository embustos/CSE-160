var g_vertexBuffer = null;

function initBuffers() {
    g_vertexBuffer = gl.createBuffer();
    if (!g_vertexBuffer) { console.log('Failed to create vertex buffer'); return; }
    gl.bindBuffer(gl.ARRAY_BUFFER, g_vertexBuffer);
}

function drawTriangle(vertices) {
    var fa = (vertices instanceof Float32Array) ? vertices : new Float32Array(vertices);
    gl.bindBuffer(gl.ARRAY_BUFFER, g_vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, fa, gl.DYNAMIC_DRAW);
    gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(a_Position);
    gl.drawArrays(gl.TRIANGLES, 0, fa.length / 2);
}

function drawTriangle3D(vertices) {
    var fa = (vertices instanceof Float32Array) ? vertices : new Float32Array(vertices);
    gl.bindBuffer(gl.ARRAY_BUFFER, g_vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, fa, gl.DYNAMIC_DRAW);
    gl.vertexAttribPointer(a_Position, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(a_Position);
    gl.drawArrays(gl.TRIANGLES, 0, fa.length / 3);
}
