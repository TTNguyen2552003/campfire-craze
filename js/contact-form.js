let contactFormInstance = null

class ContactForm {
    constructor() {
        this.form = null

        this.initialize()
    }

    initialize() {
        this.setupElements()
        this.setupEventListeners()
    }

    setupElements() {
        this.form = document.querySelector(".contact-section__form")
    }

    setupEventListeners() {
        let requiredFields = this.form.querySelectorAll("[required]")
        let submitButton = this.form.querySelector(".action-button--main")

        requiredFields.forEach((field) => {
            field.addEventListener("input", () => {
                let allValid = Array.from(requiredFields).every(
                    (field) => field.value.trim() !== "" && field.validity.valid
                )

                submitButton.classList.toggle("action-button--disable", !allValid)
            })
        })

        this.form.addEventListener("submit", (event) => {
            if (submitButton.classList.contains("action-button--disable")) {
                event.preventDefault()
            } else {
                event.preventDefault()
                this.contactByForm()
            }
        })
    }

    collectFormData() {
        const fieldMappings = {
            "#contact-form-full-name": "entry.259645864",
            "#contact-form-class": "entry.219493173",
            "#contact-form-email": "entry.2052615311",
            "#contact-form-subject": "entry.1207439100",
            "#contact-form-message": "entry.567752776"
        }

        const formData = new FormData()

        Object.entries(fieldMappings).forEach(([selector, entryKey]) => {
            formData.append(entryKey, document.querySelector(selector).value)
        })

        return formData
    }

    async contactByForm() {
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
                alert("Register failed")
            })
    }
}

window.addEventListener("DOMContentLoaded", () => {
    contactFormInstance = new ContactForm()
})
