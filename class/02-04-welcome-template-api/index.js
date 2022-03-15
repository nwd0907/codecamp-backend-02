import { checkValidationEmail, getWelcomeTemplate, sendTemplateToEmail } from '../02-04-welcome-template-api/email.js'

function createUser(user){
    // 1. 이메일이 정상인지 확인(1-존재여부, 2-"@"포함여부)
    const isValid = checkValidationEmail(user.email)
    if(isValid){
        // 2. 가입환영 템플릿 만들기
        const mytemplate = getWelcomeTemplate(user)

        // 3. 이메일에 가입환영 템플릿 전송하기
        sendTemplateToEmail(user.email, mytemplate)
    }
}

const myuser = {
    name: "철수",
    age: 8,
    school: "다람쥐초등학교",
    email: "a@a.com",
    password: "1234"
}
createUser(myuser)