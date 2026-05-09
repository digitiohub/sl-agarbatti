gsap.registerPlugin(ScrollTrigger);

// Select all sections and images
const workSections = document.querySelectorAll('.work_info');
const workPhotos = document.querySelectorAll('.work_photo-item');

// Loop through each section and link to the correct image using the index
workSections.forEach((section, index) => {
    const matchingImage = workPhotos[index]; // Ensure correct pairing

    // Animate section content with reverse scrolling
    gsap.fromTo(section,
        { opacity: 0, y: 40 },
        {
            opacity: 1,
            y: 0,
            scrollTrigger: {
                trigger: section,
                start: "top center+=100",
                end: "bottom center", // Reverse trigger effect
                toggleActions: "play reverse play reverse", // Enables both ways
                scrub: true
            }
        }
    );

    // Animate the corresponding image with reverse effect
    if (matchingImage) {
        // Use GSAP for better control over the animation
        // Create a timeline for this specific image
        const tl = gsap.timeline({
            paused: true,
            defaults: { duration: 0.3, ease: "power2.out" }
        });

        // Add animations to the timeline
        tl.to(matchingImage, { opacity: 1, scale: 1 });

        // Use Intersection Observer to control the timeline
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Play the timeline when section is visible
                    tl.play();
                } else {
                    // Reverse the timeline when section is not visible
                    tl.reverse();
                }
            });
        }, {
            threshold: 0.1, // Trigger when at least 10% of the section is visible
            rootMargin: "-10% 0px" // Adjust this to fine-tune when the animation triggers
        });

        // Start observing the section
        observer.observe(section);

        // Set initial styles
        gsap.set(matchingImage, { opacity: 0, scale: 0.8 });
    }
});



// product details page image slider
document.addEventListener("DOMContentLoaded", function () {
  const thumbnails = document.querySelectorAll(".thumbnail");
  const mainImage = document.getElementById("mainImage");
  let currentIndex = 0;

  // Function to update the main image based on the index
  function updateMainImage(index) {
    const newSrc = thumbnails[index].src;
    mainImage.src = newSrc;
    currentIndex = index;
  }

  // Click event for thumbnails
  thumbnails.forEach((thumbnail, index) => {
    thumbnail.addEventListener("click", function () {
      updateMainImage(index);
    });
  });

  // Click event for the next arrow
  var nexts = document.querySelector(".nexts");
  console.log(nexts);
  if (nexts && nexts != null) {
    nexts.addEventListener("click", function () {
      if (currentIndex < thumbnails.length - 1) {
        updateMainImage(currentIndex + 1);
      } else {
        updateMainImage(0); // Loop back to the first image
      }
    });
  }
  // Click event for the previous arrow
  var prevs = document.querySelector(".prevs");
  if (prevs != null && prevs) {
    document.querySelector(".prevs").addEventListener("click", function () {
      if (currentIndex > 0) {
        updateMainImage(currentIndex - 1);
      } else {
        updateMainImage(thumbnails.length - 1); // Loop back to the last image
      }
    });
  }
});

// Services popup
function openPopup(popupId) {
  document.getElementById(popupId).style.display = "block";
}
function closePopup(popupId) {
  document.getElementById(popupId).style.display = "none";
}

// Client popup

    function openClientPopup(element) {
        const popupId = element.getAttribute('data-target');
        const imageSrc = element.getAttribute('data-image');
        const title = element.getAttribute('data-title');
        const description = element.getAttribute('data-description');

        document.getElementById('popupImage').src = imageSrc;
        document.getElementById('popupTitle').innerText = title;
        document.getElementById('popupDescription').innerText = description;

        document.getElementById(popupId).style.display = 'block';
    }

    function closeClientPopup(popupId) {
        document.getElementById(popupId).style.display = "none";
    }

