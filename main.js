// import { addTodo, toggleTodo } from "./actions"
const input = document.querySelector('.input-todo')
const ulist = document.querySelector('.ulist')
const allTodoBtn = document.querySelector('.allTodoBtn')
const activeTodoBtn = document.querySelector('.activeTodoBtn')
const completedTodoBtn = document.querySelector('.completedTodoBtn')

// actions
const addTodo =(text) =>{
    return({
        type:"addTodo",
        text
    })
}

const toggleTodo =(event) =>{
    return({
        type:"toggleTodo",
        id:event.target.dataset.id
    })
}
const deleteTodo = (event)=>{
    return({
        type:'deleteTodo',
        id:event.target.dataset.id
    })
}

const allTodo =()=>{
    return({
        type:"allTodo"
    })
}
const activeTodo =()=>{
    return({
        type:"activeTodo"
    })
}
const completedTodo =()=>{
    return({
        type:"completedTodo"
    })
}
const initialState = {
    
    todos: []
  }
let store = Redux.createStore(reducer)


// store.subscribe(listTodos)
// reducer
function reducer(state=[],action){
    console.log("action",action)
    switch(action.type){
        case 'addTodo':{
            const newTodo = {
                id:Date.now(),
                isComplete:false,
                text:action.text
            }
            var newState = state.concat(newTodo)
            // console.log(newState,"newState")
            
            return newState
        }
        case 'toggleTodo':{
            // console.log("toggling",action.id)
            updated = state.map(todo=>{
                if(todo.id==action.id){

                    todo.isComplete =!todo.isComplete
                }
                return todo
            })
            return updated
        }
        case 'deleteTodo':{
            const afterDelete = state.filter(todo=>!(todo.id==action.id))
            return afterDelete
        }
        case "allTodo": {
			return state;
        }
        case "activeTodo":{
            console.log("asdasd")
            const activeState = state.filter(todo=>!(todo.isComplete))
            return activeState
        }
        case "completedTodo":{
            console.log("completed")
            const completedState = state.filter(todo=>(todo.isComplete))
            return completedState 
        }
           
    }
}
// rendering UI
function listTodos(){
    ulist.innerHTML=""
    console.log(store.getState())
    const todos = store.getState();
    
    todos?todos.forEach(todo => {
        const li = document.createElement('list')
        li.classList.add="list"
        const checker = document.createElement('input')
        checker.type = 'checkbox';
        checker.checked = todo.isComplete;
        checker.setAttribute('data-id', todo.id);
        checker.addEventListener('click',event=>{
           store.dispatch(toggleTodo(event))
           listTodos()
        })
        const p = document.createElement('p')
        p.classList.add('text');
        p.textContent = todo.text
        const span = document.createElement('span')
        span.classList.add("deleteBtn")
        span.textContent = "X";
        span.setAttribute('data-id', todo.id);
        span.addEventListener('click',event=>{
            store.dispatch(deleteTodo(event))
            listTodos()
        })
        li.append(checker, p , span);
        ulist.append(li)
        
    }):null;
    
}
listTodos()


input.addEventListener("keyup", event => {
	if (event.keyCode === 13 && event.target.value.trim() !== "") {
		const textInput = event.target.value;
		store.dispatch(addTodo(textInput));
        event.target.value = "";
        // console.log("dilli")
        listTodos()
	}
});

allTodoBtn.addEventListener("click", () => {
    store.dispatch(allTodo());
    listTodos()
});

activeTodoBtn.addEventListener("click", () => {
    store.dispatch(activeTodo());
    listTodos()
});
completedTodoBtn.addEventListener('click',()=>{
    store.dispatch(completedTodo());
    listTodos()
})