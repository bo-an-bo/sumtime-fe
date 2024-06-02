
import React from 'react'
import styled from 'styled-components'
import { Button, Popconfirm } from 'antd'
import { deleteGroup } from '../../apis/groups'
import { useNavigate } from 'react-router-dom'

const DeleteGroup = () => {
    const navigate = useNavigate()
    const groupId = window.location.href.split('/')[4]

    // 모달 상태 추가
    const [isModalVisible, setIsModalVisible] = useState(false)

    const handleDeleteGroup = async () => {
        try {
            await deleteGroup(groupId)
            alert('그룹이 삭제되었습니다.')
            navigate('/group')
        } catch (error) {
            alert('그룹 삭제에 실패했습니다...')
        }
    }

    return (
        <StyledBox>
            <StyledEditTitle>모임 기본 정보 수정</StyledEditTitle>
            <StyledShowInfo>
                <StyledParagraph>모임 삭제: 현재 모임을 삭제하시겠습니까?</StyledParagraph>
            </StyledShowInfo>
            <StyledButtonSection>
                <StyledButton onClick={() => setIsModalVisible(true)}>삭제</StyledButton>
                <Modal
                    title="정말 삭제하시겠습니까?"
                    visible={isModalVisible}
                    onCancel={() => setIsModalVisible(false)}
                    onOk={handleDeleteGroup}
                    okText="삭제"
                    cancelText="취소"
                    okButtonProps={{ style: { backgroundColor: '#ff4d4f', borderColor: '#ff4d4f' } }} // 확인 버튼 스타일 변경
                >
                    <p>모임을 삭제하시겠습니까?</p>
                </Modal>

            </StyledButtonSection>
        </StyledBox>
    )
}

export default DeleteGroup

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
        margin-top: 80px;
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

const StyledButton = styled(Button)`
    margin-left: 10px;
    font-family: 'Dotum Light';

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

const StyledParagraph = styled.div`
    margin-top: 15px;
`
