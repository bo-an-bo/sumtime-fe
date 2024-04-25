import React from 'react'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import CreateGroup from './Pages/CreateGroupPage'
import CreateEventPage from './Pages/CreateEventPage'
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
                    <Route path="/group/:id/createEvent" element={<CreateEventPage />} />
                </Routes>
            </div>
        </BrowserRouter>
    )
}

export default App
