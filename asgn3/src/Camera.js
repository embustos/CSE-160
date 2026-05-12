Vector3.prototype.set = function(src) {
    var s = src.elements, v = this.elements;
    v[0] = s[0]; v[1] = s[1]; v[2] = s[2];
    return this;
};
Vector3.prototype.add = function(other) {
    var o = other.elements, v = this.elements;
    v[0] += o[0]; v[1] += o[1]; v[2] += o[2];
    return this;
};
Vector3.prototype.sub = function(other) {
    var o = other.elements, v = this.elements;
    v[0] -= o[0]; v[1] -= o[1]; v[2] -= o[2];
    return this;
};
Vector3.prototype.mul = function(scalar) {
    var v = this.elements;
    v[0] *= scalar; v[1] *= scalar; v[2] *= scalar;
    return this;
};
Vector3.cross = function(a, b) {
    var ae = a.elements, be = b.elements;
    return new Vector3([
        ae[1]*be[2] - ae[2]*be[1],
        ae[2]*be[0] - ae[0]*be[2],
        ae[0]*be[1] - ae[1]*be[0]
    ]);
};

class Camera {
   constructor() {
      this.fov = 60;
      this.eye = new Vector3([0, 0.5, 3]);
      this.at  = new Vector3([0, 0, -100]);
      this.up  = new Vector3([0, 1, 0]);

      this.viewMat = new Matrix4();
      this.projMat = new Matrix4();

      this._updateViewMatrix();
      this.projMat.setPerspective(this.fov, canvas.width / canvas.height, 0.1, 1000);
   }

   _updateViewMatrix() {
      this.viewMat.setLookAt(
         this.eye.elements[0], this.eye.elements[1], this.eye.elements[2],
         this.at.elements[0],  this.at.elements[1],  this.at.elements[2],
         this.up.elements[0],  this.up.elements[1],  this.up.elements[2]
      );
   }

   reset() {
      this.eye = new Vector3([0, 0.5, 3]);
      this.at  = new Vector3([0, 0, -100]);
      this.up  = new Vector3([0, 1, 0]);
      this._updateViewMatrix();
   }

   forward() {
      var f = new Vector3();
      f.set(this.at).sub(this.eye).normalize().mul(0.2);
      this.eye.add(f);
      this.at.add(f);
      this._updateViewMatrix();
   }

   back() {
      var f = new Vector3();
      f.set(this.at).sub(this.eye).normalize().mul(0.2);
      this.eye.sub(f);
      this.at.sub(f);
      this._updateViewMatrix();
   }

   left() {
      var f = new Vector3();
      f.set(this.at).sub(this.eye);
      var s = Vector3.cross(this.up, f);
      s.normalize().mul(0.15);
      this.eye.add(s);
      this.at.add(s);
      this._updateViewMatrix();
   }

   right() {
      var f = new Vector3();
      f.set(this.at).sub(this.eye);
      var s = Vector3.cross(f, this.up);
      s.normalize().mul(0.15);
      this.eye.add(s);
      this.at.add(s);
      this._updateViewMatrix();
   }

   panLeft() { this._pan(10); }

   panRight() { this._pan(-10); }

   panMLeft(deg) { this._pan(deg); }

   panMRight(deg) { this._pan(-deg); }

   _pan(deg) {
      var f = new Vector3();
      f.set(this.at).sub(this.eye);

      var rotMat = new Matrix4();
      rotMat.setRotate(deg, this.up.elements[0], this.up.elements[1], this.up.elements[2]);

      var f_prime = rotMat.multiplyVector3(f);

      var newAt = new Vector3();
      newAt.set(this.eye).add(f_prime);
      this.at = newAt;

      this._updateViewMatrix();
   }
}
