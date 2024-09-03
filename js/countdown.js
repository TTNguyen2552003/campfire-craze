let countdownTimerInstance = null
class CountdownTimer {
    constructor() {
        this.countdownClock = null
        this.hour = null
        this.minute = null
        this.second = null
        this.countdownInterval = null
        this.observer = null

        this.initialize()
    }

    initialize() {
        this.setupElements()
        this.startObserving()
    }

    setupElements() {
        this.countdownClock = document.querySelector(".hero-section__countdown-clock")
        this.hour = this.countdownClock.querySelector(".hour-digit__value")
        this.minute = this.countdownClock.querySelector(".minute-digit__value")
        this.second = this.countdownClock.querySelector(".second-digit__value")
        this.observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    this.startCountdown()
                } else {
                    this.stopCountdown()
                }
            })
        })
    }

    startCountdown() {
        this.updateCountdown()
        this.countdownInterval = setInterval(() => {
            this.updateCountdown()
        }, 1000)
    }

    stopCountdown() {
        clearInterval(this.countdownInterval)
    }

    updateCountdown() {
        const now = new Date()
        const deadline = new Date()
        deadline.setDate(now.getDate() + 2)
        deadline.setHours(23, 59, 59, 0)

        const timeLeft = deadline - now

        if (timeLeft < 0) {
            this.displayTime(0, 0, 0)
        } else {
            const hoursLeft = Math.floor(timeLeft / (1000 * 60 * 60))
            const minutesLeft = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60))
            const secondsLeft = Math.floor((timeLeft % (1000 * 60)) / 1000)
            this.displayTime(hoursLeft, minutesLeft, secondsLeft)
        }
    }

    displayTime(hours, minutes, seconds) {
        this.hour.textContent = hours.toString().padStart(2, "0")
        this.minute.textContent = minutes.toString().padStart(2, "0")
        this.second.textContent = seconds.toString().padStart(2, "0")
    }

    startObserving() {
        this.observer.observe(this.countdownClock)
    }
}

window.addEventListener("DOMContentLoaded", () => {
    countdownTimerInstance = new CountdownTimer()
})
