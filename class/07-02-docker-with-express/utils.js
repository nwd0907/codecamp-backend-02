export function getToday() {
    // 여기서 오늘날짜로 만들기!!
    const aaa = new Date()
    const yyyy = aaa.getFullYear()
    const mm = String(aaa.getMonth() + 1).padStart(2, "0")
    const dd = String(aaa.getDate()).padStart(2, "0")
    const today = `${yyyy}-${mm}-${dd}` // year + "-" + month + "-" + date
    return today
}

