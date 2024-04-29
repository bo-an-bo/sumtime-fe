import React, { useEffect, useState } from 'react' // eslint-disable-line no-unused-vars
import { useNavigate } from 'react-router-dom' // eslint-disable-line no-unused-vars
import styled from 'styled-components' // eslint-disable-line no-unused-vars
import { getMember } from '../../apis/members' // eslint-disable-line no-unused-vars
const MainPage = () => {
    return <div>MainPage</div>
}

// const StyledMenu = styled.div`
//     float: left;
//     margin: 20px;
// `

// const StyledTitle = styled.div`
//     padding: 30px 0 10px 0;
//     // cursor: pointer;
// `
// const StyledSubTitle = styled.div`
//     padding: 6px 15px;
//     cursor: pointer;
//     border-left: 2px solid #fff;

//     &:hover {
//         background-color: rgb(0, 63, 150, 0.1);
//         //border-radius: 5px;
//         border-left: 2px solid rgb(0, 63, 150);
//     }
// `

// const MainPage = () => {
//     const navigate = useNavigate()
//     // const [members, setMembers] = useState([])
//     // const groupId = window.location.href.split('/')[4]
//     // useEffect(() => {
//     //     getMember(groupId).then((data) => {
//     //         setMembers(data)
//     //     })
//     // }, [groupId])

//     // console.log(members)
//     const onClickUploadMemberList = () => {
//         navigate('/member')
//     }

//     const onClickMemberList = () => {
//         navigate('/member')
//         // /group/{groupId}/member
//     }

//     const onClickCreateEvent = () => {
//         navigate('/member')
//         // /group/{groupId}/event
//     }
//     const onClickEventList = () => {
//         navigate('/member')
//         // /group/{groupId}/event
//     }
//     const onClickEditGroup = () => {
//         navigate('/member')
//     }
//     const onClickSubManager = () => {
//         navigate('/member')
//     }
//     const onClickCheckEvent = () => {
//         navigate('/member')
//     }
//     const onClickResult = () => {
//         navigate('/member')
//     }

//     return (
//         <div>
//             <StyledMenu>
//                 <StyledTitle>회원 관리</StyledTitle>
//                 <StyledSubTitle onClick={onClickUploadMemberList}>회원 명단 업로드</StyledSubTitle>
//                 <StyledSubTitle onClick={onClickMemberList}>회원 목록</StyledSubTitle>
//                 <StyledTitle>이벤트</StyledTitle>
//                 <StyledSubTitle onClick={onClickCreateEvent}>이벤트 생성</StyledSubTitle>
//                 <StyledSubTitle onClick={onClickEventList}>이벤트 목록</StyledSubTitle>
//                 <StyledTitle>설정</StyledTitle>
//                 <StyledSubTitle onClick={onClickEditGroup}>모임 정보 변경</StyledSubTitle>
//                 <StyledSubTitle onClick={onClickSubManager}>부매니저 설정</StyledSubTitle>
//                 <StyledTitle>거래내역</StyledTitle>
//                 <StyledSubTitle onClick={onClickResult}>거래내역 업로드</StyledSubTitle>
//                 <StyledSubTitle onClick={onClickCheckEvent}>이벤트별 조회</StyledSubTitle>
//                 <StyledSubTitle onClick={onClickResult}>거래내역 분석</StyledSubTitle>
//             </StyledMenu>
//         </div>
//     )
// }

export default MainPage
