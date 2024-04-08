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
        <div className="App">
            <BrowserRouter>
                <NavBar />
                <Routes>
                    <Route path="/createGroup" element={<CreateGroup />} />
                    <Route path="/showGroupList" element={<ShowGroupList />} />
                    <Route path="/showGroupDetails" element={<ShowGroupDetails />} />
                </Routes>
            </BrowserRouter>
        </div>
    )
}

export default App
