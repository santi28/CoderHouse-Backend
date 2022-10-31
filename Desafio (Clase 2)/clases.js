class Usuario {
  constructor (nombre, apellido) {
    /** @type {string} */
    this.nombre = nombre;

    /** @type {string} */
    this.apellido = apellido;
  
    /** @type {{nombre: string, autor: string}[]} */
    this.libros = [];

    /** @type {string[]} */
    this.mascotas = [];
  }

  getFullName() {
    return `${this.nombre} ${this.apellido}`
  }

  addMascota(nombre) {
    this.mascotas.push(nombre);
  }

  addBook(nombre, autor) {
    /** @type {{nombre: string, autor: string}} */
    const libro = { nombre, autor }
    this.libros.push(libro);
  }

  countMascotas() {
    return this.mascotas.length;
  }

  getBookNames() {
    return this.libros.map(libro => libro.nombre);
  }
}

const santiago = new Usuario('Santiago', 'de Nicolás')

// Añadido de libros
santiago.addBook('Aprendiendo Git', 'Miguel Angel Durán (MiduDev)')
santiago.addBook('Luna de Pluton', 'Dross Rotzank')

// Añadido de mascotas
santiago.addMascota('muni')

console.log(santiago.getFullName())
console.log(santiago.countMascotas())
console.log(santiago.getBookNames())