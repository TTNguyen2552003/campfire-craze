// Scroll trigger for subtitles and titles
let titleAndSubtitleScrollTriggerInstance = null
class TitleAndSubtitleScrollTrigger {
    constructor() {
        this.sectionTextContainers = {
            aboutEvent: null,
            schedule: null,
            registration: null,
            contact: null
        }
        this.observer = null

        this.initialize()
    }

    initialize() {
        this.setupElements()
        this.startObserving()
    }

    setupElements() {
        this.sectionTextContainers.aboutEvent = document.querySelector(".about-event-section__text-container")
        this.sectionTextContainers.schedule = document.querySelector(".schedule-section__text-container")
        this.sectionTextContainers.registration = document.querySelector(".registration-section__text-container")
        this.sectionTextContainers.contact = document.querySelector(".contact-section__text-container")

        this.observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    this.showAnimation(entry.target)
                    this.observer.unobserve(entry.target)
                } else {
                    this.hideAnimation(entry.target)
                }
            })
        })
    }

    showAnimation(target) {
        Array.from(target.children).forEach((child) => {
            child.removeAttribute("style")
        })
    }

    hideAnimation(target) {
        Array.from(target.children).forEach((child) => {
            child.style.animationName = "none"
        })
    }

    startObserving() {
        Object.values(this.sectionTextContainers).forEach((container) => {
            if (container) {
                this.observer.observe(container)
            }
        })
    }
}

// Scroll trigger for decorative vectors of schedule section
let decorativeVectorsScrollTriggerInstance = null
class DecorativeVectorsScrollTrigger {
    constructor() {
        this.decorativeVectors = []
        this.observer = null

        this.initialize()
    }

    initialize() {
        this.setupElements()
        this.startObserving()
    }

    setupElements() {
        this.decorativeVectors = document.querySelectorAll("[class*='schedule-section__decorative-vector']")
        this.observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.removeAttribute("style")
                    this.observer.unobserve(entry.target)
                } else {
                    entry.target.style.animationName = "none"
                }
            })
        })
    }

    startObserving() {
        this.decorativeVectors.forEach((vector) => {
            this.observer.observe(vector)
        })
    }
}

// Scroll trigger for activity
let activitiesScrollTrigger = null
class ActivitiesScrollTrigger {
    constructor() {
        this.activities = []
        this.observer = null
        this.initializeAnimator()
    }

    initializeAnimator() {
        this.setupElements()
        this.startObserving()
    }

    setupElements() {
        this.activities = document.querySelectorAll(".timeline__activity")
        this.observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.type === "attributes") {
                    this.animateActivities()
                }
            })
        })
    }

    animateActivities() {
        const midScreenPoint = window.innerHeight / 2
        this.activities.forEach((activity) => {
            const distanceFromMidScreen = this.calculateDistanceFromMidScreen(activity, midScreenPoint)
            this.updateActivityStyle(activity, distanceFromMidScreen)
        })
    }

    calculateDistanceFromMidScreen(activity, midScreenPoint) {
        const activityMiddle = activity.offsetHeight / 2 + activity.getBoundingClientRect().top
        return Math.abs(activityMiddle - midScreenPoint)
    }

    updateActivityStyle(activity, distance) {
        const maxDistance = window.innerHeight
        const opacityFactor = 1 - distance / maxDistance
        const scaleFactor = 1 - distance / (maxDistance * 1.5)

        activity.style.opacity = Math.max(opacityFactor, 0).toString()
        activity.style.transform = `scale(${Math.max(scaleFactor, 0)})`
    }

    startObserving() {
        const scrollElement = document.querySelector("[smooth-scroll]")
        this.observer.observe(scrollElement, { attributes: true })
    }
}

// Hero section parallax scroll
let heroSectionScrollTrigger = null
class HeroSectionScrollTrigger {
    constructor() {
        this.heroSectionContainerBackgroundImage = null
        this.heroSection = {
            self: null,
            title: null,
            image: null,
            subtitle: null,
            countdownClock: null,
            ctaButton: null
        }
        this.observer = null

        this.initialize()
    }

    initialize() {
        this.setupElements()
        this.startObserving()
    }

    setupElements() {
        this.heroSectionContainerBackgroundImage = document.querySelector(".hero-section-container__background-image")
        this.heroSection.self = document.querySelector(".hero-section")
        this.heroSection.title = document.querySelector(".hero-section__title")
        this.heroSection.image = document.querySelector(".hero-section__image")
        this.heroSection.subtitle = document.querySelector(".hero-section__subtitle")
        this.heroSection.countdownClock = document.querySelector(".hero-section__countdown-clock")
        this.heroSection.ctaButton = document.querySelector(".hero-section__cta-button")
        this.observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.type == "attributes") {
                    this.parallaxScroll()
                }
            })
        })
    }

    parallaxScroll() {
        let scrollAmount = smoothScrollInstance.scrollAmount
        this.heroSectionContainerBackgroundImage.style.transform = `translateY(${-scrollAmount * 0.05}px)`
        this.heroSection.self.style.transform = `translateY(${-scrollAmount * 0.15}px)`
        this.heroSection.title.style.transform = `translateY(${-scrollAmount * 0.35}px)`
        this.heroSection.image.style.transform = `translateY(${-scrollAmount * 0.35}px)`
        this.heroSection.subtitle.style.transform = `translateY(${-scrollAmount * 0.25}px)`
        this.heroSection.countdownClock.style.transform = `translateY(${-scrollAmount * 0.2}px)`
        this.heroSection.ctaButton.style.transform = `translateY(${-scrollAmount * 0.15}px)`
    }

    startObserving() {
        const scrollElement = document.querySelector("[smooth-scroll]")
        this.observer.observe(scrollElement, { attributes: true })
    }
}

// Auto show and hide the header
let headerScrollTrigger = null
class HeaderScrollTrigger {
    constructor() {
        this.header = null
        this.hidingHeaderTimeDelayId = null
        this.observer = null
        this.lastScrollAmount = smoothScrollInstance.scrollAmount

        this.initialize()
    }

    initialize() {
        this.setupElements()
        this.startObserving()
    }

    setupElements() {
        this.header = document.querySelector("header")
        this.observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.type == "attributes" && mutation.attributeName == "style") {
                    if (smoothScrollInstance.scrollAmount >= this.lastScrollAmount) {
                        this.hideHeader()
                    } else {
                        this.showHeader()
                    }
                    this.lastScrollAmount = smoothScrollInstance.scrollAmount
                }
            })
        })
    }

    hideHeader() {
        this.header.style.transform = "translateY(-100%)"
    }

    showHeader() {
        this.header.style.transform = "translateY(0)"

        clearTimeout(this.hidingHeaderTimeDelayId)

        this.hidingHeaderTimeDelayId = setTimeout(() => {
            this.hideHeader()
        }, 1250)
    }

    startObserving() {
        const scrollElement = document.querySelector("[smooth-scroll]")
        this.observer.observe(scrollElement, { attributes: true })
    }
}

window.addEventListener("DOMContentLoaded", () => {
    titleAndSubtitleScrollTriggerInstance = new TitleAndSubtitleScrollTrigger()
    decorativeVectorsScrollTriggerInstance = new DecorativeVectorsScrollTrigger()
    activitiesScrollTrigger = new ActivitiesScrollTrigger()
    heroSectionScrollTrigger = new HeroSectionScrollTrigger()
    headerScrollTrigger = new HeaderScrollTrigger()
})
