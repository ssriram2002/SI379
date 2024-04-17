document.addEventListener("DOMContentLoaded", () => {
  const taskList = document.getElementById("taskList");
  const addTaskBtn = document.getElementById("addTaskBtn");
  const taskModal = document.getElementById("taskModal");
  const taskInput = document.getElementById("taskInput");
  const saveTaskBtn = document.getElementById("saveTaskBtn");
  const workSessionModal = document.getElementById("workSessionModal");
  const startWorkBtn = document.getElementById("startWorkBtn");
  const breakSessionModal = document.getElementById("breakSessionModal");
  const startBreakBtn = document.getElementById("startBreakBtn");
  const timerDisplay = document.getElementById("timerDisplay");
  const lemonsDisplay = document.getElementById("lemonsDisplay");
  const workTimeInput = document.getElementById("workTime");
  const breakTimeInput = document.getElementById("breakTime");
  const updateTimesBtn = document.getElementById("updateTimesBtn");
  let tasks = [];
  let currentTaskIndex = null;
  let timerInterval = null;
  let timerDuration = 25 * 60; // Default work time: 25 minutes in seconds
  let breakDuration = 5 * 60; // Default break time: 5 minutes in seconds
  let isWorkTime = true;
  let isBreakTime = false;

  // Function to render tasks
// Function to render tasks
const renderTasks = () => {
  taskList.innerHTML = "";
  tasks.forEach((task, index) => {
    const taskItem = document.createElement("div");
    taskItem.classList.add("task-item");
    taskItem.innerHTML = `
      <span contenteditable="true">${task.description}</span>
      <span class="lemon-icons">${'🍋'.repeat(task.workSessions)}</span>
      <button class="start-work" data-index="${index}">Start</button>
      <button class="delete-task" data-index="${index}">Delete</button>
    `;
    taskList.appendChild(taskItem);
  });
};

// Event delegation for deleting tasks
taskList.addEventListener("click", (event) => {
  if (event.target.classList.contains("delete-task")) {
    const index = event.target.dataset.index;
    tasks.splice(index, 1); // Remove the task from the tasks array
    localStorage.setItem("tasks", JSON.stringify(tasks)); // Update localStorage
    renderTasks(); // Re-render the task list
    updateLemonsDisplay(); // Update lemons display if needed
  }
});



  // Function to start work session
  const startWorkSession = (index) => {
    currentTaskIndex = index;
    workSessionModal.style.display = "block";
    startWorkBtn.dataset.index = index;
    startTimer(timerDuration);
    console.log("work session started")
  };


  // Function to start the timer
  const startTimer = (duration) => {
    let minutes, seconds;
    timerInterval = setInterval(() => {
      minutes = Math.floor(duration / 60);
      seconds = duration % 60;
      timerDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
      duration--;

      if (duration < 0) {
        clearInterval(timerInterval);
        if (isWorkTime) {
          isWorkTime = false;
          isBreakTime = true;
          endWorkSession();
          console.log("work session ended")
        } else if (isBreakTime) {
          isBreakTime = false;
          isWorkTime = true;
          endBreakSession();
          console.log("break session ended")
        }
      }
    }, 1000);
  };

  // Function to end work session
  const endWorkSession = () => {
    workSessionModal.style.display = "none";
    tasks[currentTaskIndex].workSessions++;
    localStorage.setItem("tasks", JSON.stringify(tasks));
    renderTasks();
    updateLemonsDisplay();
    setTimeout(() => {
      startBreakSession();
      console.log("breaksession started")
    }, 1000); // Start break session after 1 second
  };
  
  const startBreakSession = () => {
    breakSessionModal.style.display = "block";
    setTimeout(() => {
      startBreakSession(currentTaskIndex);
    }, 1000); // Start work session after 1 second
  };
  // Function to end break session
  const endBreakSession = () => {
    breakSessionModal.style.display = "none";
    setTimeout(() => {
      startWorkSession(currentTaskIndex);
    }, 1000); // Start work session after 1 second
  };


  // Function to update lemons display
  const updateLemonsDisplay = () => {
    const currentTask = tasks[currentTaskIndex];
    lemonsDisplay.textContent = '🍋'.repeat(currentTask.workSessions);
  };

  // Event listener for adding a new task
  addTaskBtn.addEventListener("click", () => {
    taskModal.style.display = "block";
  });

  // Event listener for saving a task
  saveTaskBtn.addEventListener("click", () => {
    const description = taskInput.value.trim();
    if (description) {
      tasks.push({ description, workSessions: 0 });
      taskInput.value = "";
      taskModal.style.display = "none";
      localStorage.setItem("tasks", JSON.stringify(tasks));
      renderTasks();
    }
  });

  // Event delegation for starting work sessions
  taskList.addEventListener("click", (event) => {
    if (event.target.classList.contains("start-work")) {
      const index = event.target.dataset.index;
      startWorkSession(index);
    }
  });


    // Event listener for work time input change
    workTimeInput.addEventListener("change", () => {
      timerDuration = workTimeInput.value * 60;
      clearInterval(timerInterval);
      timerDisplay.textContent = "";
    });
  
    // Event listener for break time input change
    breakTimeInput.addEventListener("change", () => {
      breakDuration = breakTimeInput.value * 60;
      clearInterval(timerInterval);
      timerDisplay.textContent = "";
    });


  // Close the modals when clicking the close button or outside the modal
  window.addEventListener("click", (event) => {
    if (event.target == taskModal || event.target == workSessionModal || event.target == breakSessionModal) {
      taskModal.style.display = "none";
      workSessionModal.style.display = "none";
      breakSessionModal.style.display = "none";
    }
  });

  // Load tasks from localStorage on page load
  const storedTasks = localStorage.getItem("tasks");
  if (storedTasks) {
    tasks = JSON.parse(storedTasks);
    renderTasks();
    updateLemonsDisplay();
  }
});

// Function to start the timer with popup
const startTimerWithPopup = (duration) => {
  let minutes, seconds;
  timerDisplay.textContent = ""; // Clear existing timer display
  timerInterval = setInterval(() => {
    minutes = Math.floor(duration / 60);
    seconds = duration % 60;
    timerDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    duration--;

    if (duration < 0) {
      clearInterval(timerInterval);
      breakSessionModal.style.display = "none"; // Hide break session modal after timer ends
      isWorkSession = true;
      setTimeout(() => startWorkSession(currentTaskIndex), 1000); // Wait for 1 second before starting work
    }
  }, 1000);
};
