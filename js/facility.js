const items = gsap.utils.toArray(".item"),
  details = document.querySelector(".detail"),
  detailContent = document.querySelector(".content"),
  detailImage = document.querySelector(".detail img"),
  detailTitle = document.querySelector(".detail .title"),
  detailDescription = document.querySelector(".detail .description"),
  detailPlanTitle = document.querySelector(".detail .plan-title");

let activeItem;

gsap.set(detailContent, { yPercent: -100 });

function showDetails(item) {
  if (activeItem) {
    return hideDetails();
  }
  let onLoad = () => {
    Flip.fit(details, item, { scale: 0.8, fitChild: detailImage });
    const state = Flip.getState(details);
    gsap.set(details, { clearProps: true });
    gsap.set(details, {
      xPercent: -50,
      top: "50%",
      yPercent: -50,
      visibility: "visible",
      overflow: "hidden",
    });
    Flip.from(state, {
      duration: 0.5,
      ease: "power2.inOut",
      scale: 0.8,
      onComplete: () => gsap.set(details, { overflow: "auto" }),
    }).to(detailContent, { yPercent: 0 }, 0.2);
    const vectorColor = item.dataset.vectorColor;
    const vectorElement = details.querySelector(".vector");
    vectorElement.style.borderLeft = `160px solid ${vectorColor}`;
    detailImage.removeEventListener("load", onLoad);
    document.addEventListener("click", hideDetails);
  };

  const data = item.dataset;
  detailImage.addEventListener("load", onLoad);
  detailImage.src = item.querySelector("img").src;
  detailTitle.innerText = data.title;
  detailDescription.innerText = data.text;
  detailPlanTitle.innerText = data.title;
  detailContent.style.backgroundColor = data.color;
  const bar = document.querySelector(".bar");
  bar.style.backgroundColor = data.barColor;
  gsap
    .to(items, {
      opacity: 0.3,
      stagger: { amount: 0.7, from: items.indexOf(item), grid: "auto" },
    })
    .kill(item);
  gsap.to(".app", {
    backgroundColor: "#eddec1",
    duration: 1,
    delay: 0.3,
  });
  activeItem = item;
}

function hideDetails() {
  document.removeEventListener("click", hideDetails);
  gsap.set(details, { overflow: "hidden" });
  const state = Flip.getState(details);
  Flip.fit(details, activeItem, { scale: true, fitChild: detailImage });
  const tl = gsap.timeline();
  tl.set(details, { overflow: "hidden" })
    .to(detailContent, { yPercent: -100 })
    .to(items, {
      opacity: 1,
      stagger: {
        amount: 0.7,
        from: items.indexOf(activeItem),
        grid: "auto",
      },
    })
    .to(".app", { backgroundColor: "#eddec1" }, "<");
  Flip.from(state, {
    scale: true,
    duration: 0.5,
    delay: 0.2,
    onInterrupt: () => tl.kill(),
  }).set(details, { visibility: "hidden" });
  activeItem = null;
}

gsap.utils
  .toArray(".item")
  .forEach((item) => item.addEventListener("click", () => showDetails(item)));

window.addEventListener("load", () => {
  gsap.to(".app", { autoAlpha: 1, duration: 0.2 });
  gsap.from(".item", { autoAlpha: 0, yPercent: 30, stagger: 0.04 });
});
