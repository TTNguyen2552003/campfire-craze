let loadingAnimationInstance = null
class LoadingAnimation {
    constructor() {
        this.loadingFrame = null
        this.loadingFrameObserver = null

        this.initialize()
    }

    initialize() {
        this.setupElements()
        this.startObserving()
    }

    setupElements() {
        this.loadingFrame = document.querySelector(".loading-animation-frame")
        this.loadingFrameObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    //Block scroll if the loading frame does not slide more than half of its height
                    if (entry.intersectionRatio >= 0.5) {
                        SmoothScroll.SCROLL_LIMITS.maxScrollAmount = 0
                    } else {
                        SmoothScroll.SCROLL_LIMITS.maxScrollAmount =
                            document.querySelector("body").offsetHeight - window.innerHeight
                    }
                })
            },
            { threshold: 0.5 }
        )
    }

    startObserving() {
        this.loadingFrameObserver.observe(this.loadingFrame)
    }
}

window.addEventListener("load", () => {
    if ("scrollRestoration" in history) {
        history.scrollRestoration = "manual"
    }

    window.scrollTo({
        top: 0,
        left: 0,
        behavior: "instant"
    })

    loadingAnimationInstance = new LoadingAnimation()
})
