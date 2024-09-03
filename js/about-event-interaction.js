const MEANINGFUL_MESSAGE_DATA = [
    {
        title: "Unforgettable Memories",
        body: "Relive the excitement and joy from our past camping events. Experience the camaraderie, laughter, and adventures that make our event truly special."
    },
    {
        title: "Building Stronger Bonds",
        body: "Join in on engaging team-building exercises designed to foster cooperation, enhance leadership skills, and create lasting friendships."
    },
    {
        title: "Explore the Great Outdoors",
        body: "Embark on thrilling hiking trails and nature walks, discovering the beauty of our natural surroundings and embracing the spirit of adventure."
    },
    {
        title: "Evening Around the Campfire",
        body: "Gather around the campfire for a magical evening of storytelling, songs, and s'mores. Create cherished memories under the starry sky"
    },
    {
        title: "Breathtaking Landscapes",
        body: "Immerse yourself in the stunning natural beauty of our campsite. From serene landscapes to spectacular sunsets, every moment is picture-perfect."
    }
]

let slideshowInstance = null
class Slideshow {
    constructor() {
        this.images = []
        this.indicators = []
        this.meaningfulMessage = {
            title: null,
            body: null
        }
        this.currentImageIndex = 0
        this.autoSlideInterval = null
        this.observer = null

        this.initialize()
    }

    initialize() {
        this.setupElements()
        this.setupEventListeners()
        this.startObserving()
    }

    setupElements() {
        this.images = Array.from(document.querySelectorAll(".image-slideshow__image"))
        this.indicators = Array.from(document.querySelectorAll(".indicator"))
        this.meaningfulMessage.title = document.querySelector(
            ".image-slideshow__meaningful-message>.meaningful-message__title"
        )
        this.meaningfulMessage.body = document.querySelector(
            ".image-slideshow__meaningful-message>.meaningful-message__body"
        )

        this.observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.intersectionRatio >= 0.3) {
                        this.startSlideshow()
                    } else {
                        this.stopSlideshow()
                    }
                })
            },
            { threshold: 0.3 }
        )
    }

    startSlideshow() {
        if (!this.autoSlideInterval) {
            this.autoSlideInterval = setInterval(() => {
                this.slideImages()
            }, 3000)
        }
    }

    stopSlideshow() {
        clearInterval(this.autoSlideInterval)
        this.autoSlideInterval = null
    }

    slideImages() {
        this.currentImageIndex = (this.currentImageIndex + 1) % this.images.length
        this.showCurrentSlide()
    }

    showCurrentSlide() {
        this.images.forEach((image, index) => {
            image.classList.toggle("image-slideshow__image--shown", index == this.currentImageIndex)
        })

        let objectSlide = document.querySelector(".image-slideshow__images>ul")
        let offsetLeft = this.images[this.currentImageIndex].offsetLeft
        objectSlide.style.transform = `translateX(${-offsetLeft}px)`

        this.indicators.forEach((indicator, index) => {
            indicator.classList.toggle("indicator--selected", index == this.currentImageIndex)
        })
        this.updateMeaningfulMessage()
    }

    updateMeaningfulMessage() {
        const currentMessage = MEANINGFUL_MESSAGE_DATA[this.currentImageIndex]
        this.meaningfulMessage.title.textContent = currentMessage.title
        this.meaningfulMessage.body.textContent = currentMessage.body
    }

    setupEventListeners() {
        this.indicators.forEach((indicator, index) => {
            indicator.addEventListener("click", () => {
                this.stopSlideshow()
                this.goToSlide(index)
                this.startSlideshow()
            })
        })
    }

    goToSlide(index) {
        this.currentImageIndex = index
        this.showCurrentSlide()
    }

    startObserving() {
        let imagesContainer = document.querySelector(".image-slideshow__images")
        this.observer.observe(imagesContainer)
    }
}

let carouselInstance = null
class Carousel {
    constructor() {
        this.images = []
        this.prevButton = null
        this.nextButton = null
        this.meaningfulMessage = {
            title: null,
            body: null
        }
        this.currentImageIndex = 0
        this.autoSlideInterval = null
        this.observer = null

        this.initialize()
    }

    initialize() {
        this.setupElements()
        this.setupEventListeners()
        this.startObserving()
    }

    setupElements() {
        this.images = document.querySelectorAll(".image-carousel__image")
        this.prevButton = document.querySelector(".carousel-controller__prev-button")
        this.nextButton = document.querySelector(".carousel-controller__next-button")
        this.meaningfulMessage.title = document.querySelector(
            ".image-carousel__meaningful-message>.meaningful-message__title"
        )
        this.meaningfulMessage.body = document.querySelector(
            ".image-carousel__meaningful-message>.meaningful-message__body"
        )
        this.observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.intersectionRatio >= 0.3) {
                        this.startCarousel()
                    } else {
                        this.stopCarousel()
                    }
                })
            },
            { threshold: 0.3 }
        )
    }

    startCarousel() {
        this.autoSlideInterval = setInterval(() => {
            this.slideImages("next")
        }, 3000)
    }

    stopCarousel() {
        clearInterval(this.autoSlideInterval)
        this.autoSlideInterval = null
    }

    slideImages(direction) {
        if (direction === "next") {
            if (this.currentImageIndex < this.images.length - 1) {
                this.currentImageIndex++
            } else {
                this.currentImageIndex = 0
            }
        } else if (direction === "prev") {
            if (this.currentImageIndex > 0) {
                this.currentImageIndex--
            }
        }
        this.updateButtonState()
        this.showCurrentImage(this.currentImageIndex)
    }

    showCurrentImage(index) {
        let imagesContainer = document.querySelector(".image-carousel__images>ul")
        let offsetLeft = this.images[index].offsetLeft
        imagesContainer.style.transform = `translateX(${-offsetLeft}px)`

        this.updateMeaningfulMessage(index)
    }

    updateMeaningfulMessage(index) {
        const currentMessage = MEANINGFUL_MESSAGE_DATA[index]
        this.meaningfulMessage.title.textContent = currentMessage.title
        this.meaningfulMessage.body.textContent = currentMessage.body
    }

    updateButtonState() {
        this.prevButton.style.visibility = this.currentImageIndex === 0 ? "hidden" : "visible"
        this.nextButton.style.visibility = this.currentImageIndex === this.images.length - 1 ? "hidden" : "visible"
    }

    setupEventListeners() {
        this.prevButton.addEventListener("click", () => {
            this.stopCarousel()
            this.slideImages("prev")
            this.startCarousel()
        })

        this.nextButton.addEventListener("click", () => {
            this.stopCarousel()
            this.slideImages("next")
            this.startCarousel()
        })

        this.updateButtonState()
    }

    startObserving() {
        let imagesContainer = document.querySelector(".image-carousel__images")
        this.observer.observe(imagesContainer)
    }
}

window.addEventListener("DOMContentLoaded", () => {
    slideshowInstance = new Slideshow()
    carouselInstance = new Carousel()
})
