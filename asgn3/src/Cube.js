var _UNIT_CUBE = [
    0,0,0, 0,0,   1,0,0, 1,0,   1,1,0, 1,1,
    0,0,0, 0,0,   1,1,0, 1,1,   0,1,0, 0,1,
    1,0,1, 0,0,   0,0,1, 1,0,   0,1,1, 1,1,
    1,0,1, 0,0,   0,1,1, 1,1,   1,1,1, 0,1,
    0,1,0, 0,0,   1,1,0, 1,0,   1,1,1, 1,1,
    0,1,0, 0,0,   1,1,1, 1,1,   0,1,1, 0,1,
    0,0,1, 0,0,   1,0,1, 1,0,   1,0,0, 1,1,
    0,0,1, 0,0,   1,0,0, 1,1,   0,0,0, 0,1,
    1,0,0, 0,0,   1,1,0, 0,1,   1,1,1, 1,1,
    1,0,0, 0,0,   1,1,1, 1,1,   1,0,1, 1,0,
    0,0,1, 0,0,   0,1,1, 0,1,   0,1,0, 1,1,
    0,0,1, 0,0,   0,1,0, 1,1,   0,0,0, 1,0,
];

var _cubeVerts = null;

function initCubeVBO() {
    _cubeVerts = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, _cubeVerts);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(_UNIT_CUBE), gl.STATIC_DRAW);
}

class Cube {
    constructor() {
        this.color     = [1.0, 1.0, 1.0, 1.0];
        this.matrix    = new Matrix4();
        this.textureNum = -2;
    }

    _bindAndDraw() {
        gl.uniform1i(u_whichTexture, this.textureNum);
        gl.uniform4f(u_FragColor,
            this.color[0], this.color[1], this.color[2], this.color[3]);
        gl.uniformMatrix4fv(u_ModelMatrix, false, this.matrix.elements);

        var F = Float32Array.BYTES_PER_ELEMENT;
        gl.bindBuffer(gl.ARRAY_BUFFER, _cubeVerts);
        gl.vertexAttribPointer(a_Position, 3, gl.FLOAT, false, F * 5, 0);
        gl.enableVertexAttribArray(a_Position);
        gl.vertexAttribPointer(a_UV, 2, gl.FLOAT, false, F * 5, F * 3);
        gl.enableVertexAttribArray(a_UV);

        gl.drawArrays(gl.TRIANGLES, 0, 36);
    }

    render() { this._bindAndDraw(); }

    renderfast() { this._bindAndDraw(); }
}
