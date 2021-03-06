function createComputerHierarchy() {
    class BasePart{
        constructor(manufacturer){
            if(new.target === BasePart){
                throw new Error("Abstract classes cannot be directly instantiated");
            }
            this.manufacturer = manufacturer;
        }
    }

    class Keyboard extends BasePart{
        constructor(manufacturer, responseTime){
            super(manufacturer);
            this.responseTime = responseTime;
        }
    }

    class Monitor extends BasePart{
        constructor(manufacturer, width, height){
            super(manufacturer);
            this.width = width;
            this.height = height;
        }
    }

    class Battery extends BasePart{
        constructor(manufacturer, expectedLife){
            super(manufacturer);
            this.expectedLife = expectedLife;
        }
    }

    class Computer extends BasePart{
        constructor(manufacturer, processorSpeed, ram, hardDiskSpace){
            if(new.target === Computer){
                throw new Error("Abstract classes cannot be directly instantiated");
            }
            super(manufacturer);
            this.processorSpeed = processorSpeed;
            this.ram = ram;
            this.hardDiskSpace = hardDiskSpace;
        }
    }

    class Laptop extends Computer{
        constructor(manufacturer, processorSpeed, ram, hardDiskSpace, weight, color, battery){
            super(manufacturer, processorSpeed, ram, hardDiskSpace);
            this.weight = weight;
            this.color = color;
            this.battery = battery;
        }

        get battery(){
            return this._battery;
        }

        set battery(newBattery){
            if(!(newBattery instanceof Battery)){
                throw new TypeError("Battery should be instance of the class Battery");
            }
            this._battery = newBattery;
        }
    }

    class Desktop extends Computer{
        constructor(manufacturer, processorSpeed, ram, hardDiskSpace, keyboard, monitor){
            super(manufacturer, processorSpeed, ram, hardDiskSpace);
            this.keyboard = keyboard;
            this.monitor = monitor;
        }
        get keyboard(){
            return this._keyboard;
        }

        set keyboard(newKeyboard){
            if(!(newKeyboard instanceof Keyboard)){
                throw new TypeError("Keyboard should be instance of the class Keyboard");
            }
            this._keyboard = newKeyboard;
        }

        get monitor(){
            return this._monitor;
        }

        set monitor(newMonitor){
            if(!(newMonitor instanceof Monitor)){
                throw new TypeError("Monitor should be instance of the class Monitor");
            }
            this._monitor = newMonitor;
        }
    }

    return {
        Battery,
        Keyboard,
        Monitor,
        Computer,
        Laptop,
        Desktop
    };
}
