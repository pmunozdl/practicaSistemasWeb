# practicaSistemasWeb


práctica realizada por Pablo Muñoz


El proyecto consiste en una aplicación bancaria. En la aplicación se podrán hacer actividades como ingresar y sacar dinero, realizar transacciones bancarias y convertir dinero entre distintas divisas. 
Dentro de la aplicación podrá haber tres tipos de usuarios:
    - Invitados: Acceden a una parte limitada de la aplicación. No requiere registro.
    - Usuarios registrados: Tienen acceso completo a la parte de usuarios de la aplicación. Pueden realizar al completo las operaciones citadas previamente.
    -Administrador: Solo un usuario, creado por defecto. No es un usuario convencional, y tiene acceso a un apartado restringido de la aplicación donde puede supervisar las transacciones realizadas y los usuarios que la componen. 
Para realizar este proyecto se ha empleado el framework de javascript node.js, en combinación con express. En cuanto a base de datos, se ha elegido un modelo relacional en sqlite mediante sequelize. 

Para desplegar la aplicación, debemos ejecutar el siguiente comando: 
```
npm start 
```

Con él se cargará la aplicación y la base de datos. Se crean dos usuarios, uno de ellos administrador, por defecto. Todo aquel usuario que sea registrado en la aplicación también se almacenará, con el rol de usuario. No se permitirá añadir nuevos usuarios con el rol administrador.

Así mismo, todas las transacciones que se realicen serán almacenadas, indicando el tipo de la misma. 