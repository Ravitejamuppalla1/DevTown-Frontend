import Swal from 'sweetalert2'
import axios from '../config/axios'

export const GET_TASKS = "GET_TASKS"
export const EDIT_TASK = "EDIT_TASK"
export const DESTROY_TASK ="DESTROY_TASK"


export const getAdmin = (data) => {
    return {
        type: GET_TASKS,
        payload: data
    }
}

export const asyncGetTasks = (token) => {
    return (dispatch) => {
        axios.get('/api/tasklists', {
            headers: {
                'Authorization': localStorage.getItem('token')
            }
        })
            .then((result) => {
                dispatch(getAdmin(result.data.tasks))
            })
    }

}


//create task


export const asyncCreateTask = (formData, reset) => {
    return (dispatch) => {
        axios.post('/api/createtask', formData, {
            headers: {
                'Authorization': localStorage.getItem('token')
            }
        })

            .then((result) => {
                if (result.data.message == 'Task created successfully') {
                    dispatch(asyncGetTasks())
                    reset()
                }
                else {
                    Swal.fire('Task creation failed')
                }
            })
    }
}


//EditTask

export const edittask = (data) => {

    return {
        type: EDIT_TASK,
        payload: data
    }
}

export const asyncEditTask = (taskId, formData, reset,setIsEdit) => {
    return (dispatch) => {
        axios.put(`/api/Edittask/${taskId}`, formData, {
            headers: {
                'Authorization': localStorage.getItem('token')
            }
        })
            .then((result) => {
                const upadtedtask = result.data.updatedTask
                dispatch(edittask(upadtedtask))
                reset()
                setIsEdit(false)


            })
          
    }

}


//Delete task

export const destroytask =(data)=>{
    return {
        type:DESTROY_TASK,
        payload:data
    }
}


export const asyncDeleteTask = (id)=>{
    return(dispatch)=>{
        axios.delete(`api/deletetask/${id}`,{
            headers:{
                'Authorization':localStorage.getItem('token')
            }
        })
        .then((response)=>{
            const result = response.taskId
            dispatch(destroytask(result))
            dispatch(asyncGetTasks())
            Swal.fire('Task deleted successfully')
        })
        .catch((err)=>{
            Swal.fire('Delete Task Failed')
        })
    }
}
