class Triangle {
   constructor(){
      this.type = 'triangle';
      this.position = [0.0, 0.0, 0.0];
      this.color = [1.0, 1.0, 1.0, 1.0];
      this.size = 5.0;
      this.outline = 0;
   }

   render(){
      var xy = this.position;
      var rgba = this.color;
      var sz = this.size;

      gl.uniform4f(colorLoc, rgba[0], rgba[1], rgba[2], rgba[3]);
      gl.uniform1f(sizeLoc, sz);

      var d = sz / 20.0;
      drawTriangle([xy[0]-d/2, xy[1]-d/2, xy[0]+d/2, xy[1]-d/2, xy[0], xy[1]+d/2], this.outline);
   }
}

function drawTriangle(verts, outline){
   var n = 3;
   var buf = gl.createBuffer();
   if (!buf) {
      console.log('Failed to create buffer');
      return -1;
   }

   gl.bindBuffer(gl.ARRAY_BUFFER, buf);
   gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(verts), gl.DYNAMIC_DRAW);
   gl.vertexAttribPointer(attribLoc, 2, gl.FLOAT, false, 0, 0);
   gl.enableVertexAttribArray(attribLoc);

   if (outline == 0) {
      gl.drawArrays(gl.TRIANGLES, 0, n);
   } else if (outline == 1) {
      gl.drawArrays(gl.LINE_LOOP, 0, n);
   }
}
