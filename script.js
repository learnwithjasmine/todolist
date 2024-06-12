// Get the elements from the document
const taskInput = document.getElementById("task");
const addButton = document.getElementById("add");
const list = document.getElementById("list");

// Initialize an array to store the tasks
let tasks = [];

// Load the tasks from the local storage
function loadTasks() {
  // Get the tasks from the local storage
  const storedTasks = localStorage.getItem("tasks");

  // If there are any tasks, parse them and assign them to the tasks array
  if (storedTasks) {
    tasks = JSON.parse(storedTasks);
  }

  // Render the tasks on the list
  renderTasks();
}

// Save the tasks to the local storage
function saveTasks() {
  // Stringify the tasks array and store it in the local storage
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Render the tasks on the list
function renderTasks() {
  // Clear the list
  list.innerHTML = "";

  // Loop through the tasks array
  for (let i = 0; i < tasks.length; i++) {
    // Get the current task object
    const task = tasks[i];

    // Create a list item element
    const li = document.createElement("li");

    // Create a checkbox input element
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.completed;

    // Add an event listener to the checkbox
    checkbox.addEventListener("change", function () {
      // Toggle the completed property of the task object
      task.completed = !task.completed;

      // Save the tasks to the local storage
      saveTasks();

      // Render the tasks on the list
      renderTasks();
    });

    // Create a span element to display the task text
    const span = document.createElement("span");
    span.textContent = task.text;

    // Create a button element to delete the task
    const button = document.createElement("button");
    button.textContent = "Delete";

    // Add an event listener to the button
    button.addEventListener("click", function () {
      // Remove the task from the tasks array
      tasks.splice(i, 1);

      // Save the tasks to the local storage
      saveTasks();

      // Render the tasks on the list
      renderTasks();
    });

    // Append the elements to the list item
    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(button);

    // Add a class to the list item if the task is completed
    if (task.completed) {
      li.classList.add("completed");
    }

    // Append the list item to the list
    list.appendChild(li);
  }
}

// Add an event listener to the add button
addButton.addEventListener("click", function () {
  // Get the task text from the input
  const taskText = taskInput.value;

  // If the task text is not empty
  if (taskText) {
    // Create a new task object
    const task = {
      text: taskText,
      completed: false,
    };

    // Add the task to the tasks array
    tasks.push(task);

    // Save the tasks to the local storage
    saveTasks();

    // Render the tasks on the list
    renderTasks();

    // Clear the input
    taskInput.value = "";
  }
});

// Load the tasks from the local storage when the page loads
loadTasks();
