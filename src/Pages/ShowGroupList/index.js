import React from 'react'
import GroupCard from '../../Components/Card/GroupCard'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import { Button } from 'antd'

const ShowGroupList = () => {
    const navigate = useNavigate()
    const onClickCreateGroup = () => {
        navigate('/createGroup')
    }
    return (
        <StyledGroupPageLayout>
            <StyledButtonSection>
                <StyledButton type="primary" htmlType="submit" onClick={onClickCreateGroup}>
                    모임 생성
                </StyledButton>
            </StyledButtonSection>

            <StyledGroupListLayout>
                <GroupCard />
            </StyledGroupListLayout>
        </StyledGroupPageLayout>
    )
}

export default ShowGroupList

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
    justify-content: flex-end;
    margin-right: 155px;
    padding: 5px;
`

const StyledButton = styled(Button)`
    margin-top: 20px;
    margin-bottom: 10px;
    width: 120px;
    height: 40px;
    font-size: 18px;
    font-weight: 500;

    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #003e97;
    font-family: 'Dotum Light';
`
