import React, { useEffect, useState } from 'react' // eslint-disable-line no-unused-vars
import { useNavigate } from 'react-router-dom' // eslint-disable-line no-unused-vars
import styled from 'styled-components' // eslint-disable-line no-unused-vars
import { getMember } from '../../apis/members' // eslint-disable-line no-unused-vars

const MainPage = () => {
    const navigate = useNavigate()
    const onClickHandler = () => {
        navigate('/group')
    }

    return (
        <div>
            환영합니다... 로그인하기...<br></br>
            <button type="button" onClick={onClickHandler}>
                일단 로그인없이 테스트
            </button>
        </div>
    )
}

export default MainPage
