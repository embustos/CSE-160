class Model {
    constructor() {
        this.color      = [0.7, 0.85, 1.0, 1.0];
        this.matrix     = new Matrix4();
        this.textureNum = -2;
        this.lit        = true;
        this._buffer    = null;
        this._vertCount = 0;
    }

    loadOBJ(text) {
        var positions = [];
        var normals   = [];
        var uvs       = [];
        var flat      = [];
        var hasVN     = false;

        var lines = text.split('\n');
        for (var i = 0; i < lines.length; i++) {
            var line = lines[i].trim();
            if (line.startsWith('v ')) {
                var p = line.split(/\s+/);
                positions.push([parseFloat(p[1]), parseFloat(p[2]), parseFloat(p[3])]);
            } else if (line.startsWith('vn ')) {
                var p = line.split(/\s+/);
                normals.push([parseFloat(p[1]), parseFloat(p[2]), parseFloat(p[3])]);
                hasVN = true;
            } else if (line.startsWith('vt ')) {
                var p = line.split(/\s+/);
                uvs.push([parseFloat(p[1]), parseFloat(p[2])]);
            } else if (line.startsWith('f ')) {
                var tokens = line.split(/\s+/).slice(1);
                for (var j = 1; j < tokens.length - 1; j++) {
                    this._pushVert(tokens[0],   positions, normals, uvs, flat);
                    this._pushVert(tokens[j],   positions, normals, uvs, flat);
                    this._pushVert(tokens[j+1], positions, normals, uvs, flat);
                }
            }
        }

        // If OBJ has no vn lines, compute flat normals from cross products
        if (!hasVN) {
            for (var i = 0; i < flat.length; i += 24) {
                var ax=flat[i],    ay=flat[i+1],  az=flat[i+2];
                var bx=flat[i+8],  by=flat[i+9],  bz=flat[i+10];
                var cx=flat[i+16], cy=flat[i+17], cz=flat[i+18];
                var ex=bx-ax, ey=by-ay, ez=bz-az;
                var fx=cx-ax, fy=cy-ay, fz=cz-az;
                var nx=ey*fz-ez*fy, ny=ez*fx-ex*fz, nz=ex*fy-ey*fx;
                var len=Math.sqrt(nx*nx+ny*ny+nz*nz);
                if (len > 0) { nx/=len; ny/=len; nz/=len; }
                flat[i+5]=nx;  flat[i+6]=ny;  flat[i+7]=nz;
                flat[i+13]=nx; flat[i+14]=ny; flat[i+15]=nz;
                flat[i+21]=nx; flat[i+22]=ny; flat[i+23]=nz;
            }
        }

        this._vertCount = flat.length / 8;
        this._buffer    = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this._buffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(flat), gl.STATIC_DRAW);
        console.log('OBJ loaded: ' + this._vertCount + ' vertices');
    }

    _pushVert(token, positions, normals, uvs, flat) {
        var p  = token.split('/');
        var vi = parseInt(p[0]) - 1;
        var ti = (p[1] && p[1].length > 0) ? parseInt(p[1]) - 1 : -1;
        var ni = (p[2] && p[2].length > 0) ? parseInt(p[2]) - 1 : -1;
        var pos = positions[vi] || [0,0,0];
        var uv  = (ti >= 0 && uvs[ti])    ? uvs[ti]    : [0,0];
        var nor = (ni >= 0 && normals[ni]) ? normals[ni] : [0,0,0];
        flat.push(pos[0],pos[1],pos[2], uv[0],uv[1], nor[0],nor[1],nor[2]);
    }

    render() {
        if (!this._buffer || this._vertCount === 0) return;
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
