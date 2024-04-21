import React from 'react'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
// import styled from 'styled-components'
import CreateGroup from './Pages/CreateGroupPage'
import ShowGroupList from './Pages/ShowGroupList'
import ShowGroupDetails from './Pages/ShowGroupDetails'
import NavBar from './Components/NavBar/NavBar'

function App() {
    return (
        <BrowserRouter>
            <div className="App">
                <NavBar />
                <Routes>
                    <Route path="/" element={<div>Home</div>} />
                    <Route path="/createGroup" element={<CreateGroup />} />
                    <Route path="/showGroupList" element={<ShowGroupList />} />
                    <Route path="/group/:id/showGroupDetails" element={<ShowGroupDetails />} />
                </Routes>
            </div>
        </BrowserRouter>
    )
}

export default App
