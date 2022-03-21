import axios from 'axios'

// 비동기방식
function fetchPost(){
    const result = axios.get("https://koreanjson.com/posts/1")
    console.log('======================')
    console.log(result) // Promise { <pending> }
    console.log('======================')
}

fetchPost() // 실행명령


// 동기방식
async function fetchPost2(){
    const result = await axios.get("https://koreanjson.com/posts/1")
    console.log('======================')
    console.log(result) // 실제데이터
    console.log(result.data.title) // 실제데이터
    console.log('======================')
}

fetchPost2() // 실행명령