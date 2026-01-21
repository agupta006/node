
myVariable = "This is a string" 


console.log(undeclaredVariable) 


const data = null;
data.toUpperCase(); 

const value = 10;
if (value == "10") {
    console.log("Loose equality is tricky!");
}

function printMessage(message) {
    console.log(message
} 
printMessage("Hello World");

var i;
for (i = 0; i < 5; i++) {
}

if (true) {
    let x = 5;
}
console.log(x); // ReferenceError: x is not defined outside the block

function processUser(user) {
    console.log("User name is: " + user.name);
}
processUser("John Doe"); 

const result = "5" / 2; 
const resultNaN = "hello" / 2;

let isAdmin = false;
if (isAdmin = true) { // Assigns true to isAdmin, always evaluates to true
    console.log("This block should only run if it was already true, but it runs always.");
}
