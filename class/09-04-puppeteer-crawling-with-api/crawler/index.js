// 여기어때 크롤링 위법 사례: https://biz.chosun.com/topics/law_firm/2021/09/29/OOBWHWT5ZBF7DESIRKNPYIODLA/

import puppeteer from 'puppeteer'
import mongoose from 'mongoose'
import { Stock } from './models/stock.model.js'

// 몽고DB 접속!!
mongoose.connect("mongodb://localhost:27017/codecamp")

async function startCrawling(){
    const browser = await puppeteer.launch({ headless: false })
    const page = await browser.newPage()
    await page.setViewport({ width: 1280, height: 720 })
    await page.goto("https://finance.naver.com/item/sise.naver?code=005930")
    await page.waitForTimeout(1000)
    const framePage = await page.frames().find(el => el.url().includes("/item/sise_day.naver?code=005930"))

    for(let i=3; i<=7; i++){
        await page.waitForTimeout(500)
        const date = await framePage.$eval(
            `body > table.type2 > tbody > tr:nth-child(${i}) > td:nth-child(1) > span`,
            (el) => el.textContent
        )
    
        const price = await framePage.$eval(
            `body > table.type2 > tbody > tr:nth-child(${i}) > td:nth-child(2) > span`,
            (el) => el.textContent
        )
    
        console.log(`날짜: ${date}, 가격: ${price}`)

        const stock = new Stock({
            name: "삼성전자",
            date: date,
            price: Number(price.replace(",", ""))
        })
        await stock.save()
    }

    await browser.close()
}

startCrawling()