(function () {
  var buttons = document.querySelectorAll(".nav-btn");
  var sections = document.querySelectorAll(".menu-section");

  buttons.forEach(function (btn) {
    btn.addEventListener("click", function () {
      var target = btn.getAttribute("data-target");

      buttons.forEach(function (b) { b.classList.remove("is-active"); });
      btn.classList.add("is-active");

      sections.forEach(function (section) {
        section.classList.toggle("is-visible", section.id === target);
      });
    });
  });
})();
