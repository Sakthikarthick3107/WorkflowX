import React, { ChangeEvent, FormEvent, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { handleNotification, handleTaskDrawer } from '../redux/UIManagement/UiActions'
import { RootState } from '../redux/store'
import { ArrowLeftRounded } from '@mui/icons-material'
import InputField from './CustomTags/InputField'
import Button from './CustomTags/Button'
import SelectInput from './CustomTags/SelectInput'
import API from '../config/API'
import DateInput from './CustomTags/DateInput'




const NewTask : React.FC = () => {
    const newTaskOpen = useSelector((state : RootState) => state.ui.taskDrawerOpen);

    const[newTask , setNewTask] = useState({
                                            taskname : '',
                                            description : '',
                                            status : 'Todo',
                                            endDate : "",
                                            priority : 'Low'
                                        });
    



    const dispatch = useDispatch();
    const drawerRef = useRef<HTMLDivElement>(null);

    const closeTaskDrawer = () => {
        dispatch(handleTaskDrawer(false));
      }

    const handleClickOutside = (event : MouseEvent) => {
        if(drawerRef.current && !drawerRef.current.contains(event.target as Node)){
            closeTaskDrawer();
        }
    }

    const handleNewTaskData = (event : ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const {name , value} = event.target;
        setNewTask({ ...newTask , [name] : value });
    }

    const createNewTask = ( e : FormEvent<HTMLFormElement> ) => {
        e.preventDefault();
        console.log(JSON.stringify(newTask));
        API.post('/tasks' , newTask)        
        .then((response) => {
            dispatch(handleNotification(`${response.data.taskname} created successfully` , 'success'));
            console.log(response)
            setNewTask({taskname : '' , description : '' , status : 'Todo' , endDate: '' , priority : 'Low'})
            closeTaskDrawer();
        })
        .catch((err) =>{
            dispatch(handleNotification(err.message , 'error'));
        })
              
    }

    useEffect(() => {
        document.addEventListener('mousedown' , handleClickOutside);
        return () => document.removeEventListener('mousedown' , handleClickOutside);
    },[]);

  return (
    <div ref={drawerRef} className={` bg-card
                 dark:bg-dark-card z-50 drop-shadow-lg
                 fixed top-0   
                 rounded-l-3xl 
                 right-0 w-1/2 h-full
                 transition duration-500 ease-in-out
                ${newTaskOpen ? 'translate-x-0' : 'translate-x-[100%]' }
                p-4
             `}>

    <button onClick={closeTaskDrawer}><ArrowLeftRounded fontSize='large' />Close</button>

    <form onSubmit={createNewTask} className='flex flex-col gap-4 py-4'>
        <InputField type='text' placeholder='New Task Name' name='taskname' value={newTask.taskname} onChange={handleNewTaskData}  />
        <InputField type='textarea' placeholder='Add description' name='description' value={newTask.description} onChange={handleNewTaskData} />
        <SelectInput  name='status' value={newTask.status} onChange={handleNewTaskData} options={['Todo' , 'Progress' , 'Completed' , 'Withdrawn']} />
        <SelectInput name='priority' value={newTask.priority} onChange={handleNewTaskData} options={['Low' , 'Medium' , 'High']} />
        <DateInput name='endDate' value={newTask.endDate} onChange={handleNewTaskData} />
        
        <Button type='submit' className='w-full'>Create</Button>
    </form>

    </div>
  )
}

export default NewTask