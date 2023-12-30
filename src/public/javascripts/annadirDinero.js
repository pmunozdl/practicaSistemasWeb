const { models } = require('../sequelize');
const { Sequelize, Model } = require('sequelize'); //cargo la librería sequelize


// form.addEventListener('submit', (event) => {
//     if(!annadirDinero()){
//         event.preventDefault();
//     }
// });

// form.addEventListener('submit', (event) => {
//     if(!sacarDinero()){
//         event.preventDefault();
//     }
// });

function introducirCantidad() {
    var x = document.getElementById("introducirCantidad");
    if (x.style.display === 'none') {
        x.style.display = 'block';
    } else {
        x.style.display = 'none';
    }
    }
function introducirCantidadS() {
        var y = document.getElementById("introducirCantidadS");
        if (y.style.display === 'none') {
            y.style.display = 'block';
        } else {
            y.style.display = 'none';
        }
    }     
// function annadirDinero() {
//     let cantidad = document.getElementById("cantidad").value;

//     if(password.length < 8 || (confirmPassword.length < 8)){
//         //document.getElementById("form").append('<div class="alert alert-danger" role="alert">Password must be 8 characters or more! Please change password</div>');
//         document.getElementById('Error').innerHTML = '<div class="alert alert-danger" role="alert">Password must be 8 characters or more! Please change password</div>';
//         return false;
//         //alert("Password must be 8 characters or more! Please change password");
//     } else {
        
//         if (password == confirmPassword) {
//             document.getElementById('Error').innerHTML = "<h3>La contrasena es valida</h3>"
//             return true;
            
//             //alert("Valid");
//         } else {
//             document.getElementById('Error').innerHTML = "<h3>No coinciden las contraseñas.</h3>"
//             return false;
//         }

//     }  
// }


// function sacarDinero() {
//     let password = document.getElementById("password").value;
//     let confirmPassword = document.getElementById("password1").value;

//     if(password.length < 8 || (confirmPassword.length < 8)){
//         //document.getElementById("form").append('<div class="alert alert-danger" role="alert">Password must be 8 characters or more! Please change password</div>');
//         document.getElementById('Error').innerHTML = '<div class="alert alert-danger" role="alert">Password must be 8 characters or more! Please change password</div>';
//         return false;
//         //alert("Password must be 8 characters or more! Please change password");
//     } else {
        
//         if (password == confirmPassword) {
//             document.getElementById('Error').innerHTML = "<h3>La contrasena es valida</h3>"
//             return true;
            
//             //alert("Valid");
//         } else {
//             document.getElementById('Error').innerHTML = "<h3>No coinciden las contraseñas.</h3>"
//             return false;
//         }

//     }  
// }