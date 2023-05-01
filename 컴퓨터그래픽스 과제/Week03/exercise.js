var gl;

window.onload = function init() //처음 실행될때 한번실행
{
    var canvas = document.getElementById("gl-canvas");

    gl = WebGLUtils.setupWebGL(canvas);
    if( !gl ) {
        alert("WebGL isn't available!");
    }

    var vertices = [

        //총을 만들어 봤습니다!

        vec2(-0.3, 0.43), //총구 부분
        vec2(-0.3, 0.47),
        vec2(-0.5,0.47),
        vec2(-0.5, 0.43),

        vec2(-0.3, 0.5), //총열 덮개 부분
        vec2(-0.3, 0.4),
        vec2(0.1,0.4),
        vec2(0.1, 0.5),

        vec2(0.1, 0.3),  //총 몸통 부분
        vec2(0.1, 0.5),
        vec2(0.6,0.5),
        vec2(0.6, 0.3),

        vec2(0.1, 0.3), //총 탄창 부분
        vec2(0.1, 0.1),
        vec2(0.2,0.1),
        vec2(0.2, 0.3),

        vec2(0.5, 0.3), //총 손잡이 부분
        vec2(0.5, 0.1),
        vec2(0.6,0.1),
        vec2(0.6, 0.3),

        vec2(0.6, 0.45),  //개머리판과 총 몸통 사이 부분
        vec2(0.6, 0.5),
        vec2(0.7,0.5),
        vec2(0.7, 0.45),
        
        vec2(0.7, 0.45),  //개머리판과 총 몸통 사이 부분
        vec2(0.7, 0.5),
        vec2(1,0.5),
        vec2(1,0.3),

        vec2(0.55, 0.5),  //조준경(뒤쪽) 부분
        vec2(0.55, 0.55),
        vec2(0.6,0.55),
        vec2(0.6, 0.5),

        vec2(-0.3, 0.5), //조준경(앞쪽) 부분
        vec2(-0.3, 0.55),
        vec2(-0.25,0.55),
        vec2(-0.25, 0.5),
        
    ];

    var colors=[ 
        vec4(0.6,0.6,0.2,1),
        vec4(0.6,0.6,0.2,1),
        vec4(0.6,0.6,0.2,1),
        vec4(0.6,0.6,0.2,1),

        vec4(0.8,0.8,0.2,1),
        vec4(0.8,0.8,0.2,1),
        vec4(0.8,0.8,0.2,1),
        vec4(0.8,0.8,0.2,1),

        vec4(0.6,0.6,0.2,1),
        vec4(0.6,0.6,0.2,1),
        vec4(0.6,0.6,0.2,1),
        vec4(0.6,0.6,0.2,1),

        vec4(0.5,0.5,0,1),
        vec4(0.5,0.5,0,1),
        vec4(0.5,0.5,0,1),
        vec4(0.5,0.5,0,1),

        vec4(0.5,0.5,0,1),
        vec4(0.5,0.5,0,1),
        vec4(0.5,0.5,0,1),
        vec4(0.5,0.5,0,1),

        vec4(0.5,0.5,0,1),
        vec4(0.5,0.5,0,1),
        vec4(0.5,0.5,0,1),
        vec4(0.5,0.5,0,1),
        
        vec4(0.5,0.5,0,1),
        vec4(0.5,0.5,0,1),
        vec4(0.5,0.5,0,1),
        vec4(0.5,0.5,0,1),
        
        vec4(0,0,0,1),
        vec4(0,0,0,1),
        vec4(0,0,0,1),
        vec4(0,0,0,1),

        vec4(0,0,0,1),
        vec4(0,0,0,1),
        vec4(0,0,0,1),
        vec4(0,0,0,1),
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
    gl.drawArrays(gl.TRIANGLE_FAN,4,4);
    gl.drawArrays(gl.TRIANGLE_FAN,8,4);
    gl.drawArrays(gl.TRIANGLE_FAN,12,4);
    gl.drawArrays(gl.TRIANGLE_FAN,16,4);
    gl.drawArrays(gl.TRIANGLE_FAN,20,4);
    gl.drawArrays(gl.TRIANGLE_FAN,24,4);
    gl.drawArrays(gl.TRIANGLE_FAN,28,4);
    gl.drawArrays(gl.TRIANGLE_FAN,32,4);
};

