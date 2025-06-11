let taskInput = document.getElementById("task-input");
let addTaskBtn = document.getElementById("add-task");
let taskList = document.getElementById("task-list");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks() {
  taskList.innerHTML = "";
  tasks.forEach((task, index) => {
    let li = document.createElement("li");
    li.innerHTML = `
      <span class="${task.completed ? 'completed' : ''}" onclick="toggleTask(${index})">${task.text}</span>
       <button onclick="editTask(${index})"><i class="fa fa-edit"></i></button>
      <button onclick="deleteTask(${index})"><i class="fa fa-trash"></i></button>
    `;
    taskList.appendChild(li);
  });

}
function editTask(index) {
  const li = taskList.children[index];
  const task = tasks[index];
  li.innerHTML = `
    <input type="text" id="edit-input-${index}" value="${task.text}" style="width:60%">
    <button onclick="saveEdit(${index})"><i class="fa fa-check"></i></button>
    <button onclick="renderTasks()"><i class="fa fa-times"></i></button>
  `;
  // Optional: Focus the input
  document.getElementById(`edit-input-${index}`).focus();
}
function saveEdit(index) {
  const input = document.getElementById(`edit-input-${index}`);
  const newText = input.value.trim();
  if (newText) {
    tasks[index].text = newText;
    saveTasks();
    renderTasks();
  }
}

function addTask() {
  if (taskInput.value.trim() === "") return;
  tasks.push({ text: taskInput.value, completed: false });
  saveTasks();
  renderTasks();
  taskInput.value = "";
}

function deleteTask(index) {
  tasks.splice(index, 1);
  saveTasks();
  renderTasks();
}

function toggleTask(index) {
  tasks[index].completed = !tasks[index].completed;
  saveTasks();
  renderTasks();
}

addTaskBtn.addEventListener("click", addTask);

// Optional: Add task on Enter key
taskInput.addEventListener("keydown", function (e) {
  if (e.key === "Enter") addTask();
});

renderTasks();
window.editTask = editTask;
window.saveEdit = saveEdit;
