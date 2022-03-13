import './style.less'
import { test, test2 } from "./utils.js";

console.log(1, new test(), new Promise((resolve, reject) => resolve(1)))
