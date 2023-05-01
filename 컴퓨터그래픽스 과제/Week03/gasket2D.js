var gl;
var points;
var numTimes=5;

window.onload = function init()
{
    var canvas = document.getElementById("gl-canvas");

    gl = WebGLUtils.setupWebGL(canvas);
    if( !gl ) {
        alert("WebGL isn't available!");
    }
    document.getElementById("Level").onchange=function(event){
        numTimes=event.target.value;

        generateTriangles();

        gl.bufferData(gl.ARRAY_BUFFER,flatten(points),gl.STATIC_DRAW);

        render();
    }
    // Sierpinski Gasket
    generateTriangles();

    // Configure WebGL
    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.clearColor(1.0, 1.0, 1.0, 1.0); //배경색

    // Load shaders and initialize attribute buffers
    var program = initShaders(gl, "vertex-shader", "fragment-shader");
    gl.useProgram(program);

    // Load the data into the GPU
    var bufferId = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, bufferId);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(points), gl.STATIC_DRAW); //flatten 이 32비트로 바꿔줌 (float 가 32비트이기때문) --이 줄 중요

    // Associate our shader variables with our data buffer
    var vPosition = gl.getAttribLocation(program, "vPosition");
    gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vPosition);

    render();
};

function render() {
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.drawArrays(gl.TRIANGLES, 0, points.length);
}
function generateTriangles(){
    
    var vertices=[
        vec2(-1,-1),
        vec2(0,1),
        vec2(1,-1)
    ];

    points=[];

    divideTriangle(vertices[0],vertices[1],vertices[2],numTimes);
}
function divideTriangle(a,b,c,count){
    if(count==0){
        points.push(a,b,c);
    }
    else{
        var ab=mix(a,b,0.5);
        var bc=mix(b,c,0.5);
        var ca=mix(c,a,0.5);

        count--;

        divideTriangle(a,ab,ca,count);
        divideTriangle(b,bc,ab,count);
        divideTriangle(c,ca,bc,count);
    }
}
function generatePoints() {
    // Initialize the data for the Sierpinski Gasket
    // First, initialize the corners of a gasket with three points
    var vertices = [
        vec2(-1, -1),
        vec2(0, 1),
        vec2(1, -1)
    ];

    // Specify a starting point p for iterations
    // p must lie inside any set of three vertices
    var u = add(vertices[0], vertices[1]);
    var v = add(vertices[0], vertices[2]);
    var p = scale(0.25, add(u, v)); //나누기 대신 가능 곱셈을 이용

    // Add an initial point into the array of points
    points = [p];

    // Compute the new points
    // Each new point is located midway between last point and a randomly chosen vertex
    for (var i=0; points.length<numPoints; i++) {
        var j = Math.floor(Math.random() * 3); //0~2.999... (floor 이 바닥 다 버림) -> 0,1,2 만 나옴
        p = add(points[i], vertices[j]);
        p = scale(0.5, p);
        points.push(p);
    }
}

function drawGasket(){
    numPoints=parseInt(document.getElementById("numPoints").value);

    if(numPoints>0 && numPoints <=50000){
        generatePoints();

        gl.bufferData(gl.ARRAY_BUFFER, flatten(points),gl.STATIC_DRAW);

        render();
    }
    else {
        alert("점의 개수는 0보다 크고 50,000 보다 작거나 같아야 합니다.");
    }
}
