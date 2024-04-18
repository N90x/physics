var menuValues = []
var polygonSides;
var shapeSizeSlider;

function createMenu() {
    // SLIDERS/SELECTS

    new Selector(1, "Shape", shapeNames, menuValues["shape"], function(){
        if (menuValues["shape"] == "Polygon" && this.selected() != "Polygon")
        {
            polygonSides.hide()
        }
        else if (menuValues["shape"] != "Polygon" && this.selected() == "Polygon") {
            polygonSides.show()
        }

        menuValues["shape"] = this.selected()

    })

    shapeSizeSlider = new Slider(3, "Shape Size", 0, 200, 30, 1, function(){
        menuValues["size"] = this.value()
    }, false)

    new Slider(4, "Shape Bounciness", 0, 2, menuValues["bounciness"], 0.05, function(){
        menuValues["bounciness"] = this.value()
        for (let sh of shapeObjects)
        {
            Matter.Body.set(sh.body, "restitution", menuValues["bounciness"])
        }
    }, true)

    new Slider(5, "Shape Friction", 0, 2, menuValues["friction"], 0.05, function(){
        menuValues["friction"] = this.value()
        for (let sh of shapeObjects)
        {
            Matter.Body.set(sh.body, "friction", menuValues["friction"])
        }
    }, true)

    new Slider(6, "Gravity", 0, 5, engine.gravity.y, 0.1, function(){
        engine.gravity.y = this.value()
    }, true)

    new Slider(7, "Air Resistance", 0, 2, menuValues["air friction"], 0.05, function(){
        menuValues["air friction"] = this.value()
        for (let sh of shapeObjects)
        {
            Matter.Body.set(sh.body, "frictionAir", menuValues["air frictionx`"])
        }
    }, true)

    new Slider(8, "Grab Force", 0, 0.5, menuValues["grab force"], 0.001, function(){
        menuValues["grab force"] = this.value()
    })

    // ELEMENTS THAT ARE INITIALLY HIDDEN
    
    polygonSides = new Slider(2, "Polygon Sides", 3, 12, menuValues["polygon sides"], 1, function(){
        menuValues["polygon sides"] = this.value()
    }, false)
    polygonSides.hide()

    // COLOUR PICKERS

    new ColourPicker("Shape Colour", menuValues["colour"], function(){
        menuValues["colour"] = this.color()
    })

    guiElements.sort(function(a, b){return a.obj.rank - b.obj.rank})
}

var sliderPosition;
var guiElements = []
var sliderHeight = 50
var menuWidth = 200
var hiddenMenuItems = 0

class Slider {
    constructor(rank, label, min, max, initVal, step, onChange, updateOnlyOnRelease, customDisplayValue) {

        this.rank = rank
        let x = sliderPosition.x
        let y = sliderPosition.y + sliderHeight*(this.rank-1)//guiElements.length

        this.slider = createSlider(min, max, initVal, step)
        this.slider.position(x, y)

        this.customDisplayValue = customDisplayValue

        this.label = label
        this.displayLabel = this.label.concat(" [ ").concat(this.customDisplayValue || this.slider.value()).concat(" ]")

        
        this.div = createDiv(this.displayLabel);
        this.div.position(x, y - this.slider.height)
        this.div.style('color', 'white');
        this.div.style('font', 'Verdana');

        if (updateOnlyOnRelease) {
            this.slider.mouseReleased(onChange) 
        }
        else {
            this.slider.input(onChange) 
        }

        guiElements.push({obj: this, type: "slider"})
    }

    show() {
        shiftMenuItems(this, 1)
        this.slider.show()
        this.div.show()
    }

    hide() {
        shiftMenuItems(this, -1)
        this.slider.hide()
        this.div.hide()
    }

    position(x, y) {
        this.slider.position(x, y)
        this.div.position(x, y - this.slider.height)
    }
}

class Selector {
    constructor(rank, label, options, initOption, onChange) {

        this.rank = rank
        let x = sliderPosition.x
        let y = sliderPosition.y + sliderHeight*(this.rank-1)//guiElements.length

        this.select = createSelect()
        this.select.position(x, y)
        this.select.style('width: 129px')
        
        for (let option of options)
        {
            this.select.option(option)
        }

        this.select.selected(initOption)

        this.label = label
        this.select.input(onChange) 
        
        this.div = createDiv(this.label);
        this.div.position(x, y - this.select.height)
        this.div.style('color', 'white');
        this.div.style('font', 'Verdana');

        guiElements.push({obj: this, type: "select"})
    }

    show() {
        shiftMenuItems(this, 1)
        this.select.show()
        this.div.show()
    }

    hide() {
        shiftMenuItems(this, -1)
        this.select.hide()
        this.div.hide()
    }

    position(x, y) {
        this.select.position(x, y)
        this.div.position(x, y - this.select.height)
    }
}

function shiftMenuItems(cutOff, amt) {
    //print("------")
    //print("Shifting by", amt)
    for (let el of guiElements)
    {
        let element = el.obj
        //print(element.rank, element.label)
        if (element.rank >= cutOff.rank && element != cutOff)
        {
            //print(element.label, element.rank, "->", element.rank + amt)

            element.rank += amt

            let x = sliderPosition.x
            let y = sliderPosition.y + sliderHeight*(element.rank-1)
            element.position(x, y)

        }
    }

    guiElements.sort(function(a, b){return a.obj.rank - b.obj.rank})

    /*for (let i = 0; i < guiElements.length; i++)
    {
        let element = guiElements[i].obj
        print(element.rank, element.label)
    }*/

}

function updateShapeOptions() {
    for (let sh of shapeObjects) {
        let stat = sh.body.isStatic
        Matter.Body.set(sh.body, ShapeOptions)
        Matter.Body.set(sh.body, "isStatic", stat)
    }
}

var colourPickersArray = []
var pickerPosition;
class ColourPicker {
    constructor(label, initVal, onChange) {

        this.picker = createColorPicker(initVal)
        let x = pickerPosition.x
        let y = pickerPosition.y + (this.picker.width+5)*colourPickersArray.length
        this.picker.position(x, y)

        this.label = label

        this.div = createDiv(this.label);
        this.div.position(x, y + this.picker.height + 5)
        this.div.style('color', 'white');
        this.div.style('font', 'Verdana');


        this.picker.input(onChange) 
        colourPickersArray.push(this)
    }
}

function updateSliderLabels(){
    // Update the slider labels
    for (let el of guiElements)
    {
        if (el.type == "slider")
        {
            let slider = el.obj

            slider.displayLabel = slider.label.concat(" [ ").concat(slider.customDisplayValue || slider.slider.value()).concat(" ]")
            slider.div.html(slider.displayLabel)
        }

    }
}

