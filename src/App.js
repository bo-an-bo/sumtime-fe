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
import SideBarIndex from './Components/SideBar/index'
import GroupMainPage from './Pages/GroupMainPage'
import ShowEventList from './Pages/ShowEventList'
import UploadMember from './Pages/UploadMember'
import UploadTransactions from './Pages/UploadTransaction'
import ShowEventResult from './Pages/ShowEventResult'
import EditGroupPage from './Pages/EditGroupPage'
import SetSubMng from './Pages/SetSubMng'
import SelectMembers from './Components/Tables/SelectMembers'
import ShowResult from './Pages/ShowResult'
import { AuthProvider } from './context/AuthContext'
import MyPage from './Pages/MyPage'

function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <div className="App">
                    <Routes>
                        <Route path="/" element={<MainPage />} />
                        <Route path="/group/*" element={<GroupRoutes />} />
                    </Routes>
                </div>
            </BrowserRouter>
        </AuthProvider>
    )
}

function GroupRoutes() {
    return (
        <>
            <NavBar />
            <StyledLayout>
                <Routes>
                    <Route path="/" element={<ShowGroupList />} />
                    <Route path="/mypage" element={<MyPage />} />
                    <Route path="/createGroup" element={<CreateGroup />} />
                    <Route path="/:id/*" element={<GroupRoutesWithSidebar />} />
                </Routes>
            </StyledLayout>
        </>
    )
}

function GroupRoutesWithSidebar() {
    return (
        <StyledLayout>
            <SideBarIndex />

            <Routes>
                <Route path="/" element={<GroupMainPage />} />
                <Route path="/showGroupDetails" element={<ShowGroupDetails />} />
                <Route path="/createEvent" element={<CreateEventPage />} />
                <Route path="/createEvent/selectMembers" element={<SelectMembers />} />
                <Route path="/showEventList" element={<ShowEventList />} />
                <Route path="/uploadMember" element={<UploadMember />} />
                <Route path="/uploadTransaction" element={<UploadTransactions />} />
                <Route path="/showEventResult" element={<ShowEventResult />} />
                <Route path="/editInfo" element={<EditGroupPage />} />
                <Route path="/setSubMng" element={<SetSubMng />} />
                <Route path="/showResult" element={<ShowResult />} />
            </Routes>
        </StyledLayout>
    )
}

const StyledLayout = styled.div`
    display: flex;
    width: 100%;
    height: 100%;
`

export default App
