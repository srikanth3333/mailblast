
export function getTotalCounts(data) {
    return data.reduce((previousValue,currentValue) => {
        return {
            "consumer": previousValue['consumer'] + currentValue['consumer'],
            "arrear": previousValue['arrear'] + currentValue['arrear'],
            "current_bill": previousValue['current_bill'] + currentValue['current_bill'],
            "net_bill": previousValue['net_bill'] + currentValue['net_bill'],
        }
    },{consumer:0,arrear:0,current_bill:0,net_bill:0});
}


export let monthList = [
    "December",
    "November",
    "April",
    "March",
    "July",
    "September",
    "October",
    "May",
    "June",
    "August",
    "January"
]

export let divisionList = [
  "Bhopal City East",
  "Bhopal City North",
  "Bhopal City West",
  "Bhopal City South",
  "O&M KOLAR"
]