const form = document.getElementsByClassName("needs-validation")[0];
if(form !== undefined) {
const { elements } = form;
const [title, desc, country, locality] = Array.from(elements);

const pattern = {
  title: /^[A-Z][a-zA-Z0-9 .,!?':;-]{2,99}$/,
  desc: /^[A-Z][a-zA-Z \d\s\n.,!?':;-]{10,99}$/, 
  country: /^[a-zA-Z\s]{2,50}$/,
  locality: /^[a-zA-Z0-9\s,.-]{2,100}$/
}

function isFilled(elm) {
  if(elm.value === "") {
    elm.classList.remove("correct");
    elm.nextElementSibling.classList.remove("valid-feedback");
    elm.classList.add("incorrect");
    elm.nextElementSibling.classList.add("invalid-feedback");
  }
}

form.addEventListener("submit", e => {
  // e.preventDefault();
  isFilled(title); 
  isFilled(desc);  
  isFilled(country); 
  isFilled(locality); 
})

function validate(elm, pat) {
  if(elm.value.match(pat)) {
    elm.classList.add("correct"); 
    elm.nextElementSibling.classList.add("valid-feedback");
    elm.classList.remove("incorrect");
    elm.nextElementSibling.classList.remove("invalid-feedback");
  } else {
    elm.classList.add("incorrect");
    elm.nextElementSibling.classList.add("invalid-feedback");
    elm.classList.remove("correct");
    elm.nextElementSibling.classList.remove("valid-feedback");
  }
  if(elm.value === "") {
    elm.classList.remove("correct");
    elm.nextElementSibling.classList.add("valid-feedback");
    elm.classList.remove("incorrect");
    elm.nextElementSibling.classList.remove("invalid-feedback");
  }
}

form.addEventListener("keyup", e => {
  validate(title, pattern.title);
  validate(desc, pattern.desc); 
  validate(country, pattern.country);
  validate(locality, pattern.locality);
}) 
}