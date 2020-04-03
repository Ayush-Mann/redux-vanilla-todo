export const addTodo =(text) =>{
    return({
        type:"addTodo",
        text
    })
}

export const toggleTodo =() =>{
    return({
        type:"toggleTodo",
        
    })
}

export const logging =() =>{
    return({
        type:"SIGN_IN",
        
    })
}