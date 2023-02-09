const nav = document.getElementsByTagName("nav");
const home = document.getElementById("home");
const homeBtn = document.getElementById("homeBtn");
const aboutus = document.getElementById("aboutus");
const aboutusBtn = document.getElementById("aboutusBtn");
const images = document.getElementById("images");
const imagesBtn = document.getElementById("imagesBtn");
const services = document.getElementById("services");
const servicesBtn = document.getElementById("servicesBtn");

//on click scroll event
homeBtn.addEventListener("click", () => {
  home.scrollIntoView({
    behavior: "smooth",
    block: "end",
    inline: "nearest",
  });
});

aboutusBtn.addEventListener("click", () => {
  aboutus.scrollIntoView({
    behavior: "smooth",
    block: "start",
    inline: "nearest",
  });
});

imagesBtn.addEventListener("click", () => {
  images.scrollIntoView({
    behavior: "smooth",
    block: "start",
    inline: "nearest",
  });
});

servicesBtn.addEventListener("click", () => {
  services.scrollIntoView({
    behavior: "smooth",
    block: "start",
    inline: "nearest",
  });
});

document.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    nav[0].classList.add("nav-disable");
  } else {
    nav[0].classList.remove("nav-disable");
  }
  if (window.scrollY < 600) {
    homeBtn.style.backgroundColor = "white";
    imagesBtn.style.backgroundColor = "lightgray";
    aboutusBtn.style.backgroundColor = "lightgray";
    servicesBtn.style.backgroundColor = "lightgray";
  } else if (window.scrollY < 3100) {
    homeBtn.style.backgroundColor = "lightgray";
    imagesBtn.style.backgroundColor = "white";
    aboutusBtn.style.backgroundColor = "lightgray";
    servicesBtn.style.backgroundColor = "lightgray";
  } else if (window.scrollY < 4000) {
    homeBtn.style.backgroundColor = "lightgray";
    imagesBtn.style.backgroundColor = "lightgray";
    aboutusBtn.style.backgroundColor = "white";
    servicesBtn.style.backgroundColor = "lightgray";
  } else {
    homeBtn.style.backgroundColor = "lightgray";
    imagesBtn.style.backgroundColor = "lightgray";
    aboutusBtn.style.backgroundColor = "lightgray";
    servicesBtn.style.backgroundColor = "white";
  }
});

//carousel
const prev = document.getElementById("prev");
const next = document.getElementById("next");
const slider = document.querySelector(".slider");
const imgs = document.querySelectorAll(".slider img");

let idx = 0;
const width = imgs[idx].clientWidth;

next.addEventListener("click", () => {
  idx++;
  slider.style.transform = `translate(${-idx * (width + 4)}px)`;

  if (idx === imgs.length - 1) {
    next.classList.add("disable");
  } else {
    prev.classList.remove("disable");
  }
});
prev.addEventListener("click", () => {
  idx--;
  slider.style.transform = `translate(${-idx * (width + 4)}px)`;

  if (idx === 0) {
    prev.classList.add("disable");
  } else {
    next.classList.remove("disable");
  }
});
