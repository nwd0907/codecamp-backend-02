import { CashService } from './services/cash.service.js'

export class CouponController {

    buyCoupon = (req, res) => {
        // 1. 가진돈 검증하는 코드(10줄 => 2줄)
        const cashService = new CashService()
        const hasMoney = cashService.checkValue() // true 또는 false 리턴
    
        // 2. 쿠폰 구매하는 코드
        if(hasMoney) {
            res.send("쿠폰 구매 완료!!")
        }
    }

}