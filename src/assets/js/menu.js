
  // Selecciona los elementos necesarios
  const body = document.querySelector("body"),
  modeSwitch = body.querySelector(".toggle-switch"),
  modeText = body.querySelector(".mode-text");
    sidebar = body.querySelector("nav"),
    toggle = body.querySelector(".toggle"),
    searchBtn = body.querySelector(".search-box"),


  toggle.addEventListener("click", () => {
    sidebar.classList.toggle("close");
  });

  searchBtn.addEventListener("click", () => {
    sidebar.classList.remove("close");
  });


// Función para actualizar el modo
function updateMode() {
  if (body.classList.contains("dark")) {
    modeText.innerText = "Light mode";
    localStorage.setItem("mode", "dark"); // Guardar el modo oscuro en localStorage
  } else {
    modeText.innerText = "Dark mode";
    localStorage.setItem("mode", "light"); // Guardar el modo claro en localStorage
  }
}

// Evento para cambiar el modo
modeSwitch.addEventListener("click", () => {
  body.classList.toggle("dark");
  updateMode();
});

// Al cargar la página, leer el estado de localStorage y aplicar el modo correcto
document.addEventListener("DOMContentLoaded", () => {
  const savedMode = localStorage.getItem("mode");
  if (savedMode === "dark") {
    body.classList.add("dark");
  } else {
    body.classList.remove("dark");
  }
  updateMode();
});
