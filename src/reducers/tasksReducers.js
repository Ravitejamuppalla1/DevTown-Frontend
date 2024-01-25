import { GET_TASKS,EDIT_TASK,DESTROY_TASK } from "../actions/tasksActions";

const taskInitialState = {
   data:[]
}

const  tasksReducers = (state = taskInitialState,action)=>{

    switch(action.type){
        case GET_TASKS:{
           return {...state,data:action.payload}
        }
        case EDIT_TASK :{
            return {...state,data:state.data.map(ele=>{
                if(ele.taskId === action.payload.taskId){
                    return {...ele,...action.payload}
                }
                else{
                    return {...ele}
                }
            })}
        }
        case DESTROY_TASK:{
            return {...state,data:state.data.filter(ele=>ele.taskId !== action.payload)}
            
        }

        default :{
            return {...state}
        }
    }

}

export default tasksReducers