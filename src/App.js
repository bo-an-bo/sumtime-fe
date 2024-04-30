import React from 'react'
import styled from 'styled-components'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import CreateGroup from './Pages/CreateGroupPage'
import CreateEventPage from './Pages/CreateEventPage'
import ShowGroupList from './Pages/ShowGroupList'
import ShowGroupDetails from './Pages/ShowGroupDetails'
import NavBar from './Components/NavBar/NavBar'
import MainPage from './Pages/MainPage'
import SideBar from './Components/SideBar/SideBar'

const StyledLayout = styled.div`
    // background-color: gray;
    display: flex;
    width: 100%;
    height: 100%;
`

function App() {
    const group_id = "662a83742c217fe65efaeab6";
    return (
        <BrowserRouter>
            <div className="App">
                <NavBar />

                <StyledLayout>
                    <SideBar group_id={group_id}/>
                    <Routes>
                        <Route path="/" element={<MainPage />} />
                        <Route path="/createGroup" element={<CreateGroup />} />
                        <Route path="/group" element={<ShowGroupList />} />
                        <Route path="/group/:id/ShowGroupDetails" element={<ShowGroupDetails />} />
                        <Route path="/group/:id/createEvent" element={<CreateEventPage />} />
                    </Routes>
                </StyledLayout>
            </div>
        </BrowserRouter>
    )
}

export default App
