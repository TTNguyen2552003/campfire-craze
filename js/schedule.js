let scheduleInstance = null
class Schedule {
    constructor() {
        this.dayPartCards = []
        this.secondaryTabs = []
        this.timelines = []

        this.initialize()
    }

    initialize() {
        this.setupElements()
        this.setupEventListeners()
    }

    setupElements() {
        this.dayPartCards = document.querySelectorAll(".schedule-section__day-part-card")
        this.secondaryTabs = document.querySelectorAll(".tab-group__secondary-tab")
        this.timelines = document.querySelectorAll(".schedule-section__timeline")
    }

    setupEventListeners() {
        this.dayPartCards.forEach((dayPartCard, index) => {
            dayPartCard.addEventListener("click", () => {
                this.updateSelectedDayPartCard(index)
                this.updateSecondaryTab(index)
                this.updateSelectedTimeline(index)
            })
        })
        this.secondaryTabs.forEach((tab, index) => {
            tab.addEventListener("click", () => {
                this.updateSelectedDayPartCard(index)
                this.updateSecondaryTab(index)
                this.updateSelectedTimeline(index)
            })
        })
    }

    updateSelectedDayPartCard(selectedIndex) {
        this.dayPartCards.forEach((dayPartCard, index) => {
            dayPartCard.classList.toggle("schedule-section__day-part-card--selected", index == selectedIndex)
        })
    }

    updateSecondaryTab(selectedIndex) {
        this.secondaryTabs.forEach((tab, index) => {
            tab.classList.toggle("tab-group__secondary-tab--selected", index == selectedIndex)
        })
    }

    updateSelectedTimeline(selectedIndex) {
        this.timelines.forEach((timeline, index) => {
            timeline.classList.toggle("schedule-section__timeline--selected", index == selectedIndex)
        })
    }
}
document.addEventListener("DOMContentLoaded", () => {
    scheduleInstance = new Schedule()
})
