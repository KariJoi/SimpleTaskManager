document.addEventListener("DOMContentLoaded", loadTasks);

const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");

addTaskBtn.addEventListener("click", addTask);

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach(task => renderTask(task.text, task.completed));
}

function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText) {
        renderTask(taskText);
        saveTask(taskText, false);
        taskInput.value = "";
        showNotification("New Task Added");
    }
}

function renderTask(text, completed = false) {
    const task = document.createElement("li");
    task.classList.add("task");
    if (completed) task.classList.add("task-completed");

    task.innerHTML = `
        <span>${text}</span>
        <button onclick="toggleTaskCompletion(this)">✔️</button>
        <button onclick="deleteTask(this)">❌</button>
    `;
    taskList.appendChild(task);
}

function toggleTaskCompletion(button) {
    const task = button.parentElement;
    task.classList.toggle("task-completed");
}

function deleteTask(button) {
    const task = button.parentElement;
    taskList.removeChild(task);
}

// Show notification
function showNotification(message) {
    const notification = document.getElementById("notification");
    notification.textContent = message;
    notification.style.display = "block";
    setTimeout(() => { notification.style.display = "none"; }, 2000);
}
