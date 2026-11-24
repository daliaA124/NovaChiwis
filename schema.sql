
CREATE TABLE categorias (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre VARCHAR NOT NULL,
    descripcion VARCHAR
);

CREATE TABLE proveedores (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre VARCHAR NOT NULL,
    telefono VARCHAR NOT NULL,
    correo VARCHAR NOT NULL,
    direccion VARCHAR NOT NULL
);

CREATE TABLE productos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre VARCHAR NOT NULL,
    precio FLOAT NOT NULL,
    stock INTEGER NOT NULL,
    categoria_id INTEGER,
    proveedor_id INTEGER,
    FOREIGN KEY (categoria_id) REFERENCES categorias(id),
    FOREIGN KEY (proveedor_id) REFERENCES proveedores(id)
);

CREATE TABLE clientes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre VARCHAR NOT NULL,
    telefono VARCHAR NOT NULL,
    correo VARCHAR NOT NULL
);
