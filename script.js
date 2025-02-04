document.addEventListener("DOMContentLoaded", () => {
  const inputBox = document.getElementById("inputBox");
  const enterBtn = document.querySelector(".enter");
  const listsContainer = document.querySelector(".lists");

  // Load tasks from localStorage when page loads
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  function animateBtn() {
    enterBtn.classList.add("pressed");
    setTimeout(() => {
      enterBtn.classList.remove("pressed");
    }, 200);
  }

  //   function addTask() {
  //     const taskText = inputBox.value.trim();
  //     if (taskText) {
  //       console.log("Task added:", taskText);
  //       inputBox.value = "";
  //     }
  //   }

  function addTask(taskText = inputBox.value.trim()) {
    // const taskText = inputBox.value.trim();
    if (!taskText) return;

    // Add task to array and save it
    tasks.push({ text: taskText, completed: false });
    saveTasks();

    renderTasks();
    // Clear input
    inputBox.value = "";
  }

  function renderTasks() {
    listsContainer.innerHTML = "";

    tasks.forEach((task, index) => {
      // Create new task element
      const taskDiv = document.createElement("div");
      taskDiv.className = "task";

      // Create checkbox
      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.checked = task.completed;

      // Create task text
      const taskName = document.createElement("p");
      taskName.className = "task-name";
      taskName.textContent = task.text;
      if (task.completed) taskName.style.textDecoration = "line-through";

      // Create delete button
      const deleteBtn = document.createElement("img");
      deleteBtn.src = "delete icon.png";
      deleteBtn.className = "delete";
      deleteBtn.alt = "delete";

      // Add event listeners
      checkbox.addEventListener("change", () => {
        tasks[index].completed = checkbox.checked;
        saveTasks();
        renderTasks();
      });

      deleteBtn.addEventListener("click", () => {
        tasks.splice(index, 1);
        saveTasks();
        renderTasks();
      });

      // Assemble task
      taskDiv.appendChild(checkbox);
      taskDiv.appendChild(taskName);
      taskDiv.appendChild(deleteBtn);

      // Add to list
      listsContainer.appendChild(taskDiv);
    });
  }
  //   Load tasks on page load
  renderTasks();

  // Event listener with animation
  inputBox.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      animateBtn();
      addTask();
    }
  });

  enterBtn.addEventListener("click", (e) => {
    animateBtn();
    setTimeout(addTask, 200); //Match animation duration
  });
});
