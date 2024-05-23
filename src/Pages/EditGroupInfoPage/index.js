import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { getGroupDetail, patchGroup } from '../../apis/groups'
import { Form, Input, Button } from 'antd'
import { useMediaQuery } from 'react-responsive'

const StyledBox = styled.div`
    //background-color: rgba(0, 62.67, 151.94, 0.08);
    border-radius: 10px;
    width: 100%;
    margin-top: ${(props) => (props.isOpen ? '150px' : '')};
    margin-left: 30px;
`

const StyledSection = styled.div`
    width: 90%;
    height: 200px;
    background-color: rgba(0, 62.67, 151.94, 0.08);
    margin: 30px 0px;
    border-radius: 10px;
    font-family: 'Dotum Bold';
`

const StyledEditTitle = styled.div`
    font-size: 28px;
    padding: 30px 0 0 50px;
`

const StyledShowInfo = styled.div`
    // background-color: gray;
    padding: 0 30px;
`

const StyledInput = styled(Input)`
    width: 400px;
    font-family: 'Dotum Light';
`

const StyledForm = styled(Form)`
    display: flex;
    flex-direction: column;
`
const StyledButton = styled(Button)`
    display: flex;
    margin: 5px;
    font-family: 'Dotum Light';

    display: ${(props) => (props.editstate ? 'none' : 'inline')};

    &:nth-child(2) {
        background-color: #003f98;
        color: white;
        font-family: 'Dotum Light';
        display: ${(props) => (props.editstate ? 'inline' : 'none')};
    }
`

const StyledButtonSection = styled.div`
    display: flex;
    //background-color: yellow;
    float: right;
    padding: 10px 
    font-family: 'Dotum Light';
`

const StyledFormItems = styled(Form.Item)`
    display: flex;
    // background-color: red;
    font-family: 'Dotum Light';
    margin: 10px;

    .ant-form-item-label {
        font-family: 'Dotum Bold';
    }

    // .ant-input {
    //     margin: 10px;
    // }
`

const StyledContentBox = styled.div`
    // background-color: red;
    display: flex;
    height: 40px;
    padding: 10px 30px;
    font-family: 'Dotum Light';
`
const EditGroupInfo = () => {
    const [editstate, setEditState] = useState(false)
    // const [donestate, SetDoneState] = useState(false)
    const [groups, setGroups] = useState([])
    const [newName, setNewName] = useState('')
    const [newDesc, setNewDesc] = useState('')
    const [isProcessing, setIsProcessing] = useState(false)
    const groupId = window.location.href.split('/')[4]
    const isOpen = useMediaQuery({ maxWidth: 1180 })

    const handleChangeGroupInfo = async () => {
        if (isProcessing) {
            return
        }
        setIsProcessing(true)
        try {
            setEditState(false)
            const updatedData = await patchGroup({ groupId, name: newName, description: newDesc })
            console.log('patch 성공: ', updatedData)
            // const formData = new FormData()
            // formData.append('name', newName)
            // formData.append('description', newDesc)
            // await patchGroup(formData)
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

    // const onClickDone = () => {

    // }

    const onChangeName = (e) => {
        setNewName(e.target.value)
    }
    return (
        <StyledBox isOpen={isOpen}>
            <StyledSection>
                <StyledEditTitle>모임 기본 정보 수정</StyledEditTitle>
                <StyledButtonSection>
                    <StyledButton onClick={onClickEdit} editstate={editstate}>
                        수정
                    </StyledButton>
                    <StyledButton onClick={handleChangeGroupInfo} editstate={editstate}>
                        확인
                    </StyledButton>
                </StyledButtonSection>
                {editstate === true ? (
                    <StyledForm>
                        <StyledContentBox>
                            <StyledFormItems name="이름" label="그룹 이름" />
                            <StyledInput placeholder={groups.name} onChange={onChangeName}></StyledInput>
                        </StyledContentBox>
                        <StyledContentBox>
                            <StyledFormItems name="이름" label="그룹 설명" />
                            <StyledInput
                                placeholder={groups.description}
                                onChange={(e) => setNewDesc(e.target.value)}
                            ></StyledInput>
                        </StyledContentBox>
                    </StyledForm>
                ) : (
                    <StyledShowInfo>
                        <p>그룹 이름: {groups.name}</p>
                        <p>그룹 설명: {groups.description}</p>
                    </StyledShowInfo>
                )}
            </StyledSection>
        </StyledBox>
    )
}

export default EditGroupInfo
