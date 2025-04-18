const formElement = document.getElementById("form");
const inputTaskElement = document.getElementById("input-task")
const taskElement = document.getElementById("task")
const itemsLeftElement = document.getElementById('items-left')
const deleteCompleteElement = document.getElementById('delete-complete')

const tasks = [
    {
      id: Date.now(),
      name: 'llorar por el código',
      completed: false
    }
  ];

  //let allTask = [];

  const insertTasks = () =>{
    taskElement.textContent = ""; 

    tasks.forEach(task => {
      //El div
      const taskContainer = document.createElement('div');
      taskContainer.classList.add('task-container');
      //taskContainer.dataset.id = task.id;
    
      //El checkBox
      const checkboxElement = document.createElement('input')
      checkboxElement.type = 'checkbox';
      checkboxElement.classList.add('task-check');
      checkboxElement.id = task.id;
      checkboxElement.checked = task.completed;
    
      //Para el label
      const labelCheckboxElement = document.createElement('label');
      labelCheckboxElement.htmlFor = task.id
     //Lo deje como reflexión: intente hacer algo con el data pero no me funcionó, el objeto se crea en la web pero no me deja marcar el check, asi que investigue "como aplicar el 'for' a un label en javaScript" :)
     //sintaxis: Element.setAttribute(name, value); el name: seria el nombre del atributo que le agrego y el value en este caso, de quien es el for
     //https://developer.mozilla.org/es/docs/Web/API/Element/setAttribute
      labelCheckboxElement.classList.add('task-text');
      labelCheckboxElement.textContent = task.name
      //if (task.name === "") return; //si no le agrego esto me crea un dos cosas a la lista: el primer objeto vacio y el nuevo que cree Esto era cuando vacie el name de objeto

    
      //Eliminar task
      const deleteTaskElement = document.createElement('img');
      deleteTaskElement.classList.add('class-delete');
      deleteTaskElement.src = "/asset/icon-cross.svg";
      deleteTaskElement.addEventListener('click', () => deleteTask(task.id));
      

      taskContainer.append(checkboxElement, labelCheckboxElement, deleteTaskElement);
      taskElement.append(taskContainer)
    })
  }


//, no se editan las tareas en el DOM ni se eliminan del DOM, completar una tarea implica cambiar el completed de true a false o de false a true y eliminarla implica eliminarla del array porque cada vez que algo cambie volverás a pintar todo el array entero con sus cambios en el DOM
const deleteTask = (id) => {
  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].id === id) {
      tasks.splice(i, 1); // Eliminar la tarea del array
      break;   
    }
    }
insertTasks();
}

const createTask = (event) => {
event.preventDefault();

const taskText = inputTaskElement.value;
if (taskText === "") return; 

const newTask ={
  id: Date.now(),
  name: taskText,
  completed: false
}
//console.log("Nuevo ID:", newTask.id);

tasks.push(newTask);
insertTasks ();
inputTaskElement.value = "";
}

formElement.addEventListener("submit",createTask);
insertTasks()