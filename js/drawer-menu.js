let drawerMenuInstance = null
class DrawerMenu {
    constructor() {
        this.self = null
        this.openButton = null
        this.closeButton = null
        this.internalAnchors = []
        this.socialMediaNetworks = []

        this.initialize()
    }

    initialize() {
        this.setupElements()
        this.setupEventListener()
    }

    setupElements() {
        this.self = document.querySelector(".drawer-menu")
        this.openButton = document.querySelector(".header__burger-menu")
        this.closeButton = document.querySelector(".drawer-menu__close-button")
        this.internalAnchors = document.querySelectorAll(".drawer-menu-item__link")
        this.socialMediaNetworks = document.querySelectorAll(".drawer-menu .social-media-network__link")
    }

    setupEventListener() {
        this.openButton.addEventListener("click", () => {
            this.openDrawerMenu()
        })
        this.closeButton.addEventListener("click", () => {
            this.closeDrawerMenu()
        })
        this.internalAnchors.forEach((anchor) => {
            anchor.addEventListener("click", (event) => {
                event.preventDefault()

                this.closeDrawerMenu()

                const targetId = anchor.getAttribute("href").slice(1)
                const target = document.getElementById(targetId)

                smoothScrollInstance.scrollSmoothly(
                    target.offsetTop - smoothScrollInstance.scrollAmount,
                    smoothScrollInstance.scrollElements
                )
            })
        })
        this.socialMediaNetworks.forEach((link) => {
            link.addEventListener("click", () => {
                this.closeDrawerMenu()
            })
        })
    }

    openDrawerMenu() {
        this.self.classList.add("drawer-menu--shown")
        SmoothScroll.SCROLL_LIMITS.maxScrollAmount = 0
    }
    closeDrawerMenu() {
        this.self.classList.remove("drawer-menu--shown")
        SmoothScroll.SCROLL_LIMITS.maxScrollAmount = document.querySelector("body").offsetHeight - window.innerHeight
    }
}

window.addEventListener("DOMContentLoaded", () => {
    drawerMenuInstance = new DrawerMenu()
})
