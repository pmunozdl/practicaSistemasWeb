// $("#botonAcerca").on("click", function(e) {
//     $(".grupo").attr("action", "/sobreNosotros");
// });

// $("#botonRegistro").on("click", function(e) {
//     $(".grupo").attr("action", "/login");
// });

$("#botonAcerca").on("click", function(e,res) {
    res.redirect("sobreNosotros");
});
