// 여기어때 크롤링 위법 사례: https://biz.chosun.com/topics/law_firm/2021/09/29/OOBWHWT5ZBF7DESIRKNPYIODLA/

import puppeteer from 'puppeteer'

async function startCrawling(){
    const browser = await puppeteer.launch({ headless: false })
    const page = await browser.newPage()
    await page.setViewport({ width: 1280, height: 720 })
    await page.goto("https://www.goodchoice.kr/product/search/2")
    await page.waitForTimeout(1000)

    const stage = await page.$eval(
        "#poduct_list_area > li:nth-child(2) > a > div > div.name > div > span", 
        (el) => el.textContent
    )

    const location = await page.$eval(
        "#poduct_list_area > li:nth-child(2) > a > div > div.name > p:nth-child(4)",
        (el) => el.textContent
    )

    const price = await page.$eval(
        "#poduct_list_area > li:nth-child(2) > a > div > div.price > p > b",
        (el) => el.textContent
    )

    console.log(stage)
    console.log(location.trim())
    console.log(price)

    await browser.close()
}

startCrawling()