import { useEffect, useState } from "react";
import { Todoprovider } from "./contexts/Todocontext";

export default function App() {
  const [todos,settodo] = useState([])

  const addTodo = (todo) => {
    settodo((prev) => [{id: Date.now(),...todo},...prev])

  }

  const updateTodo = (id,todo) => {
    settodo((prev) => prev.map((prevTodo) => (prevTodo===id ? todo: prevTodo)))
  }

  // mostly times we dont use map using the delete command
  // to use the delete command we use the concept liek this--> we think like we are making a new array in which we dont want to icnlude the value which we want to delete so we use the filter command which will filter the values which are not equal to "id"
  const deleteTodo = (id) => {
    settodo((prev) => prev.filter((todo) => todo.id !== id))
  }


  const toggleTodo = (id) => {
    settodo((prev) => prev.map((prevTodo) => prevTodo === id ? {...prevTodo, completed: !prevTodo.completed}: prevTodo))
  }

  // concept of local storage
  useEffect(() => {
    // we need to pass the value in json but sometimes local storage gives us in the string so we need to convert it
    const todos = JSON.parse(localStorage.getItem("todos"))

    if(todos){
      settodo(todos)
    }

  },[])

  useEffect(() => {
    localStorage.setItem("todos",JSON.stringify(todos))
  },[todos])



return (
  <Todoprovider value={{todos,addTodo,updateTodo,deleteTodo,toggleTodo}}>
  <div className="bg-[#172842] min-h-screen py-8">
      <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
          <h1 className="text-2xl font-bold text-center mb-8 mt-2">Manage Your Todos</h1>
            <div className="mb-4">
              {/* Todo form goes here */} 
            </div>
            <div className="flex flex-wrap gap-y-3">
              {/*Loop and Add TodoItem here */}
            </div>
        </div>
    </div>
  </Todoprovider>
);
}