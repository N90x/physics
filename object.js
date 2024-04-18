var shapeObjects = []

function ShapeObject(shape, x, y, size, options){

    this.size = size
    this.colour = menuValues["colour"]
    this.body = shapes[shape].create(x, y, size, options)

    this.draw = function(){
        shapes[shape].draw(this.body, this.size, this.colour)
        if (this.body.isStatic) {
            push()
            fill(0)
            noStroke()
            translate(this.body.position.x, this.body.position.y)
            ellipse(0, 0, 3)
            pop()
        }
    }

    shapeObjects.push(this)
}
