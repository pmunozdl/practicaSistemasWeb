function toggleDropdown(dropdownId) {
    var dropdown = document.getElementById(dropdownId);
    dropdown.style.display = (dropdown.style.display === "block") ? "none" : "block";
  }

  // Cierra el menú desplegable si el usuario hace clic fuera de él
  window.onclick = function(event) {
    if (!event.target.matches('.dropbtn')) {
      var dropdowns = document.getElementsByClassName("dropdown-content");
      var i;
      for (i = 0; i < dropdowns.length; i++) {
        var openDropdown = dropdowns[i];
        if (openDropdown.style.display === "block") {
          openDropdown.style.display = "none";
        }
        }
    }
}