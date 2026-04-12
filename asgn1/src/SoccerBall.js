function drawPicture() {
   function col(r, g, b, a) {
      gl.uniform4f(colorLoc, r, g, b, a === undefined ? 1.0 : a);
   }

   function tri(x1,y1, x2,y2, x3,y3) {
      drawTriangle([x1,y1, x2,y2, x3,y3], 0);
   }

   // ── Soccer Ball ──────────────────────────────────────────────────────────
   // white triangles
   col(1.0, 1.0, 1.0);
   tri(-0.3,  0.75,   0.3,  0.75,   0.00, 0.35);  //  1  equilateral top
   tri( -0.3,  -0.75,   0.3, -0.75,   0.00, -0.35); // 2 equilateral bottom

   // grey triangles
   col(0.75, 0.75, 0.75);
   tri(-0.3, -0.75, 0, -0.35, -0.5, -0.4); // 3 bottom middle left
   tri(0.3, -0.75, 0, -0.35, 0.5, -0.4); // 4 bottom middle right
   tri(-0.3, 0.75, 0, 0.35, -0.5, 0.4); // 5 top middle left
   tri(0.3, 0.75, 0, 0.35, 0.5, 0.4); // 6 top middle right

   // white triangles
   col(1.0, 1.0, 1.0);
   tri(-0.3, -0.75, -0.5, -0.4, -0.7, -0.4) // 7 bottom left
   tri(0.3, -0.75, 0.5, -0.4, 0.7, -0.4) // 8 bottom right
   tri(-0.3, 0.75, -0.5, 0.4, -0.7, 0.4) // 9 top left
   tri(0.3, 0.75, 0.5, 0.4, 0.7, 0.4) // 10 top right

   // grey triangles
   col(0.75, 0.75, 0.75);
   tri(-0.5, -0.4, -0.7, -0.4, -0.7, 0); // 11 bottom middle left
   tri(0.5, -0.4, 0.7, -0.4, 0.7, 0); // 12 bottom middle right
   tri(-0.7, 0, -0.7, 0.4, -0.5, 0.4); // 13 top middle left
   tri(0.7, 0, 0.7, 0.4, 0.5, 0.4); // 14 top middle right


   // ── Letter "E" ───────────────────────────────────────────────────────────
   // gold triangles
   col(1.0, 0.75, 0.0);
   tri(-0.38,  0.32,  -0.21, -0.32,  -0.38, -0.32);  // 15  spine right half
   tri(-0.38,  0.32,  -0.08,  0.17,  -0.08,  0.32);  // 16 top bar
   tri(-0.30,  0.00,  -0.16, -0.05,  -0.16,  0.05);  // 17  middle bar
   tri(-0.21, -0.32,  -0.08, -0.17,  -0.08, -0.32);  // 18  bottom bar

   // ── Letter "B" ───────────────────────────────────────────────────────────
   // gold triangles
   col(1.0, 0.75, 0.0);
   tri( 0.10,  0.32,   0.38,  0.16,   0.10,  0.00);  // 19 upper bump
   tri( 0.10,  0.00,   0.38, -0.16,   0.10, -0.32);  // 20lower bump

   // black inner triangles 
   col(0, 0, 0);
   tri( 0.16,  0.22,   0.26,  0.16,   0.16,  0.10);  // 21 upper bump inner
   tri( 0.16, -0.10,   0.26, -0.16,   0.16, -0.22);  // 22 lower bump inner

}
