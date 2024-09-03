let registrationFormInstance = null

class RegistrationForm {
    constructor() {
        this.form = null
        this.currentStageIndex = 0
        this.actionsContainers = []
        this.stages = []
        this.verticalProgressBarIndicators = []
        this.horizontalProgressBarIndicators = []
        this.initialize()
    }

    initialize() {
        this.setupElements()
        this.setupEventListeners()
        this.showStage(0)
    }

    setupElements() {
        this.form = document.querySelector(".registration-section__form")
        const rawElements = this.form.querySelectorAll("[class*='form'][class*='category']")
        let formCategories = Array.from(rawElements).filter(
            (category) => category.classList[0].startsWith("form") && category.classList[0].endsWith("category")
        )
        this.actionsContainers = this.form.querySelectorAll(".form__actions")
        this.verticalProgressBarIndicators = document.querySelectorAll(
            ".registration-section__vertical-progress-bar .progress-bar__indicator"
        )
        this.horizontalProgressBarIndicators = document.querySelectorAll(
            ".registration-section__horizontal-progress-bar .progress-bar__indicator"
        )
        this.stages = [
            [formCategories[0], formCategories[1]],
            [formCategories[2], formCategories[3]],
            [formCategories[4], formCategories[5]]
        ]
    }

    setupEventListeners() {
        let requiredFields = this.form.querySelectorAll("[required]")
        requiredFields.forEach((field) => {
            field.addEventListener("input", () => {
                this.updateButton()
            })
        })

        this.actionsContainers.forEach((actionsContainer) => {
            let mainButton = actionsContainer.querySelector(".action-button--main[type='button']")
            if (mainButton != null) {
                mainButton.addEventListener("click", () => {
                    this.goToNextStage()
                })
            }

            let subButton = actionsContainer.querySelector(".action-button--sub")
            if (subButton != null) {
                subButton.addEventListener("click", () => {
                    this.goToBackStage()
                })
            }
        })

        this.form.addEventListener("submit", (event) => {
            event.preventDefault()
            this.register()
        })
    }

    isStageValid(index) {
        let categories = this.stages[index]
        for (let category of categories) {
            let inputs = category.querySelectorAll("input[required]")
            for (let input of inputs) {
                if (input.value.trim() == "" || !input.validity.valid || (input.type == "checkbox" && !input.checked)) {
                    return false
                }
            }
        }
        return true
    }

    goToNextStage() {
        if (this.isStageValid(this.currentStageIndex)) {
            this.updateStage("next")
        }
    }

    goToBackStage() {
        this.updateStage("back")
    }

    updateStage(direction) {
        this.hideStage(this.currentStageIndex)
        this.updateProgressBar(this.currentStageIndex, direction)

        if (direction == "next") {
            this.currentStageIndex++
        } else {
            this.currentStageIndex--
        }

        this.showStage(this.currentStageIndex)
    }

    updateProgressBar(index, direction) {
        if (direction == "next") {
            this.verticalProgressBarIndicators[index].classList.remove("progress-bar__indicator--processing")
            this.verticalProgressBarIndicators[index].classList.add("progress-bar__indicator--completed")
            this.verticalProgressBarIndicators[index + 1].classList.add("progress-bar__indicator--processing")

            this.horizontalProgressBarIndicators[index].classList.remove("progress-bar__indicator--processing")
            this.horizontalProgressBarIndicators[index].classList.add("progress-bar__indicator--completed")
            this.horizontalProgressBarIndicators[index + 1].classList.add("progress-bar__indicator--processing")
        } else {
            this.verticalProgressBarIndicators[index].classList.remove("progress-bar__indicator--processing")
            this.verticalProgressBarIndicators[index - 1].classList.remove("progress-bar__indicator--completed")
            this.verticalProgressBarIndicators[index - 1].classList.add("progress-bar__indicator--processing")

            this.horizontalProgressBarIndicators[index].classList.remove("progress-bar__indicator--processing")
            this.horizontalProgressBarIndicators[index - 1].classList.remove("progress-bar__indicator--completed")
            this.horizontalProgressBarIndicators[index - 1].classList.add("progress-bar__indicator--processing")
        }
    }

    updateButton() {
        let mainActionButton = this.actionsContainers[this.currentStageIndex].querySelector(".action-button--main")
        mainActionButton.classList.toggle("action-button--disable", !this.isStageValid(this.currentStageIndex))
    }

    hideStage(index) {
        let categories = this.stages[index]
        categories.forEach((category) => {
            category.classList.remove("form__category--shown")
        })
        this.actionsContainers[index].classList.remove("form__actions--shown")
    }

    showStage(index) {
        let categories = this.stages[index]
        categories.forEach((category) => {
            category.classList.add("form__category--shown")
        })
        this.actionsContainers[index].classList.add("form__actions--shown")
    }

    collectFormData() {
        const formData = new FormData()
        const fieldMappings = {
            "#register-form-full-name": "entry.232142524",
            "#register-form-email": "entry.1833994045",
            "#register-form-phone-number": "entry.2012109487",
            "#register-form-emergency-contact": "entry.1225194832",
            "#register-form-allergies": "entry.411565150",
            "#register-form-medical-condition": "entry.215478447",
            "#register-form-opinion": "entry.796348463",
            "#register-form-birthday": "entry.304977533",
            "#register-form-gender-selection": "entry.1588029778"
        }

        Object.entries(fieldMappings).forEach(([selector, entryKey]) => {
            formData.append(entryKey, this.form.querySelector(selector).value)
        })

        const activities = ["hiking", "team-building", "workshops", "creative-activities"]
            .filter((activity) => this.form.querySelector(`#${activity}-preference`).checked)
            .join(", ")
        formData.append("entry.988975664", activities)

        return formData
    }

    async register() {
        if (this.isStageValid(this.currentStageIndex)) {
            const API_POST =
                "https://docs.google.com/forms/d/e/1FAIpQLSfdqpVSRAPNezGR4GbItjYXyYcDtEtK7IZS4C4baFF1j7-_QA/formResponse"
            const formData = this.collectFormData()

            fetch(API_POST, {
                method: "POST",
                body: formData,
                mode: "no-cors"
            })
                .then(() => {
                    alert("Register successfully")
                })
                .catch((error) => {
                    console.log(error)
                    alert("Register failed")
                })
        }
    }
}

window.addEventListener("DOMContentLoaded", () => {
    registrationFormInstance = new RegistrationForm()
})
