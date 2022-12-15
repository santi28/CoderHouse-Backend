import ClientSQL from "./sql.js";
import { options } from "./options/mariaDB.js";

const client = new ClientSQL(options);

(async () => {
  const tabla = await client.crearTabla();
  console.log(`Tabla creada con éxito`);

  const articulos = [
    { nombre: "Leche", codigo: "AB-12", precio: 207.6, stock: 24 },
    { nombre: "Harina", codigo: "CD-34", precio: 120.8, stock: 45 },
    { nombre: "DDL", codigo: "EF-56", precio: 320, stock: 16 },
    { nombre: "Huevos", codigo: "FG-44", precio: 70, stock: 34 },
    { nombre: "Chocolate", codigo: "CR-77", precio: 670.9, stock: 44 },
  ];

  const insercion = await client.insertarArticulos(articulos);
  console.log(`Artículos insertados con éxito`);

  const listado = await client.listarArticulos();
  console.log(`Listado de artículos:`);
  console.table(listado);

  // Actualizamos el stock de un articulos
  const stock = await client.actualizarStockPorId(0, 2);
  console.log(`Stock actualizado con éxito`);

  // Borramos un articulo
  const borrado = await client.borrarArticuloPorId(1);
  console.log(`Artículo borrado con éxito`);

  // Listamos los articulos
  const listado2 = await client.listarArticulos();
  console.log(`Listado de artículos:`);
  console.table(listado2);

  client.close();
})();