// product scroll bar
document.addEventListener("DOMContentLoaded", function () {
  // Function to scroll the active tab into view
  function scrollActiveTabIntoView() {
    var activeTab = document.querySelector(".tab-items.active");

    if (activeTab) {
      var container = document.querySelector(".tab-containers");

      // Customize the width as a percentage or a fixed value
      var customWidthPercentage = 80; // Adjust this percentage to your desired width
      var containerWidth =
        container.offsetWidth * (customWidthPercentage / 100);

      var tabLeft = activeTab.offsetLeft;
      var tabWidth = activeTab.offsetWidth;
      var currentScrollPosition = container.scrollLeft;

      // Calculate new scroll position to center the active tab
      var newScrollPosition = tabLeft - containerWidth / 2 + tabWidth / 2;

      // Ensure new scroll position is within bounds
      if (newScrollPosition < 0) {
        newScrollPosition = 0;
      } else if (newScrollPosition + containerWidth > container.scrollWidth) {
        newScrollPosition = container.scrollWidth - containerWidth;
      }

      // Only scroll if the difference is significant
      if (Math.abs(currentScrollPosition - newScrollPosition) > 10) {
        container.scrollTo({
          left: newScrollPosition,
          behavior: "smooth",
        });
      }
    }
  }

  // Initially scroll to the active tab
  scrollActiveTabIntoView();

  // Add event listeners to all tab items
  document.querySelectorAll(".tab-items").forEach(function (tab) {
    tab.addEventListener("click", function () {
      var previouslyActiveTab = document.querySelector(".tab-items.active");
      if (previouslyActiveTab !== tab) {
        previouslyActiveTab.classList.remove("active");
        tab.classList.add("active");
        scrollActiveTabIntoView();
      }
    });
  });
});

// navbarsection
let navbar = document.querySelector(".navbarss"),
  navLinks = document.querySelector(".data"),
  menuOpenBtn = document.querySelector(".bx-menu"),
  menuCloseBtn = document.querySelector(".bx-x");
(menuOpenBtn.onclick = function () {
  navLinks.style.left = "0";
}),
  (menuCloseBtn.onclick = function () {
    navLinks.style.left = "-100%";
  });
let htmlcssArrow = document.querySelector("#products-link");
htmlcssArrow.onclick = function () {
  navLinks.classList.toggle("show1");
};
const tabs = document.querySelectorAll(".tab-items"),
  tabContents = document.querySelectorAll(".tab-content-list");
tabs.forEach((e) => {
  e.addEventListener("click", () => {
    let t = e.getAttribute("data-tab");
    tabs.forEach((e) => e.classList.remove("active")),
      tabContents.forEach((e) => e.classList.remove("active")),
      e.classList.add("active"),
      document.getElementById(t).classList.add("active");
  });
});

// home page testimonial slider
var swiper = new Swiper(".mySwiper", {
  slidesPerView: 1,
  spaceBetween: 30,
  autoplay: {
    delay: 5000,
    disableOnInteraction: !1,
  },
  centeredSlides: !0,
  slideActiveClass: "swiper-slide-active",
  slideVisibleClass: "swiper-slide-visible",

});




function openTab(tabId) {
  var contents = document.querySelectorAll(".tab-content-list");
  contents.forEach(function (content) {
    content.classList.remove("active");
  });

  var tabs = document.querySelectorAll(".tab-items");
  tabs.forEach(function (tab) {
    tab.classList.remove("active");
  });

  var activeContent = document.getElementById(tabId);
  if (activeContent) {
    activeContent.classList.add("active");
  }
  var activeTab = document.querySelector(
    '.tab-items[data-tab="' + tabId + '"]'
  );
  if (activeTab) {
    activeTab.classList.add("active");
  }
}

document.addEventListener("DOMContentLoaded", function () {
  var urlParams = new URLSearchParams(window.location.search);
  if (urlParams.has("tab") && urlParams.get("tab") === "Information") {
    openTab("Information");
  }
});

// Close the modal when clicking outside the image
window.onclick = function (event) {
  var modal = document.getElementById("modal");
  if (event.target == modal) {
    closeModal();
  }
};

// Hide the modal on page load if on the gallery page
document.addEventListener("DOMContentLoaded", function () {
  var modal = document.getElementById("modal");
  var currentPage = window.location.pathname;

  // Check if the current page is the gallery page
  if (currentPage.includes("gallery")) {
    modal.style.display = "none"; // Ensure the modal is hidden
  }
});

