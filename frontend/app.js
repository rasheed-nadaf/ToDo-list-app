const apiBaseUrl = 'http://localhost:3000/api';

async function fetchTasks() {
    const response = await fetch(`${apiBaseUrl}/tasks`);
    const tasks = await response.json();

    const pendingTasksElement = document.getElementById('pending-tasks');
    const completedTasksElement = document.getElementById('completed-tasks');

    pendingTasksElement.innerHTML = '';
    completedTasksElement.innerHTML = '';

    tasks.forEach(task => {
        const taskElement = document.createElement('li');
        taskElement.textContent = task.description;

        const completeButton = document.createElement('button');
        completeButton.textContent = 'Complete';
        completeButton.className = 'complete';
        completeButton.onclick = () => completeTask(task.id);

        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.className = 'edit';
        editButton.onclick = () => editTask(task.id);

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.className = 'delete';
        deleteButton.onclick = () => deleteTask(task.id);

        taskElement.appendChild(completeButton);
        taskElement.appendChild(editButton);
        taskElement.appendChild(deleteButton);

        if (task.completed_at) {
            completedTasksElement.appendChild(taskElement);
        } else {
            pendingTasksElement.appendChild(taskElement);
        }
    });
}

async function addTask() {
    const description = document.getElementById('new-task').value;

    if (description.trim()) {
        await fetch(`${apiBaseUrl}/tasks`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ description })
        });

        document.getElementById('new-task').value = '';
        fetchTasks();
    }
}

async function completeTask(id) {
    await fetch(`${apiBaseUrl}/tasks/${id}/complete`, {
        method: 'PUT'
    });

    fetchTasks();
}

async function editTask(id) {
    const newDescription = prompt('Edit the task:');

    if (newDescription.trim()) {
        await fetch(`${apiBaseUrl}/tasks/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ description: newDescription })
        });

        fetchTasks();
    }
}

async function deleteTask(id) {
    await fetch(`${apiBaseUrl}/tasks/${id}`, {
        method: 'DELETE'
    });

    fetchTasks();
}

// Initial load
fetchTasks();
