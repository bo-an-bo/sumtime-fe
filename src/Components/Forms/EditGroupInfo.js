import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { getGroupDetail, patchGroup } from '../../apis/groups'
import { Form, Input, Button, Modal } from 'antd'

const EditGroupInfo = () => {
    const [editState, setEditState] = useState(false)
    const [group, setGroup] = useState({})
    const [newName, setNewName] = useState('')
    const [newDesc, setNewDesc] = useState('')
    const [isProcessing, setIsProcessing] = useState(false)
    const [isModalVisible, setIsModalVisible] = useState(false)
    const groupId = window.location.href.split('/')[4]

    const handleChangeGroupInfo = async () => {
        if (isProcessing) {
            return
        }
        setIsProcessing(true)
        try {
            setEditState(false)
            await patchGroup({ groupId, name: newName, description: newDesc })
            setIsModalVisible(true)
            const updatedGroup = await getGroupDetail(groupId)
            setGroup(updatedGroup)
        } catch (error) {
            alert('수정 실패했습니다...')
        } finally {
            setIsProcessing(false)
        }
    }

    useEffect(() => {
        getGroupDetail(groupId).then((data) => {
            setGroup(data)
        })
    }, [groupId])

    const onClickEdit = () => {
        setEditState(true)
    }

    const onChangeName = (e) => {
        setNewName(e.target.value)
    }

    const handleModalOk = () => {
        setIsModalVisible(false)
    }

    return (
        <StyledBox>
            <StyledEditTitle>모임 기본 정보 수정</StyledEditTitle>
            {editState ? (
                <StyledForm>
                    <StyledContentBox>
                        <StyledFormItems name="이름" label="그룹 이름" />
                        <StyledInput placeholder={group.name} onChange={onChangeName} />
                    </StyledContentBox>
                    <StyledContentBox>
                        <StyledFormItems name="설명" label="그룹 설명" />
                        <StyledInput placeholder={group.description} onChange={(e) => setNewDesc(e.target.value)} />
                    </StyledContentBox>
                    <StyledButtonSection>
                        <StyledButton onClick={handleChangeGroupInfo} variant="confirm">
                            확인
                        </StyledButton>
                        <StyledButton onClick={() => setEditState(false)} variant="cancel">
                            취소
                        </StyledButton>
                    </StyledButtonSection>
                </StyledForm>
            ) : (
                <>
                    <StyledShowInfo>
                        <StyledParagraph>그룹 이름: {group.name}</StyledParagraph>
                        <StyledParagraph>그룹 설명: {group.description}</StyledParagraph>
                    </StyledShowInfo>
                    <StyledButtonSection>
                        <StyledButton onClick={onClickEdit}>수정</StyledButton>
                    </StyledButtonSection>
                </>
            )}
            <Modal
                title="수정 완료"
                open={isModalVisible}
                onOk={handleModalOk}
                footer={[
                    <Button key="ok" type="primary" onClick={handleModalOk}>
                        확인
                    </Button>,
                ]}
            >
                <p>수정이 완료되었습니다.</p>
            </Modal>
        </StyledBox>
    )
}

export default EditGroupInfo

const StyledBox = styled.div`
    background-color: rgba(0, 62.67, 151.94, 0.08);
    border-radius: 10px;
    width: 70%;
    height: auto;
    margin: 30px auto;
    padding: 10px;
    font-family: 'Dotum Bold';

    @media (max-width: 768px) {
        width: 90%;
        margin-top: 60px;
        height: auto;
    }
`

const StyledEditTitle = styled.div`
    display: flex;
    font-size: 28px;
    padding: 10px 30px;
    @media (max-width: 768px) {
        margin-left: 0;
    }
`

const StyledShowInfo = styled.div`
    padding: 10px 30px;

    p {
        margin: 5px 0;
    }
`

const StyledInput = styled(Input)`
    width: 50%;
    font-family: 'Dotum Light';

    @media (max-width: 768px) {
        width: 100%;
    }
`

const StyledForm = styled(Form)`
    display: flex;
    flex-direction: column;
`

const StyledButton = styled(Button)`
    margin-left: 10px;
    font-family: 'Dotum Light';

    ${(props) =>
        props.variant === 'confirm' &&
        `
        background-color: #003f98;
        color: white;
    `}

    @media (max-width: 768px) {
        margin-top: 10px;
        margin-left: 0;
    }
`

const StyledButtonSection = styled.div`
    display: flex;
    justify-content: flex-end;
    padding: 10px;
    font-family: 'Dotum Light';

    @media (max-width: 768px) {
        flex-direction: column;
        align-items: stretch;
        padding: 0;
        width: 85%;
        margin: 0 auto;
    }
`

const StyledFormItems = styled(Form.Item)`
    height: 10px;
    display: flex;
    font-family: 'Dotum Light';

    .ant-form-item-label {
        font-family: 'Dotum Bold';
    }

    @media (max-width: 768px) {
        flex-direction: column;
        align-items: start;
    }
`

const StyledParagraph = styled.div`
    margin-top: 15px;
`
const StyledContentBox = styled.div`
    display: flex;
    flex-direction: row;
    padding: 10px 30px;
    font-family: 'Dotum Light';

    @media (max-width: 768px) {
        flex-direction: column;
        align-items: start;
        padding: 10px 30px;
    }
`
