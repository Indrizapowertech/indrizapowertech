// indriza2.js
import { db, collection, addDoc } from "./indriza.js";


class IndrizaApp {
  constructor() {
    // Elements
    this.bookingContainer = document.getElementById("bookingContainer");
    this.bookNowBtns = document.querySelectorAll(".bookNowBtn");
    this.hamburger = document.querySelector(".hamburger");
    this.nav = document.querySelector("header .nav");
    this.carousels = document.querySelectorAll(".projectItemCarousel");

    // Init methods
    this.initBookNowBtns();
    this.initHamburger();
    this.initCarousels();
    this.initBookingForm();
    this.initContactForm(); // 👈 add this

  }

  initContactForm() {
    const contactForm = document.getElementById("contactForm");
    if (!contactForm) return; // safety check

    contactForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      const formData = {
        fullname: contactForm.fullname.value.trim(),
        company: contactForm.company.value.trim(),
        email: contactForm.email.value.trim(),
        phone: contactForm.phone.value.trim(),
        address: contactForm.address.value.trim(),
        message: contactForm.message.value.trim(),
        createdAt: new Date()
      };

      try {
        await addDoc(collection(db, "messages"), formData); // ✅ use db, not this.db
        alert("✅ Message sent successfully!");
        contactForm.reset();
      } catch (error) {
        console.error("Error saving message: ", error);
        alert("❌ Failed to send message. Please try again.");
      }
    });
  }


  // Show booking form when any "Book Now" button is clicked
  initBookNowBtns() {
    if (this.bookNowBtns.length && this.bookingContainer) {
      this.bookNowBtns.forEach((btn) => {
        btn.addEventListener("click", () => {
          this.bookingContainer.style.display =
            this.bookingContainer.style.display === "block" ? "none" : "block";
        });
      });
    }
  }

  // Mobile nav toggle
  initHamburger() {
    if (this.hamburger && this.nav) {
      this.hamburger.addEventListener("click", () => {
        this.nav.classList.toggle("active");
        this.hamburger.classList.toggle("open");
      });
    }
  }

  // Carousel controls
  initCarousels() {
    this.carousels.forEach((carousel) => {
      const slides = carousel.querySelectorAll(".projectItemSlide");
      const prevBtn = carousel.querySelector(".prev");
      const nextBtn = carousel.querySelector(".next");
      let index = 0;

      const showSlide = (i) => {
        slides.forEach((slide, idx) => {
          slide.style.display = idx === i ? "block" : "none";
        });
      };

      // Initial state
      showSlide(index);

      // Event listeners
      if (prevBtn) {
        prevBtn.addEventListener("click", () => {
          index = (index - 1 + slides.length) % slides.length;
          showSlide(index);
        });
      }

      if (nextBtn) {
        nextBtn.addEventListener("click", () => {
          index = (index + 1) % slides.length;
          showSlide(index);
        });
      }
    });
  }
  initBookingForm() {
    const form = document.getElementById("bookingForm");
    const successMsg = document.getElementById("successMsg");
    const errorMsg = document.getElementById("errorMsg");

    if (!form) return; // stop if form doesn’t exist

    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      const fullname = form.fullname.value.trim();
      const phone = form.phone.value.trim();
      const email = form.email.value.trim();
      const service = form.service.value;
      const date = form.date.value;
      const time = form.time.value;
      const details = form.details.value.trim();

      if (!fullname || !phone || !service) {
        errorMsg.textContent = "⚠️ Please fill in all required fields.";
        errorMsg.style.display = "block";
        return;
      }

      try {
        await addDoc(collection(db, "bookings"), {
          fullname,
          phone,
          email,
          service,
          date,
          time,
          details,
          createdAt: new Date()
        });

        successMsg.textContent = `✅ Thank you ${fullname}, your booking has been saved!`;
        successMsg.style.display = "block";
        errorMsg.style.display = "none";
        form.reset();
      } catch (err) {
        console.error(err);
        errorMsg.textContent = "❌ Something went wrong. Please try again.";
        errorMsg.style.display = "block";
      }
    });
  }

}

// Initialize app
document.addEventListener("DOMContentLoaded", () => {
  new IndrizaApp();
});
