class Circle {
   constructor(){
      this.type = 'circle';
      this.position = [0.0, 0.0, 0.0];
      this.color = [1.0, 1.0, 1.0, 1.0];
      this.size = 5.0;
      this.sCount = 12;
      this.outline = 0;
   }

   render() {
      var xy = this.position;
      var rgba = this.color;
      var sz = this.size;

      gl.uniform4f(colorLoc, rgba[0], rgba[1], rgba[2], rgba[3]);

      var delta = sz / 40.0;
      var step = 360 / this.sCount;

      if (this.outline == 0) {
         for (var angle = 0; angle <= 360; angle += step) {
            let a1 = angle, a2 = angle + step;
            let v1 = [Math.cos(a1 * Math.PI / 180) * delta, Math.sin(a1 * Math.PI / 180) * delta];
            let v2 = [Math.cos(a2 * Math.PI / 180) * delta, Math.sin(a2 * Math.PI / 180) * delta];
            let p1 = [xy[0] + v1[0], xy[1] + v1[1]];
            let p2 = [xy[0] + v2[0], xy[1] + v2[1]];
            drawTriangle([xy[0], xy[1], p1[0], p1[1], p2[0], p2[1]], this.outline);
         }
      } else if (this.outline == 1) {
         drawCircle(xy[0], xy[1], this.outline, this.sCount, 11 - Math.round(sz));
      }
   }
}

function drawCircle(x, y, outline, sCount, sz){
   var theta = Math.PI / sCount;
   var idx = 0;
   var n = 0;
   var verts = new Float32Array(48);

   for (var angle = 0; angle <= (2 * Math.PI); angle += theta) {
      verts[idx++] = x + (1 / (1.5 * sz)) * Math.cos(n * theta);
      verts[idx++] = y + (1 / (1.5 * sz)) * Math.sin(n * theta);
      n++;
   }
   n--;

   var buf = gl.createBuffer();
   if (!buf) {
      console.log('Failed to create buffer');
      return -1;
   }

   gl.bindBuffer(gl.ARRAY_BUFFER, buf);
   gl.bufferData(gl.ARRAY_BUFFER, verts, gl.DYNAMIC_DRAW);
   gl.vertexAttribPointer(attribLoc, 2, gl.FLOAT, false, 0, 0);
   gl.enableVertexAttribArray(attribLoc);

   if (outline == 1) {
      gl.drawArrays(gl.LINE_LOOP, 0, n);
   } else if (outline == 0) {
      gl.drawArrays(gl.TRIANGLE_FAN, 0, n);
   }
}
