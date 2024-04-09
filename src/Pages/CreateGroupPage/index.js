import React from 'react'
import PriButton from '../../Components/Buttons/PriButton'
// import styled from 'styled-components'

function CreateGroup() {
    return (
        <>
            <form>
                <div className="form_area">
                    <h1>모임 기본 정보 등록</h1>
                    <div className="input_area">
                        <label>모임이름</label>
                        <input type="text" placeholder="ex) 한사랑산악회, 숭실대 IT대 학생회" />
                    </div>
                    <div className="input_area">
                        <label>모임설명</label>
                        <input type="text" placeholder="ex) 열정 있는 사람들의 모임" />
                    </div>
                </div>
                <div className="form_area">
                    <h1>모임 회원 등록</h1>
                    <div className="input_area">
                        <label>파일 업로드</label>
                        <input type="file" />
                    </div>
                </div>
            </form>
            <PriButton />
        </>
    )
}

export default CreateGroup
