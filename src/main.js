const todoName = document.querySelector("#todoName");
const toDoList = document.querySelector("#toDoList");
const AddButton = document.querySelector("#AddBtn");


const db = new Dexie("ToDoList-BrowserDB"); 

db.version(1).stores({
    todoList: '++id,Content,dateTime'
});

window.onload = () => {    
        listRefresher()
}

todoName.addEventListener("keypress", (event) => {
    if(event.key == "Enter"){
        AddToList()
    }
})

const AddToList = () => {
    let todoItem = {
        Content: todoName.value,
    }
    // Añadiendo los todo Item de la base de datos
    db.todoList.add(todoItem)
    .then(() => {
        todoName.value = "";
        listRefresher();
    })
    .catch(error => console.error(`Error al añadir el item: ${error}`))

    
}

const listRefresher = () => {
    toDoList.innerHTML = "";
    // sacando los todoItem de la base de dato
    db.todoList.toArray()
    .then( itemsList => {
        console.log("Sacando los todoItem del database..!!", itemsList);
        itemsList.forEach(item => {
            let todo_item = todoItem(item.id, item.Content, item.dateTime)
                
            toDoList.appendChild(todo_item)
        });
    });
    
}

const todoItem = (id,content, date) => {
    let li = document.createElement('li')
    let input = document.createElement('input')
    let button = document.createElement("button");
    let span = document.createElement('span');

    li.id = id;
    li.className = "d-flex m-2 pb-4 w-auto"
    span.innerText = content;
    span.className = "text-center pt-3"
    input.className = "form-control p-2 ms-2 me-2";
    input.type = "datetime-local";
    input.value = date;
    button.className = "btn btn-success p-3"
    button.innerText = "Done";

    button.addEventListener('click', event => {
        if(li.id == id){
            li.remove()
        }
        db.todoList.delete(id)
        .then(() => console.log(`Se ha eliminado el contenido con el ID: ${li.id}`))
        .catch(err => console.error(err));
    });

    input.addEventListener('change', (e) => {
        console.log("Volor:",e.target.value)
        console.log("ID: ", li.id)
        db.todoList.update(id,{dateTime: e.target.value})
        .then(ctx => console.log("Actualizando data ....",ctx))
        .catch(err => console.error(err))
    })

    li.appendChild(span);
    li.appendChild(input);
    li.appendChild(button);

    return li;

}