// gallery image slider
$(document).ready(function () {
  // Initialize Fancybox with Slick Slider
  $('[data-fancybox="gallery"]').fancybox({
    loop: true,
    buttons: [
      "close", // Only show the close button
    ],
    animationEffect: "fade", // Use fade instead of slide animation
    afterShow: function (instance, current) {
      // Initialize Slick Slider if not already initialized
      const $currentSlide = $(".fancybox-slide--current");
      if ($currentSlide.find(".slick-slider").length === 0) {
        $currentSlide.find("img").wrap('<div class="slick-slider"></div>');
        $currentSlide.find(".slick-slider").slick({
          slidesToShow: 1,
          slidesToScroll: 1,
          autoplay: true, // Start the slider automatically
          autoplaySpeed: 3000, // Time between slides
          dots: false, // Hide dots
          arrows: false, // Hide arrows
        });
      }
    },
  });
});

window.addEventListener("scroll", function () {
  const navbarHeight = document.querySelector(".sticky-top").offsetHeight;
  const stickyContent = document.querySelector(".sticky-content");

  stickyContent.style.top = `${navbarHeight}px`;
});

// Lightbox Gallery

// query selectors
const lightboxEnabled = document.querySelectorAll(".lightbox-enabled");
const lightboxArray = Array.from(lightboxEnabled);
const lastImage = lightboxArray.length - 1;
const lightboxContainer = document.querySelector(".lightbox-container");
const lightboxImage = document.querySelector(".lightbox-image");
const lightboxBtns = document.querySelectorAll(".lightbox-btn");
const lightboxBtnRight = document.querySelector("#right");
const lightboxBtnLeft = document.querySelector("#left");
const close = document.querySelector("#close");
let activeImage;
// Functions
const showLightBox = () => {
  lightboxContainer.classList.add("active");
};

const hideLightBox = () => {
  lightboxContainer.classList.remove("active");
};

const setActiveImage = (image) => {
  lightboxImage.src = image.dataset.imgsrc;
  activeImage = lightboxArray.indexOf(image);
};

const transitionSlidesLeft = () => {
  lightboxBtnLeft.focus();
  $(".lightbox-image").addClass("slideright");
  setTimeout(function () {
    activeImage === 0
      ? setActiveImage(lightboxArray[lastImage])
      : setActiveImage(lightboxArray[activeImage - 1]);
  }, 250);

  setTimeout(function () {
    $(".lightbox-image").removeClass("slideright");
  }, 500);
};

const transitionSlidesRight = () => {
  lightboxBtnRight.focus();
  $(".lightbox-image").addClass("slideleft");
  setTimeout(function () {
    activeImage === lastImage
      ? setActiveImage(lightboxArray[0])
      : setActiveImage(lightboxArray[activeImage + 1]);
  }, 250);
  setTimeout(function () {
    $(".lightbox-image").removeClass("slideleft");
  }, 500);
};

const transitionSlideHandler = (moveItem) => {
  moveItem.includes("left") ? transitionSlidesLeft() : transitionSlidesRight();
};

// Event Listeners
lightboxEnabled.forEach((image) => {
  image.addEventListener("click", (e) => {
    showLightBox();
    setActiveImage(image);
  });
});
if (lightboxContainer != null) {
  lightboxContainer.addEventListener("click", () => {
    hideLightBox();
  });
  close.addEventListener("click", () => {
    hideLightBox();
  });
  lightboxBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      transitionSlideHandler(e.currentTarget.id);
    });
  });
}

if (lightboxImage != null && lightboxImage) {
  lightboxImage.addEventListener("click", (e) => {
    e.stopPropagation();
  });
}
function openTab(tabName) {
  // Hide all tab content
  const tabContents = document.querySelectorAll(".tab-content-list");
  tabContents.forEach((content) => (content.style.display = "none"));

  // Show the specific tab content
  const activeTab = document.getElementById(tabName);
  if (activeTab) {
    activeTab.style.display = "block";
  }
}
document.addEventListener("DOMContentLoaded", function () {
  const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
  tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl);
  });
});
const timelineItems = document.querySelectorAll('#timeline ul li');
const totalItems = timelineItems.length;
const timelineHeight = document.querySelector('#timeline ul').offsetHeight;

timelineItems.forEach((item, index) => {
  const spacing = (timelineHeight / totalItems) * index;
  item.style.top = `${spacing}px`;
});
