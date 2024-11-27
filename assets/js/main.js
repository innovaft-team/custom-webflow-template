const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  smooth: true,
});

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}
// Sync Lenis with GSAP ScrollTrigger
lenis.on("scroll", ScrollTrigger.update);
ScrollTrigger.defaults({ scroller: lenis.container });

requestAnimationFrame(raf);

const animationFunc = ({ slide1, slide2, slide3, slide4 }) => {
  return (
    gsap
      .timeline()
      .fromTo(
        `#${slide1}`,
        { x: 0 },
        { x: "-100%", duration: 0.5, ease: "none" },
        "same"
      )
      .fromTo(
        `#inner-${slide1}`,
        {
          x: 0,
        },
        { x: "100%", duration: 0.5, ease: "none" },
        "same"
      )
      .fromTo(
        `#inner-${slide1} #img-wrapper`,
        {
          x: "-60%",
          scale: 1,
        },
        { x: "-150%", duration: 0.5, ease: "none", scale: 0.8 },
        "same"
      )
      // STEP TWO TIMELINE
      .fromTo(
        `#${slide2}`,
        { x: "80%" },
        { x: "0%", duration: 0.5, ease: "none" },
        "same"
      )
      .fromTo(
        `#inner-${slide2}`,
        { x: "-80%" },
        { x: "0%", duration: 0.5, ease: "none" },
        "same"
      )
      .fromTo(
        `#inner-${slide2} #img-wrapper`,
        {
          x: "-15%",
          scale: 0.5,
        },
        { x: "-60%", duration: 0.5, ease: "none", scale: 1 },
        "same"
      )
      // STEP THREE TIMELINE
      .fromTo(
        `#${slide3}`,
        { x: "95%" },
        { x: "80%", duration: 0.5, ease: "none" },
        "same"
      )
      .fromTo(
        `#inner-${slide3}`,
        { x: "-95%" },
        { x: "-80%", duration: 0.5, ease: "none" },
        "same"
      )
      .fromTo(
        `#inner-${slide3} #img-wrapper`,
        {
          x: "0%",
          scale: 0.15,
        },
        { x: "-15%", duration: 0.5, ease: "none", scale: 0.5 },
        "same"
      )
      // STEP FOUR TIMELINE
      .fromTo(
        `#${slide4}`,
        { x: "100%" },
        { x: "95%", duration: 0.5, ease: "none" },
        "same"
      )
      .fromTo(
        `#inner-${slide4}`,
        { x: "-100%" },
        { x: "-95%", duration: 0.5, ease: "none" },
        "same"
      )
      .fromTo(
        `#inner-${slide4} #img-wrapper`,
        {
          scale: 0,
        },
        { duration: 0.5, ease: "none", scale: 0.15 },
        "same"
      )
  );
};

gsap
  .timeline({
    scrollTrigger: {
      trigger: "#main-pinned-section",
      pin: true,
      start: "top top",
      end: "+=400%", // Stay pinned for 100% of viewport height
      scrub: 1,
    },
  })
  .add(
    animationFunc({
      slide1: "slide-1",
      slide2: "slide-2",
      slide3: "slide-3",
      slide4: "slide-4",
    })
      .add(
        animationFunc({
          slide1: "slide-2",
          slide2: "slide-3",
          slide3: "slide-4",
          slide4: "slide-5",
        })
      )
      .add(
        animationFunc({
          slide1: "slide-3",
          slide2: "slide-4",
          slide3: "slide-5",
        })
      )
      .add(
        animationFunc({
          slide1: "slide-4",
          slide2: "slide-5",
        })
      )
  );
