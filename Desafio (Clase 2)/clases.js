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
}