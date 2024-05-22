const Kakao = window.Kakao || {}
const KakaoPicker = () => {

    const picker = () => {
        console.log(Kakao.Auth.getAccessToken())
        Kakao.Picker.selectFriends({
            title: '친구 선택',
            maxPickableCount: 10,
            minPickableCount: 1,
        })
    }
    return (
        <button onClick={picker}>KakaoPicker</button>
    )

}
export default KakaoPicker