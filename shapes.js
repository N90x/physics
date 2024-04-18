var shapes = []

var shapeNames = ["Circle", "Square", "Polygon"]

shapes["Circle"] = {
    create: function(x, y, size, options)
    {
        let b = Bodies.circle(x, y, size/2, options)
        Composite.add(world, [b]);
        return b

    },
    draw: function(body, size, colour)
    {
        push();
        let pos;
        if (body){
            pos = body.position
            strokeWeight(1);
            stroke(0)
        } else {
            pos = {x: mouseX, y: mouseY}
            noStroke()
        }
        translate(pos.x, pos.y)
        fill(colour)
        ellipse(0,0, size)
        pop();
    }
}

shapes["Square"] = {
    create: function(x, y, size, options)
    {
        let b = Bodies.rectangle(x, y, size, size, options)
        Composite.add(world, [b]);
        return b

    },
    draw: function(body, size, colour)
    {
        push();
        let pos;
        if (body){
            pos = body.position
            strokeWeight(1);
            stroke(0)
        } else {
            pos = {x: mouseX, y: mouseY}
            noStroke()
        }
        translate(pos.x, pos.y)
        fill(colour)
        rectMode(CENTER)
        if (body) {rotate(body.angle)}
        rect(0,0, size, size)
        pop();
    }
}

shapes["Polygon"] = {
    create: function(x, y, size, options)
    {
        let b = Bodies.polygon(x, y, menuValues["polygon sides"], size, options)
        Composite.add(world, [b]);
        return b

    },
    draw: function(body, size, colour)
    {
        push();

        if (body)
        {
            let vertices = body.vertices 
            stroke(0);
            strokeWeight(1);
            fill(colour)
            
            beginShape()
            for (let i = 0; i < vertices.length; i++) {
                let v = vertices[i]
                vertex(v.x, v.y)
            }
            endShape(CLOSE)
        } 
        else 
        {
            translate(mouseX, mouseY)
            noStroke()
            fill(colour)
            let r = menuValues["size"]
            let n = menuValues["polygon sides"]
            rotate(180/n * PI/180)

            beginShape()
            for (i = 0; i < n; i++) {
                //print(i, n, r)
                vertex(r * Math.cos(2 * Math.PI * i / n), r * Math.sin(2 * Math.PI * i / n))
            }
            endShape()
        }

        
        pop();
    }
}

