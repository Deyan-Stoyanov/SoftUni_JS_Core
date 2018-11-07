() => {
    class Figure {
        constructor() {
            if (new.target == Figure) {
                throw new TypeError("Figure is abstract, cannot be instantiated.");
            }
        }
        get area() {
            return undefined;
        }
        toString(){
            return this.constructor.name;
        }
    }

    class Circle extends Figure{
        constructor(radius) {
            super();
            this.radius = radius;
        }
        get area() {
            return this.radius * this.radius * Math.PI;
        }
        toString(){
            return super.toString() + ` - radius: ${this.radius}`;
        }
    }

    class Rectangle extends Figure {
        constructor(width, height) {
            super();
            this.width = width;
            this.height = height;
        }
        get area(){
            return this.width * this.height;
        }
        toString(){
            return super.toString() + ` - width: ${this.width}, height: ${this.height}`;
        }
    }

    return {
        Figure,
        Circle,
        Rectangle
    };
};
