import React, { useEffect } from 'react'
import { useHistory, useLocation } from 'react-router-dom'

const KakaoCallback = () => {
    const location = useLocation()
    const history = useHistory()

    useEffect(() => {
        const params = new URLSearchParams(location.search)
        const code = params.get('code')

        if (code) {
            fetch('/api/auth/kakao', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ code }),
            })
                .then(response => response.json())
                .then(data => {
                    // 로그인 성공 시 처리
                    console.log('Server response:', data)
                    // 예: 토큰 저장, 페이지 이동 등
                    history.push('/') // 예시: 홈으로 리디렉션
                })
                .catch(error => {
                    console.error('Error during server request:', error)
                })
        }
    }, [location, history])

    return (
        <div>
            카카오 로그인 중...
        </div>
    )
}

export default KakaoCallback
