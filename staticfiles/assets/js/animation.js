const lenis = new Lenis();
function raf(t) {
  lenis.raf(t), requestAnimationFrame(raf);
}
lenis.on("scroll", (t) => {
  console.log(t);
}),
  requestAnimationFrame(raf);
var tl = gsap.timeline({
  scrollTrigger: {
    trigger: ".part-1",
    start: "50% 50%",
    end: "130% 50%",
    scrub: !0,
    pin: !0,
  },
});
tl.to(".rotate-div", { rotate: -15, scale: 0.8 }, "a"),
  tl.to("#row-div-2", { marginTop: "5%" }, "a"),
  tl.to("#row-div-3", { marginTop: "-2%" }, "a"),
  tl.to(".overlay-div h1", { opacity: "1", delay: "0.2" }, "a"),
  tl.to(".overlay-div p", { opacity: "1", delay: "0.2" }, "a"),
  tl.to(".overlay-div", { backgroundColor: "#000000b4" }, "a");
var tl2 = gsap.timeline({
  scrollTrigger: {
    trigger: ".part-2",
    start: "0% 70%",
    end: "50% 50%",
    scrub: !0,
  },
});
tl2.to(".rounded-div-wrapper", { height: 0, marginTop: 0 });
let tl3 = gsap.timeline({
  scrollTrigger: {
    trigger: ".content-2",
    start: "20% 50%",
    end: "100% 50%",
    scrub: 1,
  },
});


document.addEventListener('DOMContentLoaded', function () {
  gsap.registerPlugin(ScrollTrigger);
  const counters = document.querySelectorAll('.counter');
  counters.forEach(counter => {
      const updateCounter = (element) => {
          const target = +element.getAttribute('data-target');
          const duration = 2; 

          gsap.to(element, {
              innerText: target,
              duration: duration,
              scrollTrigger: {
                  trigger: element,
                  start: 'top 80%', 
                  end: 'bottom 20%',
                  toggleActions: 'play none none none', 
              },
              snap: { innerText: 1 }, 
              ease: 'power1.in',
              onUpdate: function () {
                  if (element.getAttribute('data-target') === '1') {
                      element.innerText = Math.ceil(element.innerText) + 'M+'; 
                  } else {
                      element.innerText = Math.ceil(element.innerText) + '+'; 
                  }
              }
          });
      };

      updateCounter(counter);
  });
});

