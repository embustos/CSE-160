var _cubeVBO = null;

function initCubeVBO() {
    var verts = new Float32Array([
        0,0,0, 1,1,0, 1,0,0,   0,0,0, 0,1,0, 1,1,0,   // front
        0,0,1, 1,1,1, 1,0,1,   0,0,1, 0,1,1, 1,1,1,   // back
        0,0,0, 0,0,1, 1,0,0,   1,0,0, 1,0,1, 0,0,1,   // bottom
        1,0,0, 1,1,0, 1,1,1,   1,1,1, 1,0,1, 1,0,0,   // right
        // top 
        0,1,0, 1,1,0, 1,1,1,   0,1,1, 0,1,0, 1,1,1,
        // left
        0,0,0, 0,1,0, 0,1,1,   0,1,1, 0,0,1, 0,0,0
    ]);
    _cubeVBO = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, _cubeVBO);
    gl.bufferData(gl.ARRAY_BUFFER, verts, gl.STATIC_DRAW);
}

class Cube {
    constructor() {
        this.color  = [1.0, 1.0, 1.0, 1.0];
        this.matrix = new Matrix4();
    }

    render() {
        var rgba = this.color;
        gl.uniformMatrix4fv(u_ModelMatrix, false, this.matrix.elements);

        gl.bindBuffer(gl.ARRAY_BUFFER, _cubeVBO);
        gl.vertexAttribPointer(a_Position, 3, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(a_Position);

        gl.uniform4f(u_FragColor, rgba[0],      rgba[1],      rgba[2],      rgba[3]);
        gl.drawArrays(gl.TRIANGLES, 0, 24);    

        gl.uniform4f(u_FragColor, rgba[0]-.15,  rgba[1]-.15,  rgba[2]-.15,  rgba[3]);
        gl.drawArrays(gl.TRIANGLES, 24, 6);    

        gl.uniform4f(u_FragColor, rgba[0]-.10,  rgba[1]-.10,  rgba[2]-.10,  rgba[3]);
        gl.drawArrays(gl.TRIANGLES, 30, 6);    
    }
}
