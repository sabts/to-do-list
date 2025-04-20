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


const countItemsLeft = () => {  
  if(taskElement.childElementCount === 0) { 
    itemsLeftElement.textContent = `No item left`}
  else{
     itemsLeftElement.textContent = `${taskElement.childElementCount} items left`
  }
//cuando use el filtro para que me diera el numero de task completadas pero sobre escribia el mensaje de no items left pero ahora cuando marco todas las tareas como completas me dice [Object Object] items left


  //me suma el item left pero no me lo resta si elimino una
  //seguro se sobreescribio con la funcion de (complete task) pero ya no se como solucionarlo, intentare darle otra vuelta más tarde pero si para el lunes sigue igual preguntare...
  }


const insertTasks = () =>{
  taskElement.textContent = "";  //el padre (el taskElement)

    tasks.forEach(task => {
      //El div --- el hijo 0 del task element
      const taskContainer = document.createElement('div');
      taskContainer.classList.add('task-container');
      //taskContainer.dataset.id = task.id;
    
      //El checkBox --- el hijo del div 0
      const checkboxElement = document.createElement('input')
      checkboxElement.type = 'checkbox';
      checkboxElement.classList.add('task-check');
      checkboxElement.id = task.id;
      checkboxElement.checked = task.completed;
      checkboxElement.addEventListener("click", () => completeTask(task.id));
    
      //Para el label --- el hijo del div 1
      const labelCheckboxElement = document.createElement('label');
      labelCheckboxElement.htmlFor = task.id;
     //sintaxis: Element.setAttribute(name, value); el name: seria el nombre del atributo que le agrego y el value en este caso, de quien es el for -- https://developer.mozilla.org/es/docs/Web/API/Element/setAttribute
      labelCheckboxElement.classList.add('task-text');
      labelCheckboxElement.textContent = task.name
    
      //Eliminar task --- el hijo del div 2
      const deleteTaskElement = document.createElement('img');
      deleteTaskElement.classList.add('class-delete');
      deleteTaskElement.src = "/asset/icon-cross.svg";
      deleteTaskElement.addEventListener('click', () => deleteTask(task.id));

      taskContainer.append(checkboxElement, labelCheckboxElement, deleteTaskElement);
      taskElement.append(taskContainer)
    })
  }

const completeTask = (id) => {
  for(let i = 0; i < tasks.length; i++){
    if(tasks[i].id === id){
      tasks[i].completed = !tasks[i].completed; 
      //cambio el estado de true o false del task marcado 
      // tasks[i].completed es false (no completada) 
      // !tasks[i].completed es true (completada)
      break
    }
    const incompleteTaskList = tasks.filter(task => task.completed); // me devuelve lista de las tareas que no tiene el checked
      
    if(incompleteTaskList.length === 0){ // este if esta de adorno, no me lee cuando todas las tareas estan completas
    //pero la lógica seria: sí el largo del array es 0, las tareas estan en true (completadas)
    itemsLeftElement.textContent = "All task completed" 
    } else{
    itemsLeftElement.textContent = `item left ${incompleteTaskList.length}`
    }
    console.log(itemsLeftElement.textContent)
    
  }
  //if(taskElement.children[0].children[0].checked === true){
  //console.log('tarea ' + id + ' está completada') // al menos puedo comprobar aqui que las tareas si se estan marcando como completada
  //}  
  insertTasks();   
  countItemsLeft();
}

//no se editan las tareas en el DOM ni se eliminan del DOM, completar una tarea implica cambiar el completed de true a false o de false a true y eliminarla implica eliminarla del array porque cada vez que algo cambie volverás a pintar todo el array entero con sus cambios en el DOM
const deleteTask = (id) => {
  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].id === id) {
      console.log('estas borrando ' + + tasks[i].id)
      tasks.splice(i, 1); // Eliminar la tarea del tasks
      break; 
    }
    }
insertTasks();
countItemsLeft()
}

const createTask = (event) => {
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

const deleteAllCompletedTasks = () => {
const taskToDelete = tasks.filter((task) => !task.completed);

if(taskToDelete)
  {
    tasks.splice(taskToDelete.length)
  };

  insertTasks();
  countItemsLeft();
  completeTask();
}

insertTasks();

//formElement.addEventListener("submit",createTask);
formElement.addEventListener('submit', event => {event.preventDefault();
                                                 createTask();       
                                                 countItemsLeft();});

deleteCompleteElement.addEventListener('click', deleteAllCompletedTasks);