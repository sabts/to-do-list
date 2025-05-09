const formElement = document.getElementById("form");
const inputTaskElement = document.getElementById("input-task");
const taskElement = document.getElementById("task");
const itemsLeftElement = document.getElementById("items-left");
const deleteCompleteElement = document.getElementById("delete-complete");
const filtersElement = document.getElementById("filters");
const switchElement = document.getElementById("switch")

let tasks = [
  {
    id: Date.now(),
    name: "llorar por el código",
    completed: false,
  },
];

let darkMode = false;

const changeTheme = () => {
  darkMode = !darkMode;

  if(darkMode){
    document.body.classList.remove('light');
    switchElement.src = "/asset/icon-moon.svg";
  }else{
    document.body.classList.add('light');
    switchElement.src = "asset/icon-sun.svg";
  }
}

const countItemsLeft = () => {
  const uptadetasks = tasks.filter(task => !task.completed); // me devuelve lista de las tareas que no tiene el checked (false) --- si no lo tengo como  const uptadetasks me borra los items true
  console.log(tasks);
  if (tasks.length === 0) {
    itemsLeftElement.textContent = `No item left`;
  } else if(uptadetasks.length === 0) {
    itemsLeftElement.textContent = `All task completed`;
   } else {
    itemsLeftElement.textContent = `${uptadetasks.length} items left`;
  }
};

const filterTasks = () => {
  const filterType = filtersElement.querySelector('.filter-active').dataset.filter;
  let taskToRender = tasks;

  if (filterType === 'completed') {
    taskToRender = tasks.filter(task => task.completed); 
  } else if (filterType === 'active') {
    taskToRender = tasks.filter(task => !task.completed);
  }

  insertTasks(taskToRender);
};

const insertTasks = (tasks) => {
  taskElement.textContent = ""; //el padre (el taskElement)

  tasks.forEach(task => {
    //El div --- el hijo 0 del task element 
    const taskContainer = document.createElement("div");
    taskContainer.classList.add("task-container");
    //taskContainer.dataset.id = task.id;

    //El checkBox --- el hijo del div 0
    const checkboxElement = document.createElement("input");
    checkboxElement.type = "checkbox";
    checkboxElement.classList.add("task-check");
    checkboxElement.id = task.id;
    checkboxElement.checked = task.completed;
    checkboxElement.addEventListener("click", () => completeTask(task.id));

    //Para el label --- el hijo del div 1
    const labelCheckboxElement = document.createElement("label");
    labelCheckboxElement.htmlFor = task.id;
    //sintaxis: Element.setAttribute(name, value); el name: seria el nombre del atributo que le agrego y el value en este caso, de quien es el for -- https://developer.mozilla.org/es/docs/Web/API/Element/setAttribute // modo antiguo
    labelCheckboxElement.classList.add("task-text");
    labelCheckboxElement.textContent = task.name;

    //Eliminar task --- el hijo del div 2
    const deleteTaskElement = document.createElement("img");
    deleteTaskElement.classList.add("class-delete");
    deleteTaskElement.src = "/asset/icon-cross.svg";
    //deleteTaskElement.dataset.id = tasks.id; //para no repetir el id
    deleteTaskElement.addEventListener("click", () => deleteTask(task.id));

    taskContainer.append(
      checkboxElement,
      labelCheckboxElement,
      deleteTaskElement
    );
    taskElement.append(taskContainer);
  });
};

const completeTask = id => {
  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].id === id) {
      tasks[i].completed = !tasks[i].completed;
      //cambio el estado de true o false del task marcado
      // tasks[i].completed es false (no completada)
      // !tasks[i].completed es true (completada)
      break;
    }
    //if(taskElement.children[0].children[0].checked === true){
    //console.log('tarea ' + id + ' está completada') // al menos puedo comprobar aqui que las tareas si se estan marcando como completada
  }
  filterTasks()
  countItemsLeft();
};

//Recordatorio: no se editan las tareas en el DOM ni se eliminan del DOM, completar una tarea implica cambiar el completed de true a false o de false a true y eliminarla implica eliminarla del array porque cada vez que algo cambie volverás a pintar todo el array entero con sus cambios en el DOM
const deleteTask = id => {
  tasks = tasks.filter(task => task.id !== id);
  filterTasks()
  countItemsLeft();
};

const createTask = event => {
  const taskText = inputTaskElement.value;
  if (taskText === "") return;

  const newTask = {
    id: Date.now(),
    name: taskText,
    completed: false,
  };
  //console.log("Nuevo ID:", newTask.id);

  tasks.push(newTask);
  inputTaskElement.value = "";

  filterTasks()
  countItemsLeft();
};

const setFilter = (event) => {
currentFilter = event.target.dataset.filter;

if (!currentFilter) return;

filtersElement.querySelector(".filter-active").classList.remove("filter-active")

event.target.classList.add('filter-active');

  filterTasks();
};

const deleteAllCompletedTasks = () => {
  const taskToDelete = tasks.filter(task => !task.completed);

  if (taskToDelete) {
    tasks.splice(taskToDelete.length);
  }

  insertTasks();
  countItemsLeft();
  completeTask();
};

filterTasks();

formElement.addEventListener("submit", event => {
  event.preventDefault();
  createTask();
});
filtersElement.addEventListener('click', setFilter);
deleteCompleteElement.addEventListener("click", deleteAllCompletedTasks);
switchElement.addEventListener("click", changeTheme)