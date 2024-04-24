import React from 'react'
import styled from 'styled-components'
import { Tabs } from 'antd'
// import dummy from '../../db/data.json'
const Wrapper = styled.div`
    padding: 10px;
    border-radius: 10px;
    background-color: rgba(0, 62.67, 151.94, 0.08);
    max-width: 400px;
    margin: 10px 60px;
`
const onChange = (key) => {
    console.log(key)
}
/* Read 구현 필요 */
const items = [
    {
        key: '1',
        label: '회원',
        children: '그룹 정보',
    },
    {
        key: '2',
        label: '이벤트',
        children: '그룹 멤버',
    },
]
// console.log(dummy)
const ShowGroupDetails = () => {
    return (
        <Wrapper>
            <Tabs defaultActiveKey="1" items={items} onChange={onChange}></Tabs>
        </Wrapper>
    )
}

export default ShowGroupDetails
