// BAD CODE ON PURPOSE – for review comment generation

var a = 10;
var b = "20";
var result = a + b; // implicit type coercion, unexpected result

function doStuff(x, y, z) {
  if (x) {
    if (y) {
      if (z) {
        console.log("All true");
      }
    }
  }
}

function calculate(data) {
  let total = 0;

  for (var i = 0; i < data.length; i++) {
    if (data[i] != null) {
      total = total + data[i];
    } else {
      total = total + 0;
    }
  }

  return total;
}

function fetchData() {
  fetch("https://example.com/api/data")
    .then((res) => res.json())
    .then((data) => {
      processData(data);
    });
  // no error handling, no return
}

function processData(d) {
  for (let i in d) {
    console.log(d[i]);
  }
}

const user = {
  name: "John",
  age: "30",
  isAdmin: "false",
};

if (user.isAdmin) {
  console.log("Admin access granted");
}

function timeoutExample() {
  setTimeout(function () {
    console.log("Done");
  }, 1000);
}

function mutateArray(arr) {
  arr.push(999);
  return arr;
}

let numbers = [1, 2, 3];
mutateArray(numbers);
console.log(numbers);

function unusedFunction() {
  console.log("I am never used");
}

var globalState = [];

function addToState(item) {
  globalState.push(item);
}

addToState("test");
addToState("test");
addToState("test");

// confusing naming, side effects, no validation
function x(a, b) {
  return a == b;
}

console.log(x(1, "1"));
