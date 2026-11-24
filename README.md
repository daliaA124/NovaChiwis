# NovaChiwis – Sistema de Gestión de Tienda

## Descripción del proyecto

NovaChiwis es un sistema web desarrollado para administrar la información de una tienda. Permite gestionar categorías, productos, proveedores y clientes mediante operaciones CRUD (Crear, Consultar, Actualizar y Eliminar).

El sistema utiliza FastAPI para desarrollar el backend y SQLite como sistema de gestión de base de datos.

## Tecnologías utilizadas

- Python
- FastAPI
- SQLite
- SQLAlchemy
- Pydantic
- HTML
- CSS
- JavaScript

## Estructura del proyecto

```text
Tienda/
├── routers/
│   ├── categorias.py
│   ├── proveedores.py
│   ├── productos.py
│   └── clientes.py
├── static/
│   ├── index.html
│   ├── styles.css
│   └── app.js
├── main.py
├── database.py
├── models.py
├── schemas.py
├── crud.py
├── requirements.txt
└── README.md
```

## Instalación y configuración

1. Instalar Python en el equipo.
2. Abrir una terminal en la carpeta del proyecto.
3. Crear un entorno virtual:

```bash
python -m venv .venv
```

4. Activar el entorno virtual en Windows:

```powershell
.venv\Scripts\activate
```

5. Instalar las dependencias:

```bash
pip install -r requirements.txt
```

## Ejecución del proyecto

Ejecutar el siguiente comando:

```bash
python -m uvicorn main:app --reload
```

Abrir el navegador y acceder a:

- Sistema web: http://127.0.0.1:8000/
- Documentación de la API: http://127.0.0.1:8000/docs

La base de datos SQLite se configura mediante `database.py` y las tablas se crean automáticamente al iniciar la aplicación.

## Módulos del sistema

- **Categorías:** administración de las categorías de los productos.
- **Productos:** registro y administración de productos, precios, existencias y relaciones con categorías y proveedores.
- **Proveedores:** administración de los datos de los proveedores.
- **Clientes:** registro y administración de la información de los clientes.

Cada módulo cuenta con operaciones CRUD mediante endpoints de FastAPI.

## Autor

Proyecto académico desarrollado como práctica de backend con FastAPI.# NovaChiwis
