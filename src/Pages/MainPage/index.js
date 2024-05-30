import React from 'react' // eslint-disable-line no-unused-vars
import styled from 'styled-components'
import GuideGroup from '../../Components/Main/GuideGroup'
import GuideMain from '../../Components/Main/GuideMain'
import GuideLogin from '../../Components/Main/GuideLogin'
import GuideUser from '../../Components/Main/GuideUser'
import GuideEvent from '../../Components/Main/GuideEvent'
import GuideTransaction from '../../Components/Main/GuideTransaction' // eslint-disable-line no-unused-vars

const MainPage = () => {

    return (
        <StyledLayoutMain>

            <GuideMain />
            <GuideLogin />
            <GuideGroup />
            <GuideUser />
            <GuideEvent />
            <GuideTransaction />

        </StyledLayoutMain>
    )
}


const StyledLayoutMain = styled.div`
    height: 100vh;
    background-color: #E9F4FE;
    overflow-y: scroll;
    scroll-snap-type: y mandatory;

`


export default MainPage
