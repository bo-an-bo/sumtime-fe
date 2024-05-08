import React, { useEffect } from 'react'

const Login = () => {
    const code = new URL(window.location.href).searchParams.get('code')
    // console.log(code)

    useEffect(() => {
      axios.post()
    })
    return <div>로그인 성공</div>
}

export default Login
