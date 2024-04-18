function hoveredShape(){
    for (let sh of shapeObjects) {
        if (Matter.Bounds.contains(sh.body.bounds, {x: mouseX, y: mouseY}))
        {
            return sh
        }
    }
    return false
}

//  MOUSE PRESSED

var mouseConstraint = {constraint: null, active: false}

function mousePressed() {
    let hovShape = hoveredShape()
    if (!hovShape)
    {
        new ShapeObject(menuValues["shape"], mouseX, mouseY, menuValues["size"], ShapeOptions)
    }
    else {
        if (keyIsDown(SHIFT)) {
            Matter.Body.set(hovShape.body, "isStatic", !hovShape.body.isStatic)
        } else 
        {
            let c = Constraint.create({
                bodyB: hovShape.body,
                pointA: {x: mouseX, y: mouseY},
                stiffness: menuValues["grab force"],
                damping: 0.05
            })
            mouseConstraint = {constraint: c, active: true}
            Composite.add(world, [c])
        }


    }
}

// MOUSE DRAGGED

function mouseDragged(){
    updateSliderLabels()
    if (mouseConstraint.active) {
        mouseConstraint.constraint.pointA = {x: mouseX, y: mouseY}
    }
}

// MOUSE RELEASED

function mouseReleased(){
    updateSliderLabels()
    if (mouseConstraint.active) {
        mouseConstraint.active = false
        Composite.remove(world, [mouseConstraint.constraint])
    }
}

// MOUSE WHEEL

function mouseWheel(event) {
    
    let amt = event.delta/abs(event.delta)
    menuValues["size"] -= amt*10
    shapeSizeSlider.slider.value(menuValues["size"])
    updateSliderLabels()

    // Block page scrolling
    return false;
}

// DRAWING

function drawMouse() {
    if (mouseConstraint.active) {
        push()
        stroke(255)
        strokeWeight(3)
        let a = mouseConstraint.constraint.bodyB.position
        line(a.x, a.y, mouseX, mouseY)
        pop()
    }
    else {
        push()
        let col = color(0, 0, 0)
        col.setAlpha(100)
        shapes[menuValues["shape"]].draw(false, menuValues["size"], col)
        pop()
    }
}
