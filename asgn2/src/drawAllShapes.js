var C_ORANGE = [0.85, 0.40, 0.08, 1.0];
var C_CREAM  = [0.92, 0.85, 0.73, 1.0];
var C_WHITE  = [0.95, 0.93, 0.88, 1.0];
var C_BLACK  = [0.08, 0.06, 0.06, 1.0];
var C_PINK   = [0.85, 0.50, 0.45, 1.0];

var g_body, g_belly, g_chest, g_haunch;

var g_skull, g_jaw;
var g_snout;             
var g_nose;

var g_eyeL, g_eyeR;


var g_earL, g_earR;      
var g_earInL, g_earInR;   

var g_tailBase, g_tailTip;
var g_tailCoord;

var g_legs = [];
var g_legCoords = [];    

var g_globalRotMat;

function initShapes() {
    // Body 
    g_body   = new Cube(); g_body.color   = C_ORANGE;
    g_belly  = new Cube(); g_belly.color  = C_WHITE;
    g_chest  = new Cube(); g_chest.color  = C_ORANGE;
    g_haunch = new Cube(); g_haunch.color = C_ORANGE;

    // Head 
    g_skull = new Cube(); g_skull.color = C_ORANGE;
    g_jaw   = new Cube(); g_jaw.color   = C_ORANGE;
    g_snout = new Cone(10); g_snout.color = C_CREAM;
    g_nose  = new Cube(); g_nose.color  = C_BLACK;

    // Eyes 
    g_eyeL = new Cube(); g_eyeL.color = C_BLACK;
    g_eyeR = new Cube(); g_eyeR.color = C_BLACK;

    // Ears 
    g_earL   = new Cone(4); g_earL.color   = C_ORANGE;
    g_earR   = new Cone(4); g_earR.color   = C_ORANGE;
    g_earInL = new Cone(4); g_earInL.color = C_PINK;
    g_earInR = new Cone(4); g_earInR.color = C_PINK;

    // Tail 
    g_tailBase  = new Cube(); g_tailBase.color = C_ORANGE;
    g_tailTip   = new Cube(); g_tailTip.color  = C_WHITE;
    g_tailCoord = new Matrix4();

    //  Legs
    for (var i = 0; i < 4; i++) {
        g_legs.push([new Cube(), new Cube(), new Cube()]);
        g_legs[i][0].color = C_ORANGE;   // upper
        g_legs[i][1].color = C_BLACK;    // lower
        g_legs[i][2].color = C_BLACK;    // paw
        g_legCoords.push([new Matrix4(), new Matrix4()]);
    }

    g_globalRotMat = new Matrix4();
}

