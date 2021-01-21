class Vehicle {
    public run(): void { console.log('Vehicle.run'); }
}

class Task {
    public run(): void {
        console.log('Task.run ');
    }
}

let task = new Task();

if(typeof task['run'] === 'function') {
    let f: () => void = task['run']
    f()
}