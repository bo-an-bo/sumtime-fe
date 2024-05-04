import React from 'react'
import GroupCard from '../../Components/Card/GroupCard'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import { Button } from 'antd'

const StyledGroupListLayout = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
`

const StyledGroupPageLayout = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
`

const StyledButtonSection = styled.div`
    display: flex;
    padding: 5px 80%;
`

const ShowGroupList = () => {
    const navigate = useNavigate()
    const onClickCreateGroup = () => {
        navigate('/createGroup')
    }
    return (
        <StyledGroupPageLayout>
            <StyledButtonSection>
                <Button type="primary" htmlType="submit" onClick={onClickCreateGroup}>
                    모임 생성
                </Button>
            </StyledButtonSection>

            <StyledGroupListLayout>
                <GroupCard />
            </StyledGroupListLayout>
        </StyledGroupPageLayout>
    )
}

export default ShowGroupList
