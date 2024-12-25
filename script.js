const inputs = document.querySelectorAll('input')
const checkboxs = document.querySelectorAll('.checkbox')
const error = document.querySelector('.error')
const progressBarCompleted = document.querySelector(".progress-bar-completed")
// debugger

let allGoalsAdded;
let allGoals = JSON.parse(localStorage.getItem('allGoals')) || {
    first: {
        name: '',
        completed: false,
    },
    second: {
        name: '',
        completed: false,
    },
    third: {
        name: '',
        completed: false,
    },
}

localStorage.setItem('allGoals', JSON.stringify(allGoals))



let countCheckboxCompleted = Object.values(allGoals).filter((e) => e.completed).length
progressBarCompleted.style.width = `${countCheckboxCompleted / inputs.length * 100}%`
progressBarCompleted.previousElementSibling.innerText = `${countCheckboxCompleted}/${inputs.length} Completed`


checkboxs.forEach((checkbox) => {
    if (allGoals[checkbox.nextElementSibling.id].completed) {
        checkbox.parentElement.classList.toggle('completed')
    }
    checkbox.addEventListener("click", (e) => {
        allGoalsAdded = [...inputs].every((e) => e.value);
        if (allGoalsAdded) {
            checkbox.parentElement.classList.toggle('completed')
            allGoals[checkbox.nextElementSibling.id].completed = !allGoals[checkbox.nextElementSibling.id].completed
            countCheckboxCompleted = Object.values(allGoals).filter((e) => e.completed).length
            progressBarCompleted.style.width = `${countCheckboxCompleted / inputs.length * 100}%`
            progressBarCompleted.previousElementSibling.innerText = `${countCheckboxCompleted}/${inputs.length} Completed`
            

            localStorage.setItem('allGoals', JSON.stringify(allGoals))

        }
        else {
            error.classList.add("show-error")
        }
    })
})


inputs.forEach((input) => {

    input.value = allGoals[input.id].name
    input.addEventListener("focus", (e) => {
        error.classList.remove("show-error")
    })
    
    input.addEventListener("input", (e) => {
        if (allGoals[input.id].completed) {
            input.value = allGoals[input.id].name
            return
        }
        
        allGoals[e.target.id].name = e.target.value
        localStorage.setItem('allGoals', JSON.stringify(allGoals))
    
    })
})