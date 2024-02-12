//? Selectors
// Add Button - Income Form Selectors
const addBtn = document.getElementById("add-button")
const incomeInput = document.getElementById("income-input")
const addButtonForm = document.getElementById("add-button-form")
// Result Table:
const incomeTd = document.getElementById("income")
const expenseTd = document.getElementById("expense")
const remainderTd = document.getElementById("remainder")
// Spending Form
const spendingForm = document.getElementById("spending-form")
const spendingDate = document.getElementById("spending-date")
const spendingArea = document.getElementById("spending-area")
const spendingAmount = document.getElementById("spending-amount")
// Sepnding Table
const spendingBody = document.getElementById("spending-body")
const resetBtn = document.getElementById("reset-btn")

//? Variables
let income = 0
let spendingList = []

//? Events
// Add Button - Income Form Events
addButtonForm.addEventListener("submit", (e) => {
    e.preventDefault() // reload obstacles
    income += Number(incomeInput.value)
    // console.log(income)
    localStorage.setItem("income", income)
    addButtonForm.reset()
    calculateAndUpdate()
})

window.addEventListener("load", () => {
    income = Number(localStorage.getItem("income"))
    spendingList = JSON.parse(localStorage.getItem("spendings")) || []
    spendingList.forEach((sp) => { spendingToDOM(sp) })
    spendingDate.valueAsDate = new Date() //today date auto
    calculateAndUpdate()
})

// Spending Form Events
spendingForm.addEventListener("submit", (e) => {
    e.preventDefault() // reload obstacles
    const newSpending = {
        id: new Date().getTime(),
        area: spendingArea.value,
        date: spendingDate.value,
        amount: spendingAmount.value
    }
    // console.log(newSpending)
    spendingList.push(newSpending)
    localStorage.setItem("spendings", JSON.stringify(spendingList))
    spendingToDOM(newSpending)
    calculateAndUpdate()
    spendingForm.reset()
    spendingDate.valueAsDate = new Date() //today date auto
    // console.log(spendingList)
})

//? Functions
const calculateAndUpdate = () => {
    const expense = spendingList.reduce((sum, s) => sum + Number(s.amount), 0)

    incomeTd.innerText = income
    expenseTd.innerText = expense
    remainderTd.innerText = income - expense
    console.log(expense)

}

const spendingToDOM = ({ id, area, amount, date }) => {
    // const {id, area, amount, date} = newSpending 
    spendingBody.innerHTML += `
    <tr>
        <td>${date}</td>
        <td>${area}</td>
        <td>${amount}</td>
        <td><i class= "fa-solid fa-trash-can text-danger" id="${id}" type="button"></i></td>
    </tr>
    `
}

spendingBody.addEventListener("click", (e) => {
    // console.log(e.target)
    if (e.target.classList.contains("fa-trash-can")) {
        e.target.parentElement.parentElement.remove()
    }
    const id = e.target.id
    console.log(id)
    spendingList = spendingList.filter((h) => h.id != id)
    localStorage.setItem("spendings", JSON.stringify(spendingList))
    console.log(spendingList)
    calculateAndUpdate()
})

resetBtn.addEventListener("click", (e) => {
    spendingList = []
    income = 0
    localStorage.clear()
    spendingBody.innerHTML = ""
    calculateAndUpdate()
})