var gl;
var points,colors;

window.onload = function init() {
    var canvas = document.getElementById("gl-canvas");

    gl = WebGLUtils.setupWebGL(canvas);
    if( !gl ) {
        alert("WebGL isn't available!");
    }

    points = [];
    colors=[];
    var bMouseDown=false;
    var count=0;

    canvas.addEventListener("mousedown", function(event) {
        if( !bMouseDown ) {

            var point = vec2(2 * event.clientX/canvas.width - 1,
                2 * (canvas.height - event.clientY) / canvas.height - 1);

            points.push(point);
            gl.bindBuffer(gl.ARRAY_BUFFER,bufferId);
            gl.bufferData(gl.ARRAY_BUFFER, flatten(points), gl.STATIC_DRAW);//gpu에 보내주는 bufferdata

            //각각 color 색상 지정

            colors.push(currentColor);
            gl.bindBuffer(gl.ARRAY_BUFFER,cbufferId);
            gl.bufferData(gl.ARRAY_BUFFER,flatten(colors),gl.STATIC_DRAW);

            render();
        }
        bMouseDown=true;
    });
    canvas.addEventListener("mouseup", function(event) {
        bMouseDown = false;
    });
    

    // Configure WebGL
    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.clearColor(1.0, 1.0, 1.0, 1.0);

    // Load shaders and initialize attribute buffers
    var program = initShaders(gl, "vertex-shader", "fragment-shader");
    gl.useProgram(program);

    // Load the data into the GPU
    var bufferId = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, bufferId);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(points), gl.STATIC_DRAW);

    // Associate our shader variables with our data buffer
    var vPosition = gl.getAttribLocation(program, "vPosition");
    gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vPosition);



    //각각 color 지정
    var cbufferId = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, cbufferId);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(colors), gl.STATIC_DRAW);


    var vColor = gl.getAttribLocation(program, "vColor");
    gl.vertexAttribPointer(vColor, 4, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vColor);


    // var fColor=gl.getUniformLocation(program,"fColor");
    // gl.uniform1f(fColor, 1.0,0.0,0.0,1.0);
    var currentColor=vec4(1.0,0.0,0.0,1.0);

    document.getElementById("lineColor").onchange=function(){
        switch(event.target.value){
            case "red":
                // gl.uniform4f(fColor,1.0,0.0,0.0,1.0);
                currentColor=vec4(1.0,0.0,0.0,1.0);
                break;
            case "green":
                // gl.uniform4f(fColor,0.0,1.0,0.0,1.0);
                currentColor=vec4(0.0,1.0,0.0,1.0);
                break;
            case "blue":
                // gl.uniform4f(fColor,0.0,0.0,1.0,1.0);
                currentColor=vec4(0.0,0.0,1.0,1.0);
                break;
            case "yellow":
                // gl.uniform4f(fColor,1.0,1.0,0.0,1.0);
                currentColor=vec4(1.0,1.0,0.0,1.0);
                break;
            case "cyan":
                // gl.uniform4f(fColor,0.0,1.0,1.0,1.0);
                currentColor=vec4(0.0,1.0,1.0,1.0);
                break;
            case "magenta":
                // gl.uniform4f(fColor,1.0,0.0,1.0,1.0);
                currentColor=vec4(1.0,0.0,1.0,1.0);
                break;
            case "gray":
                // gl.uniform4f(fColor,0.5,0.5,0.5,1.0);
                currentColor=vec4(0.5,0.5,0.5,1.0);
                break;
            case "black":
                // gl.uniform4f(fColor,0.0,0.0,0.0,1.0);
                currentColor=vec4(0.0,0.0,0.0,1.0);
                break;
        }
    }
    // render();
};

function render() {
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.drawArrays(gl.TRIANGLES, 0, points.length);
}
