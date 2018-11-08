class SortedList {
    constructor() {
        this.arr = [];
        this.size = 0;
    }
    sort() {
        this.arr = this.arr.sort((a, b) => a - b);
    }
    add(element) {
        this.arr.push(element);
        this.sort();
        this.size++;
    }
    remove(index){
        if(index < 0 || index >= this.size){
            throw new Error("Invalid index");
        }
        let firstHalf = this.arr.slice(0, index);
        let secondHalf = this.arr.slice(index + 1);
        this.arr = firstHalf.concat(secondHalf);
        this.size--;
    }
    get(index){
        if(index < 0 || index >= this.size){
            throw new Error("Invalid index");
        }
        return this.arr[index];
    }
}
