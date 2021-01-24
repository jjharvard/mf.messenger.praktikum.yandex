import { LoginComponent } from "./components/login/LoginComponent";
let loginPage = new LoginComponent();
let inner = loginPage.render();
console.log(inner);
// class Main {
//     merge(a: ArrayKeys, argObj: FlatKeys): ArrayKeys {
//         for (let key in argObj) {
//             a[key] = a[key] ? [...a[key], argObj[key]] : [argObj[key]]
//         }
//         return a
//     }
// }
//
// let test = new Main()
// let res = test.merge({'x': []}, {'x': 'y'})
// console.log(res)
