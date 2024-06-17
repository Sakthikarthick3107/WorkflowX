import React from 'react'
import { Route, Routes } from 'react-router-dom'
import TaskHub from '../pages/TaskHub'
import Projects from '../pages/Projects'
import Header from '../utils/Header'
import Options from '../utils/Options'
import NewTask from '../utils/NewTask'
import TaskDetail from '../utils/TaskDetail'

const WFDashboardRoute = () => {
  return (
    <>
        <Header/>
        <Options/>
        <NewTask/>
        <TaskDetail/>
        <Routes>
            <Route path='/projects' element={<Projects/>}/>
            <Route path='/task' element={<TaskHub/>}/>
        </Routes>
    </>
  )
}

export default WFDashboardRoute