const formElement = document.getElementById("form");
const inputTaskElement = document.getElementById("input-task");
const taskElement = document.getElementById("task");
const itemsLeftElement = document.getElementById("items-left");
const deleteCompleteElement = document.getElementById("delete-complete");
const filtersElement = document.getElementById("filters");

let tasks = [
  {
    id: Date.now(),
    name: "llorar por el código",
    completed: false,
  },
];

let currentFilter = "all";

const countItemsLeft = () => {
  const uptadetasks = tasks.filter(task => !task.completed); // me devuelve lista de las tareas que no tiene el checked (false) --- si no lo tengo como  const uptadetasks me borra los items true
  console.log(tasks);
  if (tasks.length === 0) {
    itemsLeftElement.textContent = `No item left`;
  } else {
    itemsLeftElement.textContent = `${uptadetasks.length} items left`;
  }
  if (!uptadetasks.length >= 0) {
    itemsLeftElement.textContent = `All task completed`; //no actuliza aunque agregas otra tarea
  }
};

const filterTasks = () => {
  let filteringTask = tasks;

  if (currentFilter === "all") {
    filteringTask = tasks;
  } else if (currentFilter === "active") {
    filteringTask = tasks.filter(task => task.completed);
  } else if (currentFilter === "completed") {
    filteringTask = tasks.filter(task => !task.completed);
  }
  // console.log("selecccionaste el filtro: " + event.target.dataset.filter);

  insertTasks();
};

const insertTasks = () => {
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
  insertTasks();
  countItemsLeft();
};

//no se editan las tareas en el DOM ni se eliminan del DOM, completar una tarea implica cambiar el completed de true a false o de false a true y eliminarla implica eliminarla del array porque cada vez que algo cambie volverás a pintar todo el array entero con sus cambios en el DOM
const deleteTask = id => {
  tasks = tasks.filter(task => task.id !== id);
  insertTasks();
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
  insertTasks();
  inputTaskElement.value = "";

  countItemsLeft();
};

const setFilter = filterTarget => {
  taskElement.textContent = "";
  currentFilter;

  if (currentFilter === "all") {
    tasks;
    filtersElement[0].classList.add("filter-active");
    filtersElement[1].classList.remove("filter-active");
    filtersElement[2].classList.remove("filter-active");
  } else if (currentFilter === "active") {
    tasks.completed;
    filtersElement[0].classList.remove("filter-active");
    filtersElement[2].classList.remove("filter-active");
    filtersElement[1].classList.add("filter-active");
  } else {
    !tasks.completed;
    filtersElement[2].classList.add("filter-active");
    filtersElement[0].classList.remove("filter-active");
    filtersElement[1].classList.remove("filter-active");
  }

  insertTasks();
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

insertTasks();
filterTasks();

formElement.addEventListener("submit", event => {
  event.preventDefault();
  createTask();
});

filtersElement.addEventListener("click", event => {
  setFilter();
});
deleteCompleteElement.addEventListener("click", deleteAllCompletedTasks);
