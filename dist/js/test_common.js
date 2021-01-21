class Vehicle {
    run() { console.log('Vehicle.run'); }
}
class Task {
    run() {
        console.log('Task.run ');
    }
}
let task = new Task();
if (typeof task['run'] === 'function') {
    let f = task['run'];
    f();
}
