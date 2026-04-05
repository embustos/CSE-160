// DrawTriangle.js (c) 2012 matsuda
var canvas, ctx, centerX, centerY;

function main() {
  // Retrieve <canvas> element
  canvas = document.getElementById('cnv1');
  if (!canvas) {
    console.log('Failed to retrieve the <canvas> element');
    return false;
  }

  // Get the rendering context for 2DCG
  ctx = canvas.getContext('2d');

  ctx.fillStyle = 'rgba(0, 0, 0, 1.0)'; // Set color to black
  ctx.fillRect(0, 0, canvas.width, canvas.height); // Fill a rectangle with the color

  centerX = canvas.width / 2;
  centerY = canvas.height / 2;
}

function drawVector(v, color){
  ctx.strokeStyle = color;
  ctx.beginPath();
  ctx.moveTo(centerX, centerY);
  ctx.lineTo(centerX + v.elements[0]*20, centerY - v.elements[1]*20);
  ctx.stroke();
}

function handleDrawEvent(){
  var x = document.getElementById('xcoord').value;
  var y = document.getElementById('ycoord').value;
  var x2 = document.getElementById('xcoord2').value;
  var y2 = document.getElementById('ycoord2').value;
  
  // Clear Canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Black background
  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, 400, 400);

  // Draw new lines
  var v1 = new Vector3([x, y, 0.0]);
  drawVector(v1, "red");
  var v2 = new Vector3([x2, y2, 0.0]);
  drawVector(v2, "blue");
}

function angleBetween(v1, v2){
  var dot = Vector3.dot(v1, v2);
  var mag1 = v1.magnitude();
  var mag2 = v2.magnitude();
  var alpha = Math.acos(dot / (mag1 * mag2));
  alpha *= 180 / Math.PI; // Convert to degrees
  return alpha;
}

function areaTriangle(v1, v2){
  var cross = Vector3.cross(v1, v2);
  var area = cross.magnitude() / 2;
  return area;
}

function handleDrawOperationEvent(){
  var x = document.getElementById('xcoord').value;
  var y = document.getElementById('ycoord').value;
  var x2 = document.getElementById('xcoord2').value;
  var y2 = document.getElementById('ycoord2').value;
  // Clear Canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Black background
  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, 400, 400);

  // Draw new lines
  var v1 = new Vector3([x, y, 0.0]);
  drawVector(v1, "red");
  var v2 = new Vector3([x2, y2, 0.0]);
  drawVector(v2, "blue");

  // Select operation
  var op = document.getElementById('operation-select').value;

  // Perform selected operation
  if (op == "add"){
    //ADD
    var v3 = v1.add(v2);
    drawVector(v3, "green");

  } else if (op == "sub"){
    //SUBTRACT
    var v3 = v1.sub(v2);
    drawVector(v3, "green");

  } else if (op == "div"){
    //DIVIDE
    var scalar = parseFloat(document.getElementById('scalar').value);

    var v1 = v1.div(scalar);
    drawVector(v1, "green");

    var v2 = v2.div(scalar);
    drawVector(v2, "green");

  } else if (op == "mul"){
    //MULTIPLY
    var scalar = parseFloat(document.getElementById('scalar').value);

    var v1 = v1.mul(scalar);
    drawVector(v1, "green");
    
    var v2 = v2.mul(scalar);
    drawVector(v2, "green");

  } else if (op == "mag"){
    //MAGNITUDE
    var v1 = v1.magnitude();
    var v2 = v2.magnitude();
    console.log("Magnitude v1: " + v1);
    console.log("Magnitude v2: " + v2);

  } else if (op == "norm"){
    //NORMALIZE
    var v1 = v1.normalize();
    drawVector(v1, "green");
    
    var v2 = v2.normalize();
    drawVector(v2, "green");

  } else if (op == "angle"){
    //ANGLE BETWEEN
    var angle = angleBetween(v1, v2);
    console.log("Angle: " + angle);

  } else if (op == "area"){
    //AREA
    var area = areaTriangle(v1, v2);
    console.log("Area of the triangle: " + area);
  }

}
