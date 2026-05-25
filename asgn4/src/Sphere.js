class Sphere {
    constructor() {
        this.color      = [1.0, 1.0, 1.0, 1.0];
        this.matrix     = new Matrix4();
        this.textureNum = -2;
        this.lit        = true;
        this._buffer    = null;
        this._vertCount = 0;
        this._buildMesh(20, 20);
    }

    _buildMesh(latBands, lonBands) {
        var verts = [];
        for (var lat = 0; lat <= latBands; lat++) {
            var theta    = lat * Math.PI / latBands;
            var sinTheta = Math.sin(theta);
            var cosTheta = Math.cos(theta);
            for (var lon = 0; lon <= lonBands; lon++) {
                var phi    = lon * 2.0 * Math.PI / lonBands;
                var x = Math.cos(phi) * sinTheta;
                var y = cosTheta;
                var z = Math.sin(phi) * sinTheta;
                var u = 1.0 - (lon / lonBands);
                var v = 1.0 - (lat / latBands);
                verts.push(x, y, z, u, v, x, y, z);
            }
        }

        var indices = [];
        for (var lat = 0; lat < latBands; lat++) {
            for (var lon = 0; lon < lonBands; lon++) {
                var first  = (lat * (lonBands + 1)) + lon;
                var second = first + lonBands + 1;
                indices.push(first, second, first + 1);
                indices.push(second, second + 1, first + 1);
            }
        }

        var flat = [];
        for (var i = 0; i < indices.length; i++) {
            var idx = indices[i] * 8;
            for (var j = 0; j < 8; j++) flat.push(verts[idx + j]);
        }

        this._vertCount = flat.length / 8;
        this._buffer    = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this._buffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(flat), gl.STATIC_DRAW);
    }

    render() {
        gl.uniform1i(u_whichTexture, this.textureNum);
        gl.uniform4f(u_FragColor, this.color[0], this.color[1], this.color[2], this.color[3]);
        gl.uniformMatrix4fv(u_ModelMatrix, false, this.matrix.elements);
        gl.uniform1i(u_applyLighting, this.lit ? 1 : 0);

        var F = Float32Array.BYTES_PER_ELEMENT;
        gl.bindBuffer(gl.ARRAY_BUFFER, this._buffer);
        gl.vertexAttribPointer(a_Position, 3, gl.FLOAT, false, F * 8, 0);
        gl.enableVertexAttribArray(a_Position);
        gl.vertexAttribPointer(a_UV, 2, gl.FLOAT, false, F * 8, F * 3);
        gl.enableVertexAttribArray(a_UV);
        gl.vertexAttribPointer(a_Normal, 3, gl.FLOAT, false, F * 8, F * 5);
        gl.enableVertexAttribArray(a_Normal);

        gl.drawArrays(gl.TRIANGLES, 0, this._vertCount);
    }
}
