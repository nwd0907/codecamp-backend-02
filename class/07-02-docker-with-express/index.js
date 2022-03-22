// module 방식
import { checkValidationPhone, getToken, sendTokenToSMS } from './phone.js'
import { checkValidationEmail, getWelcomeTemplate, sendTemplateToEmail } from './email.js'

// const express = require('express')
import express from 'express'
import swaggerUi from 'swagger-ui-express'
import swaggerJsdoc from 'swagger-jsdoc'
import { options } from './swagger/config.js'

import dotenv from 'dotenv'
dotenv.config()

const app = express();
app.use(express.json())
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerJsdoc(options))); 
app.get('/boards', (req, res) => {
  // 1. 데이터를 조회하는 로직 => DB에 접속해서 데이터 꺼내오기
  const result = [
    { number: 1, writer: "철수", title: "제목입니다~~", contents: "내용이에요@@@" },
    { number: 2, writer: "영희", title: "영희 제목입니다~~", contents: "영희 내용이에요@@@" },
    { number: 3, writer: "훈이", title: "훈이 제목입니다~~", contents: "훈이 내용이에요@@@" },
  ]

  // 2. 꺼내온 결과 응답 주기
  res.send(result)
})

app.post('/boards', (req, res) => {
  // 1. 데이터를 등록하는 로직 => DB에 접속해서 데이터 저장하기
  // 프론트엔드로부터 데이터 받아오기
  // 콘솔로 찍어서 확인 해보기
  console.log(req.body)
  
  // 2. 저장결과 알려주기!!
  res.send('등록에 성공하였습니다!!')
})

app.post('/tokens/phone', (req, res) => {
  const myphone = req.body.aaa

  // 1. 휴대폰번호 자릿수 맞는지 확인하기
  const isValid = checkValidationPhone(myphone)
  if(isValid){
      // 2. 핸드폰 토큰 6자리 만들기
      const mytoken = getToken()

      // 3. 핸드폰번호에 토큰 전송하기
      sendTokenToSMS(myphone, mytoken)
      res.send("인증완료!!")
  }
})

app.post('/users', (req, res) => {
  const myuser = req.body.user

  // 1. 이메일이 정상인지 확인(1-존재여부, 2-"@"포함여부)
  const isValid = checkValidationEmail(myuser.email)
  if(isValid){
      // 2. 가입환영 템플릿 만들기
      const mytemplate = getWelcomeTemplate(myuser)

      // 3. 이메일에 가입환영 템플릿 전송하기
      sendTemplateToEmail(myuser.email, mytemplate)
      res.send("가입완료!!")
  }
})


// app.get('/boards/:id', (req, res) => {
//     console.log(req)
//   res.send('Hello World!')
// })

// app.put('/boards/:id', (req, res) => {
//   console.log(req)
// res.send('Hello World!')
// })

// app.delete('/boards/:id', (req, res) => {
//   console.log(req)
// res.send('Hello World!')
// })

app.listen(3001, () => {
  console.log(`Example app listening on port ${3001}`)
})