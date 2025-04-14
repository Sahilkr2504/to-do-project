
// Create addTask function
function addTask() {
  const taskList = document.getElementById('taskList');
  const taskText = document.getElementById('inputTask').value;
  
  if (taskText.trim() === '') {
    alert('Task cannot be empty');
    return;
  }

  const newTask = createTaskElement(taskText);
  
  taskList.appendChild(newTask);
  
  // Clear input
  document.getElementById('inputTask').value = "";
}

function createTaskElement(taskText) {
  const newTask = document.createElement('li');
  
  // Task Text Span
  const taskTextSpan = document.createElement('span');
  taskTextSpan.className = 'task-text';
  taskTextSpan.textContent = taskText;
  
  // Task Actions Div
  const taskActions = document.createElement('div');
  taskActions.className = 'task-actions';
  
  // Add task elements to newTask
  newTask.appendChild(taskTextSpan);
  newTask.appendChild(taskActions);
  
  // Add buttons to task actions
  addTaskButtons(newTask, taskTextSpan, taskActions);
  
  return newTask;
}

function addTaskButtons(newTask, taskTextSpan, taskActions) {
  // Edit button
  const editBtn = document.createElement('button');
  editBtn.textContent = "Edit";
  editBtn.className = 'edit-btn';
  
  // Delete button
  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = "Delete";
  deleteBtn.className = 'delete-btn';
  
  // Add buttons to task actions
  taskActions.appendChild(editBtn);
  taskActions.appendChild(deleteBtn);

  // Edit functionality
  editBtn.onclick = function() {
    startEditMode(newTask, taskTextSpan, taskActions);
  };
  
  // Delete functionality
  deleteBtn.onclick = function() {
    newTask.remove();
  };
}

function startEditMode(newTask, taskTextSpan, taskActions) {
  // Hide current task content
  taskTextSpan.style.display = 'none';
  taskActions.style.display = 'none';
  
  // Create input for editing and save button
  const editInput = document.createElement('input');
  editInput.type = 'text';
  editInput.value = taskTextSpan.textContent;
  editInput.className = 'edit-input';

  const saveBtn = document.createElement('button');
  saveBtn.textContent = "Save";
  saveBtn.className = 'save-btn';
  
  // Create container for edit mode
  const editModeContainer = document.createElement('div');
  editModeContainer.className = 'edit-mode';
  editModeContainer.appendChild(editInput);
  editModeContainer.appendChild(saveBtn);
  
  // Insert edit mode container above the task actions
  newTask.insertBefore(editModeContainer, taskActions);
  
  // Focus on input
  editInput.focus();

  // Save functionality
  saveBtn.onclick = function() {
    taskTextSpan.textContent = editInput.value;
    taskTextSpan.style.display = 'block';
    taskActions.style.display = 'flex';
    newTask.removeChild(editModeContainer);
  };
  
  // Allow pressing enter to save
  editInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
      saveBtn.click();
    }
  });
}
