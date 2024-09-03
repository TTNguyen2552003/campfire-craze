let smoothScrollInstance = null
class SmoothScroll {
    static BASE_SCROLL_AMOUNT_PER_TIME = 100
    static BASE_SCROLL_DURATION = 300
    static MAX_SCROLL_DURATION = 2000
    static SCROLL_LIMITS = {
        minScrollAmount: 0,
        maxScrollAmount: 0
    }

    constructor() {
        this.scrollElements = []
        this.scrollAmount = 0
        this.internalAnchors = []
        this.initialize()
    }

    initialize() {
        this.setupElements()
        this.setupEventListeners()
    }

    setupElements() {
        this.scrollElements = document.querySelectorAll("[smooth-scroll]")
        this.scrollElements.forEach((element) => {
            element.style.transitionTimingFunction = "ease-out"
        })
        this.internalAnchors = Array.from(document.querySelectorAll("a[href^='#']")).filter((link) => {
            const targetId = link.getAttribute("href").slice(1)
            return document.getElementById(targetId) !== null
        })
        SmoothScroll.SCROLL_LIMITS.maxScrollAmount = document.querySelector("body").offsetHeight - window.innerHeight
    }

    setupEventListeners() {
        window.addEventListener(
            "wheel",
            (event) => {
                event.preventDefault()

                const scrollAmountPerTime = this.detectScrollAmountPerTime(event)
                this.scrollSmoothly(scrollAmountPerTime, this.scrollElements)
            },
            { passive: false }
        )

        window.addEventListener(
            "keydown",
            (event) => {
                switch (event.key) {
                    case "ArrowUp":
                    case "ArrowDown":
                    case "PageUp":
                    case "PageDown":
                    case "Home":
                    case "End":
                        event.preventDefault()
                        break
                }

                const scrollAmountPerTime = this.detectScrollAmountPerTime(event)
                this.scrollSmoothly(scrollAmountPerTime, this.scrollElements)
            },
            { passive: false }
        )

        window.addEventListener("resize", () => {
            SmoothScroll.SCROLL_LIMITS.maxScrollAmount =
                document.querySelector("body").offsetHeight - window.innerHeight

            if (this.scrollAmount >= SmoothScroll.SCROLL_LIMITS.maxScrollAmount) {
                this.scrollAmount = SmoothScroll.SCROLL_LIMITS.maxScrollAmount
            }

            this.scrollElements.forEach((element) => {
                element.style.transform = `translateY(${-this.scrollAmount}px)`
            })
        })

        this.internalAnchors.forEach((link) => {
            link.addEventListener("click", (event) => {
                event.preventDefault()

                const targetId = link.getAttribute("href").slice(1)
                const target = document.getElementById(targetId)

                console.log(target.offsetTop)
                console.log(this.scrollAmount)
                this.scrollSmoothly(target.offsetTop - this.scrollAmount, this.scrollElements)
            })
        })
    }

    detectScrollAmountPerTime(event) {
        if (event.type === "keydown") {
            const KEY_SCROLL_AMOUNT = 40
            const PAGE_SCROLL_AMOUNT = 600

            switch (event.key) {
                case "ArrowUp":
                    return -KEY_SCROLL_AMOUNT
                case "ArrowDown":
                    return KEY_SCROLL_AMOUNT
                case "PageUp":
                    return -PAGE_SCROLL_AMOUNT
                case "PageDown":
                    return PAGE_SCROLL_AMOUNT
                case "Home":
                    return -this.scrollAmount
                case "End":
                    return document.documentElement.scrollHeight - window.innerHeight - this.scrollAmount
                default:
                    return 0
            }
        } else if (event.type === "wheel") {
            return event.deltaY < 0
                ? -SmoothScroll.BASE_SCROLL_AMOUNT_PER_TIME
                : SmoothScroll.BASE_SCROLL_AMOUNT_PER_TIME
        }
    }

    scrollSmoothly(scrollAmountPerTime, scrollElements) {
        if (this.scrollAmount + scrollAmountPerTime < SmoothScroll.SCROLL_LIMITS.minScrollAmount) {
            this.scrollAmount = SmoothScroll.SCROLL_LIMITS.minScrollAmount
        } else if (this.scrollAmount + scrollAmountPerTime > SmoothScroll.SCROLL_LIMITS.maxScrollAmount) {
            this.scrollAmount = SmoothScroll.SCROLL_LIMITS.maxScrollAmount
        } else {
            this.scrollAmount += scrollAmountPerTime
        }

        let scrollDuration =
            (Math.abs(scrollAmountPerTime) / SmoothScroll.BASE_SCROLL_AMOUNT_PER_TIME) *
            SmoothScroll.BASE_SCROLL_DURATION
        scrollDuration = Math.min(scrollDuration, SmoothScroll.MAX_SCROLL_DURATION)

        scrollElements.forEach((element) => {
            element.style.transitionDuration = `${scrollDuration}ms`
            element.style.transform = `translateY(${-this.scrollAmount}px)`
        })
    }
}

window.addEventListener("DOMContentLoaded", () => {
    smoothScrollInstance = new SmoothScroll()
})
