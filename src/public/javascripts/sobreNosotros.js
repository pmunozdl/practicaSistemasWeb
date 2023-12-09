$("#botonInicioInvitado").on("click", function(e) {
    $(".grupo").attr("action", "/sobreNosotros");
});

$("#botonRegistro").on("click", function(e) {
    $(".grupo").attr("action", "/login");
});