class Cylinder {
    constructor(segments) {
        this.color  = [1.0, 1.0, 1.0, 1.0];
        this.matrix = new Matrix4();
        this._buildVBO(segments || 10);
    }

    _buildVBO(n) {
        var cx = 0.5, cy = 0.5, r = 0.5;
        var buf = [];

        for (var i = 0; i < n; i++) {
            var a1 = (i / n) * Math.PI * 2,  a2 = ((i + 1) / n) * Math.PI * 2;
            var x1 = cx + r * Math.cos(a1),   y1 = cy + r * Math.sin(a1);
            var x2 = cx + r * Math.cos(a2),   y2 = cy + r * Math.sin(a2);
            buf.push(x1,y1,0, x2,y2,0, x2,y2,1,  x1,y1,0, x2,y2,1, x1,y1,1);
            buf.push(cx,cy,0, x2,y2,0, x1,y1,0,   cx,cy,1, x1,y1,1, x2,y2,1);
        }

        this._sidesCount = n * 6;
        this._capsCount  = n * 6;

        this._vbo = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this._vbo);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(buf), gl.STATIC_DRAW);
    }

    render() {
        var rgba = this.color;
        gl.uniformMatrix4fv(u_ModelMatrix, false, this.matrix.elements);

        gl.bindBuffer(gl.ARRAY_BUFFER, this._vbo);
        gl.vertexAttribPointer(a_Position, 3, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(a_Position);

        gl.uniform4f(u_FragColor, rgba[0],      rgba[1],      rgba[2],      rgba[3]);
        gl.drawArrays(gl.TRIANGLES, 0, this._sidesCount);

        gl.uniform4f(u_FragColor, rgba[0]-.12,  rgba[1]-.12,  rgba[2]-.12,  rgba[3]);
        gl.drawArrays(gl.TRIANGLES, this._sidesCount, this._capsCount);
    }
}
