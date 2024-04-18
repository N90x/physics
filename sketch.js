// module aliases
var Engine = Matter.Engine,
    Runner = Matter.Runner,
    Bodies = Matter.Bodies,
    Composite = Matter.Composite,
    MouseConstraint = Matter.MouseConstraint,
    Mouse = Matter.Mouse,
    Constraint = Matter.Constraint

var engine;
var world;
var ball1;
var runner;
var ground;
var ShapeOptions;
var mouseConstraint;

var bounds;

var canvasPos = {}
function setup() {

    // Inititialise Matter.JS
    engine = Engine.create();
    world = engine.world;
    runner = Runner.create();
    Runner.run(runner, engine);

    // Create a Canvas
    var canvasScale = 0.85
    var cnv = createCanvas(floor(windowWidth*canvasScale) - menuWidth, floor(windowHeight*canvasScale));
    canvasPos.x = 20;
    canvasPos.y = 20;
    cnv.position(canvasPos.x, canvasPos.y);

    // Align the Menu
    sliderPosition = {x: canvasPos.x + width + 10, y: canvasPos.y + sliderHeight/2}
    pickerPosition = {x: canvasPos.x, y: canvasPos.y + height + 5}

    // Create the menu
    menuValues["colour"] = color(255, 255, 255)
    menuValues["size"] = 30
    menuValues["bounciness"] = 0.8
    menuValues["air friction"] = 0.1
    menuValues["friction"] = 0.1
    menuValues["polygon sides"] = 3
    menuValues["shape"] = "Circle"
    menuValues["grab force"] = 0.1

    ShapeOptions = {
        restitution: menuValues["bounciness"], 
        frictionAir: menuValues["air friction"]/10,
        friction: menuValues["friction"],
        isStatic: false
    }

    createMenu()

    // Set up
    bounds = new Bounds(0, 0, width, height, 50)

}


function draw() {
    background(100)
    bounds.show()

    drawMouse()

    for (let obj of shapeObjects)
    {
        obj.draw()
    }

}