var gl;

window.onload = function init() //처음 실행될때 한번실행
{
    var canvas = document.getElementById("gl-canvas");

    gl = WebGLUtils.setupWebGL(canvas);
    if( !gl ) {
        alert("WebGL isn't available!");
    }

    var vertices = [
        vec2(-0.5, -0.5), 
        vec2(0.5, -0.5),
        vec2(0.5,0.5),
        vec2(-0.5, 0.5),

        vec2(-0.5, -0.5), 
        vec2(0.5, -0.5),
        // vec2(0.5,0.5),
        // vec2(-0.5, 0.5)
        
    ];

    var colors=[ 
        vec4(1,0,0,1),
        vec4(0,1,0,1),
        vec4(0,0,1,1),
        vec4(1,1,0,1),

        vec4(0,0,0,1),
        vec4(0,0,0,1),
        vec4(0,0,0,1),
        vec4(0,0,0,1)
    ];

    // Configure WebGL
    gl.viewport(0, 0, canvas.width, canvas.height); //보이는 곳 크기
    gl.clearColor(1.0, 1.0, 1.0, 1.0);

    // Load shaders and initialize attribute buffers
    var program = initShaders(gl, "vertex-shader", "fragment-shader");//컴파일 하고 링킹 하는코드
    gl.useProgram(program);

    // Load the data into the GPU
    var bufferId = gl.createBuffer();//gpu에 데이터 써주는 역할
    gl.bindBuffer(gl.ARRAY_BUFFER, bufferId); 
    gl.bufferData(gl.ARRAY_BUFFER, flatten(vertices), gl.STATIC_DRAW); // vertices배열을 flatten이 32비트로 변경

    // Associate our shader variables with our data buffer
    var vPosition = gl.getAttribLocation(program, "vPosition");//바인드된 버퍼를 읽어오고 사용하라고 명령하는 코드
    gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vPosition);

    var cbufferId=gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER,cbufferId);
    gl.bufferData(gl.ARRAY_BUFFER,flatten(colors),gl.STATIC_DRAW);

    var vColor=gl.getAttribLocation(program,"vColor");
    gl.vertexAttribPointer(vColor,4,gl.FLOAT,false,0,0);
    gl.enableVertexAttribArray(vColor);

    render();
};

function render()
{
    gl.clear(gl.COLOR_BUFFER_BIT); //색상정보
    gl.drawArrays(gl.TRIANGLE_FAN, 0, 4);
    // gl.drawArrays(gl.LINE_LOOP,4,4);
}
