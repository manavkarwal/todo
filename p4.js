const mainTodoElem = document.querySelector(".todo-lists-elem");
const inputValue = document.getElementById("inputValue");





const getTodoListFromLocal = () => {
    return JSON.parse(localStorage.getItem("youtubeTodoLists"));
};

let localTodoLists = getTodoListFromLocal() || [];


const addTodoListLocalStorage = (localTodoLists) => {
    return localStorage.setItem("youtubeTodoLists" , JSON.stringify(localTodoLists));
};








const addTodoDynamicElement = (curElem) => {
    const divElement = document.createElement("div");
    divElement.classList.add("main_todo_div");
    divElement.innerHTML = `<li>${curElem}</li>  <button class="deleteBtn"> Delete </button>`;
    mainTodoElem.append(divElement);
};



const addTodoList = (e) => {
     e.preventDefault();
    const todoListsValue = inputValue.value.trim();

    inputValue.value = "";
    if(todoListsValue !== "" && !localTodoLists.includes(todoListsValue)) {
    localTodoLists.push(todoListsValue);
    localTodoLists = [... new Set(localTodoLists)];
    localStorage.setItem("youtubeTodoLists" , JSON.stringify(localTodoLists));
    
    addTodoDynamicElement(todoListsValue);
    }
};




const showTodoLists = () => {
    localTodoLists.forEach((curElem) => {
        addTodoDynamicElement(curElem);
    });
};




showTodoLists();




const removeTodoElem = (e) => {
 const todoToRemove = e.target;
 let todoListsContent = todoToRemove.previousElementSibling.innerText;
 let parentElem = todoToRemove.parentElement;
 localTodoLists = localTodoLists.filter((curTodo) => {
    return curTodo !==  todoListsContent.toLowerCase();
 });

    addTodoListLocalStorage(localTodoLists);
    parentElem.remove();

};




mainTodoElem.addEventListener("click", (e) => {
    e.preventDefault();
    if ( e.target.classList.contains("deleteBtn"))
    {
    removeTodoElem(e);
}
});



document.querySelector(".btn").addEventListener("click", (e) =>
addTodoList(e));


