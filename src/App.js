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
import GroupMainPage from './Pages/GroupMainPage'
import ShowEventList from './Pages/ShowEventList'
import UploadMember from './Pages/UploadMember'
import UploadTransactions from './Pages/UploadTransaction'

const StyledLayout = styled.div`
    // background-color: gray;
    display: flex;
    width: 100%;
    height: 100%;
`

function App() {
    return (
        <BrowserRouter>
            <div className="App">
                <NavBar />
                <Routes>
                    <Route path="/" element={<MainPage />} />
                    <Route path="/createGroup" element={<CreateGroup />} />
                    <Route path="/group/*" element={<GroupRoutes />} />
                </Routes>
            </div>
        </BrowserRouter>
    )
}

function GroupRoutes() {
    return (
        <StyledLayout>
            <Routes>
                <Route path="/" element={<ShowGroupList />} />
                <Route path="/:id/*" element={<GroupRoutesWithSidebar />} />
            </Routes>
        </StyledLayout>
    )
}

function GroupRoutesWithSidebar() {
    return (
        <StyledLayout>
            <SideBar />
            <Routes>
                <Route path="/" element={<GroupMainPage />} />
                <Route path="/showGroupDetails" element={<ShowGroupDetails />} />
                <Route path="/createEvent" element={<CreateEventPage />} />
                <Route path="/showEventList" element={<ShowEventList />} />
                <Route path="/uploadMember" element={<UploadMember />} />
                <Route path="/uploadTransaction" element={<UploadTransactions />} />
            </Routes>
        </StyledLayout>
    )
}

export default App
