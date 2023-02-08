const home = document.getElementById("home");
const homeBtn = document.getElementById("homeBtn");
const aboutus = document.getElementById("aboutus");
const aboutusBtn = document.getElementById("aboutusBtn");
const images = document.getElementById("images");
const imagesBtn = document.getElementById("imagesBtn");
const services = document.getElementById("services");
const servicesBtn = document.getElementById("servicesBtn");

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
    block: "end",
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
    block: "end",
    inline: "nearest",
  });
});

document.addEventListener("scroll", () => {
  if (window.scrollY < 600) {
    homeBtn.style.backgroundColor = "white";
    imagesBtn.style.backgroundColor = "lightgray";
    aboutusBtn.style.backgroundColor = "lightgray";
    servicesBtn.style.backgroundColor = "lightgray";
  } else if (window.scrollY < 2500) {
    homeBtn.style.backgroundColor = "lightgray";
    imagesBtn.style.backgroundColor = "white";
    aboutusBtn.style.backgroundColor = "lightgray";
    servicesBtn.style.backgroundColor = "lightgray";
  } else if (window.scrollY < 3000) {
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
