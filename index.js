// Getting All Elements
let randomize_array = document.getElementById("randomize_array_btn");
let sortButton = document.getElementById("sort_btn");
let bars_container = document.getElementById("bars_container");
let select_algo = document.getElementById("algo");
let speed = document.getElementById("speed");
let slider = document.getElementById("slider");
let minRange = 1;
let maxRange = slider.value;
let numOfBars = slider.value;
let heightFactor = 10;
let speedFactor = 100;
let unsortedArray = new Array(numOfBars);
let solve = document.getElementById("foot");

// Input Function for range
slider.addEventListener("input", function () {
  numOfBars = slider.value;
  maxRange = slider.value;
  bars_container.innerHTML = "";
  unsortedArray = createRandomArray();
  renderBars(unsortedArray);
});

// Speed
speed.addEventListener("change", (e) => {
  speedFactor = parseInt(e.target.value);
});


// Algorithm Change
let algorithmToUse = "";

select_algo.addEventListener("change", function () {
  algorithmToUse = select_algo.value;
});

// Random Number Generator
function randomNum(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function createRandomArray() {
  let array = new Array(numOfBars);
  for (let i = 0; i < numOfBars; i++) {
    array[i] = randomNum(minRange, maxRange);
  }

  return array;
}

document.addEventListener("DOMContentLoaded", function () {
  unsortedArray = createRandomArray();
  renderBars(unsortedArray);
});

function renderBars(array) {
  for (let i = 0; i < numOfBars; i++) {
    let bar = document.createElement("div");
    bar.classList.add("bar");
    bar.style.height = array[i] * heightFactor + "px";
    bars_container.appendChild(bar);
  }
}

// Randomize Array
randomize_array.addEventListener("click", function () {
  unsortedArray = createRandomArray();
  bars_container.innerHTML = "";
  renderBars(unsortedArray);
});

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Bubble Sort Algorithm
async function bubbleSort(array) {
  let bars = document.getElementsByClassName("bar");
  for (let i = 0; i < array.length; i++) {
    for (let j = 0; j < array.length - i - 1; j++) {
      if (array[j] > array[j + 1]) {
        for (let k = 0; k < bars.length; k++) {
          if (k !== j && k !== j + 1) {
            bars[k].style.backgroundColor = "rgb(37, 184, 184)";
          }
        }
        let temp = array[j];
        array[j] = array[j + 1];
        array[j + 1] = temp;
        bars[j].style.height = array[j] * heightFactor + "px";
        bars[j].style.backgroundColor = "#f40707";
        bars[j + 1].style.height = array[j + 1] * heightFactor + "px";
        bars[j + 1].style.backgroundColor = "#28fe02";
        await sleep(speedFactor);
      }
    }
    await sleep(speedFactor);
  }

  solve.innerHTML = "";
  solve.style.backgroundColor = "gray";
  solve.style.padding = "5px";
  solve.style.margin = "5px";

  solve.innerHTML +=
    '<table style="width:100% background-color: white border: 10px solid red padding: 5px display: flex flex-direction: column justify-content: space-around;"><tr style="display: flex justify-content: space-around;" id="1"><th><b>Bubble Sort</b></th><th>Best Complexity</th><th>Average Complexity</th><th>Worst Complexity</th></tr><tr id="3" style="display: flex justify-content: space-around;"><td><b>Time Complexity</b></td><td>Ω(N)</td><td>Θ(N<sup>2</sup>)</td><td>O(N<sup>2</sup>)</td></tr></table>';

  return array;
}

async function swap(items, leftIndex, rightIndex, bars) {
  var temp = items[leftIndex];
  items[leftIndex] = items[rightIndex];
  items[rightIndex] = temp;
  bars[leftIndex].style.height = items[leftIndex] * heightFactor + "px";
  bars[leftIndex].style.backgroundColor = "lightgreen";
  bars[rightIndex].style.height = items[rightIndex] * heightFactor + "px";
  bars[rightIndex].style.backgroundColor = "lightgreen";
  await sleep(speedFactor);
}

async function partition(items, left, right) {
  let bars = document.getElementsByClassName("bar");
  let pivotIndex = Math.floor((right + left) / 2);
  var pivot = items[pivotIndex]; //middle element
  bars[pivotIndex].style.backgroundColor = "#f40707";

  for (let i = 0; i < bars.length; i++) {
    if (i != pivotIndex) {
      bars[i].style.backgroundColor = "rgb(37, 184, 184)";
    }
  }

  (i = left), //left pointer
    (j = right); //right pointer
  while (i <= j) {
    while (items[i] < pivot) {
      i++;
    }
    while (items[j] > pivot) {
      j--;
    }
    if (i <= j) {
      await swap(items, i, j, bars); //swapping two elements
      i++;
      j--;
    }
  }

  return i;
}

// Quick Sort Algorithm
async function quickSort(items, left, right) {
  var index;
  let bars = document.getElementsByClassName("bar");
  if (items.length > 1) {
    index = await partition(items, left, right); //index returned from partition
    if (left < index - 1) {
      //more elements on the left side of the pivot
      await quickSort(items, left, index - 1);
    }
    if (index < right) {
      //more elements on the right side of the pivot
      await quickSort(items, index, right);
    }
  }

  for (let i = 0; i < bars.length; i++) {
    bars[i].style.backgroundColor = "rgb(37, 184, 184)";
  }

  solve.innerHTML = "";
  solve.style.backgroundColor = "gray";
  solve.style.padding = "5px";
  solve.style.margin = "5px";

  solve.innerHTML +=
    '<table style="width:100% background-color: white border: 10px solid redpadding: 5px display: flex flex-direction: column justify-content: space-around;"><tr style="display: flex justify-content: space-around;" id="1"><th><b>Quick Sort</b></th><th>Best Complexity</th><th>Average Complexity</th><th>Worst Complexity</th></tr><tr id="3" style="display: flex justify-content: space-around;"><td><b>Time Complexity</b></td><td>Ω(N log N)</td><td>Θ(N log N)</td><td>O(N<sup>2</sup>)</td></tr></table>';

  return items;
}

// Insertion Sort Algorithm
async function insertionSort(array) {
  let bars = document.getElementsByClassName("bar");
  for (let i = 1; i < array.length; i++) {
    let key = array[i];
    let j = i - 1;
    while (j >= 0 && array[j] > key) {
      array[j + 1] = array[j];
      bars[j + 1].style.height = array[j + 1] * heightFactor + "px";
      bars[j + 1].style.backgroundColor = "#f40707";
      await sleep(speedFactor);

      for (let k = 0; k < bars.length; k++) {
        if (k != j + 1) {
          bars[k].style.backgroundColor = "rgb(37, 184, 184)";
        }
      }
      j = j - 1;
    }
    array[j + 1] = key;
    bars[j + 1].style.height = array[j + 1] * heightFactor + "px";
    bars[j + 1].style.backgroundColor = "lightgreen";
    await sleep(speedFactor);
  }

  for (let k = 0; k < bars.length; k++) {
    bars[k].style.backgroundColor = "rgb(37, 184, 184)";
  }

  solve.innerHTML = "";
  solve.style.backgroundColor = "gray";
  solve.style.padding = "5px";
  solve.style.margin = "5px";

  solve.innerHTML +=
    '<table style="width:100% background-color: white border: 10px solid red padding: 5px display: flex flex-direction: column justify-content: space-around;"><tr style="display: flex justify-content: space-around;" id="1"><th><b>Insertion Sort</b></th><th>Best Complexity</th><th>Average Complexity</th><th>Worst Complexity</th></tr><tr id="3" style="display: flex justify-content: space-around;"><td><b>Time Complexity</b></td><td>Ω(N)</td><td>Θ(N<sup>2</sup>)</td><td>O(N<sup>2</sup>)</td></tr></table>';

  return array;
}

// Heap Sort Algorithm
async function heapSort(array) {
  let bars = document.getElementsByClassName("bar");
  for (let i = Math.floor(array.length / 2); i >= 0; i--) {
    await heapify(array, array.length, i);
  }
  for (let i = array.length - 1; i >= 0; i--) {
    await swap(array, 0, i, bars);
    await heapify(array, i, 0);
  }
  for (let k = 0; k < bars.length; k++) {
    bars[k].style.backgroundColor = "rgb(37, 184, 184)";
    await sleep(speedFactor);
  }

  solve.innerHTML = "";
  solve.style.backgroundColor = "gray";
  solve.style.padding = "5px";
  solve.style.margin = "5px";

  solve.innerHTML +=
    '<table style="width:100% background-color: white border: 10px solid redpadding: 5px display: flex flex-direction: column justify-content: space-around;"><tr style="display: flex justify-content: space-around;" id="1"><th>Heap Sort</th><th>Best Complexity</th><th>Average Complexity</th><th>Worst Complexity</th></tr><tr id="3" style="display: flex justify-content: space-around;"><td><b>Time Complexity</b></td><td>Ω(N log N)</td><td>Θ(N log N)</td><td>O(N log N)</td></tr></table>';

  return array;
}

async function heapify(array, n, i) {
  let bars = document.getElementsByClassName("bar");
  let largest = i;
  let left = 2 * i + 1;
  let right = 2 * i + 2;
  if (left < n && array[left] > array[largest]) {
    largest = left;
  }
  if (right < n && array[right] > array[largest]) {
    largest = right;
  }
  if (largest != i) {
    await swap(array, i, largest, bars);
    await heapify(array, n, largest);
  }
}

async function swap(array, i, j, bars) {
  let temp = array[i];
  array[i] = array[j];
  array[j] = temp;
  bars[i].style.height = array[i] * heightFactor + "px";
  bars[j].style.height = array[j] * heightFactor + "px";
  bars[i].style.backgroundColor = "#f40707";
  bars[j].style.backgroundColor = "#f40707";
  await sleep(speedFactor);

  for (let k = 0; k < bars.length; k++) {
    if (k != i && k != j) {
      bars[k].style.backgroundColor = "rgb(37, 184, 184)";
    }
  }
  return array;
}

// Merge Sort Algorithm
async function mergeSort(arr) {
  let bars = document.getElementsByClassName("bar");
  if (arr.length < 2) {
    return arr;
  }
  const middle = Math.floor(arr.length / 2);
  const left = arr.slice(0, middle);
  const right = arr.slice(middle);
  let actualHalf = await mergeSort(left);
  await mergeSort(right);

  let i = 0;
  let j = 0;
  let k = 0;

  while (i < left.length && j < right.length) {
    if (left[i] < right[j]) {
      arr[k] = left[i];
      i++;
    } else {
      arr[k] = right[j];
      j++;
    }

    //visualize it for right and left side
    bars[k].style.height = arr[k] * heightFactor + "px";
    bars[k].style.backgroundColor = "lightgreen";
    if (k + arr.length < bars.length) {
      bars[k + arr.length].style.height = arr[k] * heightFactor + "px";
      console.log(arr[k] * heightFactor);
      bars[k + arr.length].style.backgroundColor = "yellow";
    }
    await sleep(speedFactor);
    k++;
  }

  while (i < left.length) {
    arr[k] = left[i];
    bars[k].style.height = arr[k] * heightFactor + "px";
    bars[k].style.backgroundColor = "lightgreen";
    await sleep(speedFactor);
    i++;
    k++;
  }

  while (j < right.length) {
    arr[k] = right[j];
    bars[k].style.height = arr[k] * heightFactor + "px";
    bars[k].style.backgroundColor = "lightgreen";
    await sleep(speedFactor);
    j++;
    k++;
  }

  for (let k = 0; k < bars.length; k++) {
    bars[k].style.backgroundColor = "rgb(37, 184, 184)";
  }

  solve.innerHTML = "";
  solve.style.backgroundColor = "gray";
  solve.style.padding = "5px";
  solve.style.margin = "5px";

  solve.innerHTML +=
    '<table style="width:100% background-color: white border: 10px solid redpadding: 5px display: flex flex-direction: column justify-content: space-around;"><tr style="display: flex justify-content: space-around;" id="1"><th>Merge Sort</th><th>Best Complexity</th><th>Average Complexity</th><th>Worst Complexity</th></tr><tr id="3" style="display: flex justify-content: space-around;"><td><b>Time Complexity</b></td><td>Ω(N log N)</td><td>Θ(N log N)</td><td>O(N log N)</td></tr></table>';

  return arr;
}

// Sorting
sortButton.addEventListener("click", function () {
  solve.innerHTML = "";
  solve.style.backgroundColor = "black";
  switch (algorithmToUse) {
    case "bubble":
      bubbleSort(unsortedArray);
      break;
    case "merge":
      mergeSort(unsortedArray);
      break;
    case "heap":
      heapSort(unsortedArray);
      break;
    case "insertion":
      insertionSort(unsortedArray);
      break;
    case "quick":
      quickSort(unsortedArray, 0, unsortedArray.length - 1);
      break;
    default:
      bubbleSort(unsortedArray);
      break;
  }
});
