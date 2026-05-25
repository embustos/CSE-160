// stride: [x,y,z, u,v, nx,ny,nz] = 8 floats per vertex
var _UNIT_CUBE = [
    0,0,0, 0,0, 0,0,-1,   1,0,0, 1,0, 0,0,-1,   1,1,0, 1,1, 0,0,-1,
    0,0,0, 0,0, 0,0,-1,   1,1,0, 1,1, 0,0,-1,   0,1,0, 0,1, 0,0,-1,
    1,0,1, 0,0, 0,0,1,    0,0,1, 1,0, 0,0,1,    0,1,1, 1,1, 0,0,1,
    1,0,1, 0,0, 0,0,1,    0,1,1, 1,1, 0,0,1,    1,1,1, 0,1, 0,0,1,
    0,1,0, 0,0, 0,1,0,    1,1,0, 1,0, 0,1,0,    1,1,1, 1,1, 0,1,0,
    0,1,0, 0,0, 0,1,0,    1,1,1, 1,1, 0,1,0,    0,1,1, 0,1, 0,1,0,
    0,0,1, 0,0, 0,-1,0,   1,0,1, 1,0, 0,-1,0,   1,0,0, 1,1, 0,-1,0,
    0,0,1, 0,0, 0,-1,0,   1,0,0, 1,1, 0,-1,0,   0,0,0, 0,1, 0,-1,0,
    1,0,0, 0,0, 1,0,0,    1,1,0, 0,1, 1,0,0,    1,1,1, 1,1, 1,0,0,
    1,0,0, 0,0, 1,0,0,    1,1,1, 1,1, 1,0,0,    1,0,1, 1,0, 1,0,0,
    0,0,1, 0,0, -1,0,0,   0,1,1, 0,1, -1,0,0,   0,1,0, 1,1, -1,0,0,
    0,0,1, 0,0, -1,0,0,   0,1,0, 1,1, -1,0,0,   0,0,0, 1,0, -1,0,0,
];

var _cubeVerts = null;

function initCubeVBO() {
    _cubeVerts = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, _cubeVerts);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(_UNIT_CUBE), gl.STATIC_DRAW);
}

class Cube {
    constructor() {
        this.color      = [1.0, 1.0, 1.0, 1.0];
        this.matrix     = new Matrix4();
        this.textureNum = -2;
        this.lit        = true;
    }

    _bindAndDraw() {
        gl.uniform1i(u_whichTexture, this.textureNum);
        gl.uniform4f(u_FragColor, this.color[0], this.color[1], this.color[2], this.color[3]);
        gl.uniformMatrix4fv(u_ModelMatrix, false, this.matrix.elements);
        gl.uniform1i(u_applyLighting, this.lit ? 1 : 0);

        var F = Float32Array.BYTES_PER_ELEMENT;
        gl.bindBuffer(gl.ARRAY_BUFFER, _cubeVerts);
        gl.vertexAttribPointer(a_Position, 3, gl.FLOAT, false, F * 8, 0);
        gl.enableVertexAttribArray(a_Position);
        gl.vertexAttribPointer(a_UV, 2, gl.FLOAT, false, F * 8, F * 3);
        gl.enableVertexAttribArray(a_UV);
        gl.vertexAttribPointer(a_Normal, 3, gl.FLOAT, false, F * 8, F * 5);
        gl.enableVertexAttribArray(a_Normal);

        gl.drawArrays(gl.TRIANGLES, 0, 36);
    }

    render()     { this._bindAndDraw(); }
    renderfast() { this._bindAndDraw(); }
}