function drawAllShapes() {

    // BODY 
    g_body.matrix.setIdentity();
    g_body.matrix.scale(0.30, 0.22, 0.46);
    g_body.matrix.translate(-0.5, 0.0, -0.5);
    g_body.render();

    g_belly.matrix.setIdentity();
    g_belly.matrix.scale(0.18, 0.05, 0.34);
    g_belly.matrix.translate(-0.5, -0.09, -0.5);
    g_belly.render();

    // Chest 
    g_chest.matrix.setIdentity();
    g_chest.matrix.scale(0.32, 0.16, 0.10);
    g_chest.matrix.translate(-0.5, 0.25, -2.3);
    g_chest.render();

    // Haunch 
    g_haunch.matrix.setIdentity();
    g_haunch.matrix.scale(0.32, 0.16, 0.10);
    g_haunch.matrix.translate(-0.5, 0.25, 1.3);
    g_haunch.render();

    // HEAD 
    // Skull 
    g_skull.matrix.setIdentity();
    g_skull.matrix.scale(0.26, 0.16, 0.22);
    g_skull.matrix.translate(-0.5, 1.25, -0.591);
    g_skull.render();

    // Lower jaw
    g_jaw.matrix.setIdentity();
    g_jaw.matrix.scale(0.20, 0.08, 0.16);
    g_jaw.matrix.translate(-0.5, 1.75, -0.75);
    g_jaw.render();

    // Snout
    g_snout.matrix.setIdentity();
    g_snout.matrix.scale(0.10, 0.10, 0.12);
    g_snout.matrix.translate(-0.5, 2.1, -2.083);
    g_snout.render();

    // Nose
    g_nose.matrix.setIdentity();
    g_nose.matrix.scale(0.03, 0.025, 0.02);
    g_nose.matrix.translate(-0.5, 10.3, -12.75);
    g_nose.render();

    // EYES 
    g_eyeL.matrix.setIdentity();
    g_eyeL.matrix.scale(0.025, 0.025, 0.01);
    g_eyeL.matrix.translate(-3.3, 11.5, -13.5);
    g_eyeL.render();

    g_eyeR.matrix.setIdentity();
    g_eyeR.matrix.scale(0.025, 0.025, 0.01);
    g_eyeR.matrix.translate(2.3, 11.5, -13.5);
    g_eyeR.render();

    // EARS 
    // Left ear
    g_earL.matrix.setIdentity();
    g_earL.matrix.translate(-0.08, 0.48, -0.04);
    g_earL.matrix.rotate(90, 1, 0, 0);
    g_earL.matrix.scale(0.06, 0.04, 0.15);
    g_earL.matrix.translate(-0.5, -0.5, 0);
    g_earL.render();

    // Right ear
    g_earR.matrix.setIdentity();
    g_earR.matrix.translate(0.08, 0.48, -0.04);
    g_earR.matrix.rotate(90, 1, 0, 0);
    g_earR.matrix.scale(0.06, 0.04, 0.15);
    g_earR.matrix.translate(-0.5, -0.5, 0);
    g_earR.render();

    // Inner ear
    g_earInL.matrix.setIdentity();
    g_earInL.matrix.translate(-0.08, 0.46, -0.055);
    g_earInL.matrix.rotate(90, 1, 0, 0);
    g_earInL.matrix.scale(0.04, 0.015, 0.11);
    g_earInL.matrix.translate(-0.5, -0.5, 0);
    g_earInL.render();

    g_earInR.matrix.setIdentity();
    g_earInR.matrix.translate(0.08, 0.46, -0.055);
    g_earInR.matrix.rotate(90, 1, 0, 0);
    g_earInR.matrix.scale(0.04, 0.015, 0.11);
    g_earInR.matrix.translate(-0.5, -0.5, 0);
    g_earInR.render();

    // TAIL 
    g_tailBase.matrix.setIdentity();
    g_tailBase.matrix.rotate(g_tailAngle, 0, 0, 1);
    g_tailCoord.set(g_tailBase.matrix);
    g_tailBase.matrix.scale(0.10, 0.10, 0.20);
    g_tailBase.matrix.translate(-0.5, 0.5, 1.05);
    g_tailBase.render();

    g_tailTip.matrix.set(g_tailCoord);
    g_tailTip.matrix.rotate(g_tailAngle * 0.5, 0, 0, 1);
    g_tailTip.matrix.scale(0.12, 0.12, 0.15);
    g_tailTip.matrix.translate(-0.5, 0.5, 2.45);
    g_tailTip.render();

    //  LEGS – 3-level hierarchy

    // FL – Front Left 
    g_legs[0][0].matrix.setIdentity();
    g_legs[0][0].matrix.rotate(-g_jointAngle1, 1, 0, 0);
    g_legCoords[0][0].set(g_legs[0][0].matrix);
    g_legs[0][0].matrix.scale(0.08, 0.13, 0.08);
    g_legs[0][0].matrix.translate(-1.4, -0.8, -1.5);
    g_legs[0][0].render();

    g_legs[0][1].matrix.set(g_legCoords[0][0]);
    g_legs[0][1].matrix.rotate(-g_jointAngle2, 1, 0, 0);
    g_legCoords[0][1].set(g_legs[0][1].matrix);
    g_legs[0][1].matrix.scale(0.07, 0.10, 0.07);
    g_legs[0][1].matrix.translate(-1.5, -2.3, -1.6);
    g_legs[0][1].render();

    g_legs[0][2].matrix.set(g_legCoords[0][1]);
    g_legs[0][2].matrix.rotate(-g_jointAngle3, 1, 0, 0);
    g_legs[0][2].matrix.scale(0.07, 0.05, 0.09);
    g_legs[0][2].matrix.translate(-1.5, -5.4, -1.6);
    g_legs[0][2].render();

    //  FR – Front Right
    g_legs[1][0].matrix.setIdentity();
    g_legs[1][0].matrix.rotate(g_jointAngle1, 1, 0, 0);
    g_legCoords[1][0].set(g_legs[1][0].matrix);
    g_legs[1][0].matrix.scale(0.08, 0.13, 0.08);
    g_legs[1][0].matrix.translate(0.4, -0.8, -1.5);
    g_legs[1][0].render();

    g_legs[1][1].matrix.set(g_legCoords[1][0]);
    g_legs[1][1].matrix.rotate(g_jointAngle2, 1, 0, 0);
    g_legCoords[1][1].set(g_legs[1][1].matrix);
    g_legs[1][1].matrix.scale(0.07, 0.10, 0.07);
    g_legs[1][1].matrix.translate(0.6, -2.3, -1.6);
    g_legs[1][1].render();

    g_legs[1][2].matrix.set(g_legCoords[1][1]);
    g_legs[1][2].matrix.rotate(g_jointAngle3, 1, 0, 0);
    g_legs[1][2].matrix.scale(0.07, 0.05, 0.09);
    g_legs[1][2].matrix.translate(0.6, -5.4, -1.6);
    g_legs[1][2].render();

    //  BL – Back Left
    g_legs[2][0].matrix.setIdentity();
    g_legs[2][0].matrix.rotate(g_jointAngle1, 1, 0, 0);
    g_legCoords[2][0].set(g_legs[2][0].matrix);
    g_legs[2][0].matrix.scale(0.08, 0.13, 0.08);
    g_legs[2][0].matrix.translate(-1.4, -0.8, 1.0);
    g_legs[2][0].render();

    g_legs[2][1].matrix.set(g_legCoords[2][0]);
    g_legs[2][1].matrix.rotate(g_jointAngle2, 1, 0, 0);
    g_legCoords[2][1].set(g_legs[2][1].matrix);
    g_legs[2][1].matrix.scale(0.07, 0.10, 0.07);
    g_legs[2][1].matrix.translate(-1.5, -2.3, 1.2);
    g_legs[2][1].render();

    g_legs[2][2].matrix.set(g_legCoords[2][1]);
    g_legs[2][2].matrix.rotate(g_jointAngle3, 1, 0, 0);
    g_legs[2][2].matrix.scale(0.07, 0.05, 0.09);
    g_legs[2][2].matrix.translate(-1.5, -5.4, 1.2);
    g_legs[2][2].render();

    //  BR – Back Right 
    g_legs[3][0].matrix.setIdentity();
    g_legs[3][0].matrix.rotate(-g_jointAngle1, 1, 0, 0);
    g_legCoords[3][0].set(g_legs[3][0].matrix);
    g_legs[3][0].matrix.scale(0.08, 0.13, 0.08);
    g_legs[3][0].matrix.translate(0.4, -0.8, 1.0);
    g_legs[3][0].render();

    g_legs[3][1].matrix.set(g_legCoords[3][0]);
    g_legs[3][1].matrix.rotate(-g_jointAngle2, 1, 0, 0);
    g_legCoords[3][1].set(g_legs[3][1].matrix);
    g_legs[3][1].matrix.scale(0.07, 0.10, 0.07);
    g_legs[3][1].matrix.translate(0.6, -2.3, 1.2);
    g_legs[3][1].render();

    g_legs[3][2].matrix.set(g_legCoords[3][1]);
    g_legs[3][2].matrix.rotate(-g_jointAngle3, 1, 0, 0);
    g_legs[3][2].matrix.scale(0.07, 0.05, 0.09);
    g_legs[3][2].matrix.translate(0.6, -5.4, 1.2);
    g_legs[3][2].render();
}
