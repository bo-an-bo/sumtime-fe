import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { getGroupDetail, patchGroup } from '../../apis/groups'
import { Form, Input, Button } from 'antd'

const EditGroupInfo = () => {
    const [editstate, setEditState] = useState(false)
    const [groups, setGroups] = useState([])
    const [newName, setNewName] = useState('')
    const [newDesc, setNewDesc] = useState('')
    const [isProcessing, setIsProcessing] = useState(false)
    const groupId = window.location.href.split('/')[4]

    const handleChangeGroupInfo = async () => {
        if (isProcessing) {
            return
        }
        setIsProcessing(true)
        try {
            setEditState(false)
            await patchGroup({ groupId, name: newName, description: newDesc })
            alert('수정이 완료되었습니다.')
            const updatedGroup = await getGroupDetail(groupId)
            setGroups(updatedGroup)
        } catch (error) {
            alert('수정 실패했습니다...')
        } finally {
            setIsProcessing(false)
        }
    }

    useEffect(() => {
        getGroupDetail(groupId).then((data) => {
            setGroups(data)
        })
    }, [groupId])

    const onClickEdit = () => {
        setEditState(true)
    }

    const onChangeName = (e) => {
        setNewName(e.target.value)
    }

    return (
        <StyledBox>
            <StyledEditTitle>모임 기본 정보 수정</StyledEditTitle>
            {editstate ? (
                <StyledForm>
                    <StyledContentBox>
                        <StyledFormItems name="이름" label="그룹 이름" />
                        <StyledInput placeholder={groups.name} onChange={onChangeName} />
                    </StyledContentBox>
                    <StyledContentBox>
                        <StyledFormItems name="설명" label="그룹 설명" />
                        <StyledInput placeholder={groups.description} onChange={(e) => setNewDesc(e.target.value)} />
                    </StyledContentBox>
                    <StyledButtonSection>
                        <StyledButton
                            onClick={handleChangeGroupInfo}
                            editstate={editstate.toString()}
                            variant="confirm"
                        >
                            확인
                        </StyledButton>
                        <StyledButton
                            onClick={() => setEditState(false)}
                            editstate={editstate.toString()}
                            variant="cancel"
                        >
                            취소
                        </StyledButton>
                    </StyledButtonSection>
                </StyledForm>
            ) : (
                <>
                    <StyledShowInfo>
                        <StyledParagraph>그룹 이름: {groups.name}</StyledParagraph>
                        <StyledParagraph>그룹 설명: {groups.description}</StyledParagraph>
                    </StyledShowInfo>
                    <StyledButtonSection>
                        <StyledButton onClick={onClickEdit} editstate={editstate.toString()}>
                            수정
                        </StyledButton>
                    </StyledButtonSection>
                </>
            )}
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
    padding: 20px;
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
