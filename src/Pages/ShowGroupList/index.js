import React from 'react'
import GroupCard from '../../Components/Card/GroupCard'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import { Button } from 'antd'
import { motion } from 'framer-motion'

const ShowGroupList = () => {
    const navigate = useNavigate()

    const onClickCreateGroup = () => {
        navigate('/group/createGroup')
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.3 }}
            style={{ width: '100%' }}
        >
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
        </motion.div>
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

    @media (max-width: 768px) {
        margin-right: 0;
    }

    padding: 5px;
`

const StyledButton = styled(Button)`
    margin-top: 20px;
    margin-bottom: 10px;
    width: 100px;
    height: 40px;
    font-size: 18px;
    font-weight: 500;

    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #003e97;
    font-family: 'Dotum Light';
`
