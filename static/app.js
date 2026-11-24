
const API_URL = "";

let productos = [];

async function cargarProductos() {
    const contenedor = document.getElementById("productos-container");

    contenedor.textContent = "Cargando productos...";

    try {
        const respuesta = await fetch(`${API_URL}/productos/`);

        if (!respuesta.ok) {
            throw new Error("No se pudieron consultar los productos.");
        }

        productos = await respuesta.json();

        mostrarProductos(productos);

    } catch (error) {
        contenedor.textContent =
            "No fue posible cargar los productos. Verifica que el servidor esté funcionando.";
        console.error(error);
    }
}


async function actualizarProductosChat() {
    try {
        const respuesta = await fetch(`${API_URL}/productos/`);

        if (!respuesta.ok) {
            throw new Error("No se pudieron actualizar los productos.");
        }

        productos = await respuesta.json();

        return true;

    } catch (error) {
        console.error("Error al actualizar productos del chat:", error);
        return false;
    }
}


function mostrarProductos(lista) {
    const contenedor = document.getElementById("productos-container");

    contenedor.replaceChildren();

    if (lista.length === 0) {
        contenedor.textContent = "No hay productos disponibles.";
        return;
    }

    lista.forEach(producto => {
        const tarjeta = document.createElement("article");
        tarjeta.className = "product-card";

        const imagen = document.createElement("div");
        imagen.className = "product-image";
        imagen.textContent = "🛍️";

        const informacion = document.createElement("div");
        informacion.className = "product-info";

        const nombre = document.createElement("h3");
        nombre.textContent = producto.nombre;

        const precio = document.createElement("p");
        precio.className = "product-price";
        precio.textContent = Number(producto.precio).toLocaleString(
            "es-MX",
            { style: "currency", currency: "MXN" }
        );

        const stock = document.createElement("p");
        stock.className = "product-stock";

        if (producto.stock <= 0) {
            stock.textContent = "Sin existencias";
            stock.classList.add("out");
        } else if (producto.stock <= 5) {
            stock.textContent = `¡Últimas unidades! Stock: ${producto.stock}`;
            stock.classList.add("low");
        } else {
            stock.textContent = `Disponibles: ${producto.stock}`;
        }

        const boton = document.createElement("button");
        boton.textContent = "Ver detalles";

        boton.addEventListener("click", () => {
            alert(
                `Producto: ${producto.nombre}\n` +
                `Precio: $${producto.precio}\n` +
                `Existencias: ${producto.stock}\n` +
                `ID: ${producto.id}`
            );
        });

        informacion.append(nombre, precio, stock, boton);
        tarjeta.append(imagen, informacion);
        contenedor.appendChild(tarjeta);
    });
}

function buscarProductos() {
    const texto = document
        .getElementById("buscador")
        .value
        .trim()
        .toLowerCase();

    const resultados = productos.filter(producto =>
        producto.nombre.toLowerCase().includes(texto)
    );

    mostrarProductos(resultados);
}

document.getElementById("buscador").addEventListener("input", buscarProductos);



function alternarChat() {
    document
        .getElementById("chat-window")
        .classList.toggle("active");
}


function agregarMensaje(texto, tipo) {
    const mensajes = document.getElementById("chat-messages");

    const mensaje = document.createElement("div");
    mensaje.className = tipo === "usuario"
        ? "user-message"
        : "bot-message";

    mensaje.textContent = texto;

    mensajes.appendChild(mensaje);
    mensajes.scrollTop = mensajes.scrollHeight;
}


function responderChat(texto) {
    const mensaje = texto.toLowerCase().trim();

    if (
        mensaje.includes("hola") ||
        mensaje.includes("buenas") ||
        mensaje.includes("buenos días") ||
        mensaje.includes("buenas tardes")
    ) {
        return "¡Hola! 💜 Bienvenido a NovaStore. Estoy aquí para ayudarte a encontrar productos y consultar sus precios y existencias.";
    }

    if (
        mensaje.includes("ayuda") ||
        mensaje.includes("qué puedes hacer") ||
        mensaje.includes("que puedes hacer")
    ) {
        return "¡Claro! 😊 Puedo ayudarte a:\n• Mostrar los productos disponibles.\n• Consultar precios.\n• Revisar existencias.\n• Buscar un producto por su nombre.\n\n¿Qué te gustaría consultar?";
    }

    if (
        mensaje.includes("cuántos productos") ||
        mensaje.includes("cuantos productos")
    ) {
        return `Tenemos ${productos.length} productos registrados en NovaStore. 🛍️`;
    }

    if (
        mensaje.includes("listar") ||
        mensaje.includes("mostrar productos") ||
        mensaje.includes("qué productos") ||
        mensaje.includes("que productos") ||
        mensaje.includes("catálogo") ||
        mensaje.includes("catalogo")
    ) {
        if (productos.length === 0) {
            return "Por el momento no tenemos productos registrados.";
        }

        return "Estos son nuestros productos:\n\n" +
            productos.map(p =>
                `• ${p.nombre}\n  Precio: $${p.precio} MXN\n  Existencias: ${p.stock}`
            ).join("\n\n");
    }

    const producto = productos.find(p =>
        mensaje.includes(p.nombre.toLowerCase())
    );

    if (
        mensaje.includes("precio") ||
        mensaje.includes("cuesta") ||
        mensaje.includes("vale")
    ) {
        if (producto) {
            return `El producto ${producto.nombre} tiene un precio de $${producto.precio} MXN. 💜`;
        }

        return "¿Qué producto deseas consultar? Escríbeme su nombre para revisar el precio.";
    }

    if (
        mensaje.includes("stock") ||
        mensaje.includes("existencias") ||
        mensaje.includes("disponible") ||
        mensaje.includes("hay unidades")
    ) {
        if (producto) {
            if (producto.stock > 0) {
                return `¡Sí tenemos! 😊 Hay ${producto.stock} unidades de ${producto.nombre} disponibles.`;
            }

            return `Lo sentimos, ${producto.nombre} está agotado por el momento.`;
        }

        return "Escríbeme el nombre del producto para consultar sus existencias.";
    }

    if (producto) {
        return `¡Encontré ${producto.nombre}! 🛍️\n\nPrecio: $${producto.precio} MXN\nExistencias: ${producto.stock}\n\n¿Te gustaría conocer algo más sobre este producto?`;
    }

    return "No logré identificar tu consulta. 😊 Puedes preguntarme por nuestros productos, precios, existencias o escribir el nombre de un artículo.";
}

document.getElementById("chat-form").addEventListener("submit", async function(event) {
    event.preventDefault();

    const entrada = document.getElementById("chat-text");
    const texto = entrada.value.trim();

    if (!texto) return;

    agregarMensaje(texto, "usuario");

    entrada.value = "";

    agregarMensaje("Consultando nuestra tienda... 💜", "bot");

    const actualizado = await actualizarProductosChat();

    let respuesta;

    if (actualizado) {
        respuesta = responderChat(texto);
    } else {
        respuesta = "Lo siento, no pude consultar los productos en este momento. Verifica que el servidor esté funcionando e inténtalo nuevamente.";
    }

    const mensajes = document.getElementById("chat-messages");
    mensajes.removeChild(mensajes.lastElementChild);

    agregarMensaje(respuesta, "bot");
});


const configuracion = {
    productos: {
        titulo: "Productos",
        ruta: "/productos/",
        campos: [
            { nombre: "nombre", etiqueta: "Nombre", tipo: "text" },
            { nombre: "precio", etiqueta: "Precio", tipo: "number" },
            { nombre: "stock", etiqueta: "Existencias", tipo: "number" },
            { nombre: "categoria_id", etiqueta: "ID de categoría", tipo: "number" },
            { nombre: "proveedor_id", etiqueta: "ID de proveedor", tipo: "number" }
        ]
    },

    categorias: {
        titulo: "Categorías",
        ruta: "/categorias/",
        campos: [
            { nombre: "nombre", etiqueta: "Nombre", tipo: "text" },
            { nombre: "descripcion", etiqueta: "Descripción", tipo: "text" }
        ]
    },

    proveedores: {
        titulo: "Proveedores",
        ruta: "/proveedores/",
        campos: [
            { nombre: "nombre", etiqueta: "Nombre", tipo: "text" },
            { nombre: "telefono", etiqueta: "Teléfono", tipo: "text" },
            { nombre: "correo", etiqueta: "Correo", tipo: "email" },
            { nombre: "direccion", etiqueta: "Dirección", tipo: "text" }
        ]
    },

    clientes: {
        titulo: "Clientes",
        ruta: "/clientes/",
        campos: [
            { nombre: "nombre", etiqueta: "Nombre", tipo: "text" },
            { nombre: "telefono", etiqueta: "Teléfono", tipo: "text" },
            { nombre: "correo", etiqueta: "Correo", tipo: "email" }
        ]
    }
};

let seccionActual = "";
let registroEditando = null;


function mostrarAdmin() {
    document.getElementById("administracion").scrollIntoView({
        behavior: "smooth"
    });
}


async function mostrarSeccion(seccion) {
    seccionActual = seccion;
    registroEditando = null;

    const contenido = document.getElementById("admin-contenido");

    contenido.innerHTML = `
        <h3>Administrar ${configuracion[seccion].titulo}</h3>
        <p>Registra, consulta, modifica y elimina información.</p>
        <div id="formulario-crud"></div>
        <div id="tabla-crud">Cargando registros...</div>
    `;

    mostrarFormulario();
    await cargarRegistros();
}


function mostrarFormulario(datos = null) {
    const config = configuracion[seccionActual];

    const formulario = document.getElementById("formulario-crud");

    formulario.replaceChildren();

    const titulo = document.createElement("h4");
    titulo.textContent = datos ? "Editar registro" : "Registrar nuevo registro";
    formulario.appendChild(titulo);

    const form = document.createElement("form");
    form.className = "crud-form";

    config.campos.forEach(campo => {
        const grupo = document.createElement("div");
        grupo.className = "form-group";

        const label = document.createElement("label");
        label.textContent = campo.etiqueta;

        const input = document.createElement("input");
        input.type = campo.tipo;
        input.name = campo.nombre;
        input.required = true;

        if (campo.tipo === "number") {
            input.min = "0";
            if (campo.nombre === "precio") {
                input.step = "0.01";
            } else {
                input.step = "1";
            }
        }

        if (datos) {
            input.value = datos[campo.nombre] ?? "";
        }

        grupo.append(label, input);
        form.appendChild(grupo);
    });

    const boton = document.createElement("button");
    boton.type = "submit";
    boton.textContent = datos ? "Guardar cambios" : "Registrar";

    const acciones = document.createElement("div");
    acciones.className = "form-actions";
    acciones.appendChild(boton);

    if (datos) {
        const cancelar = document.createElement("button");
        cancelar.type = "button";
        cancelar.textContent = "Cancelar";
        cancelar.className = "cancel-button";

        cancelar.addEventListener("click", () => {
            registroEditando = null;
            mostrarFormulario();
        });

        acciones.appendChild(cancelar);
    }

    form.appendChild(acciones);

    form.addEventListener("submit", async event => {
        event.preventDefault();

        const datosFormulario = {};

        config.campos.forEach(campo => {
            const valor = form.elements[campo.nombre].value.trim();

            datosFormulario[campo.nombre] =
                campo.tipo === "number" ? Number(valor) : valor;
        });

        await guardarRegistro(datosFormulario);
    });

    formulario.appendChild(form);
}


async function cargarRegistros() {
    const config = configuracion[seccionActual];
    const contenedor = document.getElementById("tabla-crud");

    try {
        const respuesta = await fetch(config.ruta);

        if (!respuesta.ok) {
            throw new Error("No fue posible consultar los registros.");
        }

        const registros = await respuesta.json();

        contenedor.replaceChildren();

        if (registros.length === 0) {
            contenedor.textContent = "Todavía no hay registros.";
            return;
        }

        const tabla = document.createElement("table");
        tabla.className = "crud-table";

        const encabezado = document.createElement("thead");
        const filaEncabezado = document.createElement("tr");

        ["ID", ...config.campos.map(c => c.etiqueta), "Acciones"]
            .forEach(texto => {
                const th = document.createElement("th");
                th.textContent = texto;
                filaEncabezado.appendChild(th);
            });

        encabezado.appendChild(filaEncabezado);
        tabla.appendChild(encabezado);

        const cuerpo = document.createElement("tbody");

        registros.forEach(registro => {
            const fila = document.createElement("tr");

            const celdaId = document.createElement("td");
            celdaId.textContent = registro.id;
            fila.appendChild(celdaId);

            config.campos.forEach(campo => {
                const celda = document.createElement("td");
                celda.textContent = registro[campo.nombre] ?? "";
                fila.appendChild(celda);
            });

            const acciones = document.createElement("td");

            const editar = document.createElement("button");
            editar.textContent = "Editar";
            editar.className = "action-button edit-button";

            editar.addEventListener("click", () => {
                registroEditando = registro.id;
                mostrarFormulario(registro);
            });

            const eliminar = document.createElement("button");
            eliminar.textContent = "Eliminar";
            eliminar.className = "action-button delete-button";

            eliminar.addEventListener("click", () => {
                eliminarRegistro(registro.id);
            });

            acciones.append(editar, eliminar);
            fila.appendChild(acciones);

            cuerpo.appendChild(fila);
        });

        tabla.appendChild(cuerpo);

        const envoltura = document.createElement("div");
        envoltura.className = "table-container";
        envoltura.appendChild(tabla);

        contenedor.appendChild(envoltura);

    } catch (error) {
        contenedor.textContent = error.message;
        console.error(error);
    }
}


async function guardarRegistro(datos) {
    const config = configuracion[seccionActual];

    const editando = registroEditando !== null;

    const url = editando
        ? `${config.ruta}${registroEditando}`
        : config.ruta;

    try {
        const respuesta = await fetch(url, {
            method: editando ? "PUT" : "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(datos)
        });

        const resultado = await respuesta.json();

        if (!respuesta.ok) {
            throw new Error(
                resultado.detail || "No se pudo guardar el registro."
            );
        }

        alert(editando
            ? "Registro actualizado correctamente."
            : "Registro creado correctamente."
        );

        registroEditando = null;
        mostrarFormulario();

        await cargarRegistros();

        if (seccionActual === "productos") {
            await cargarProductos();
        }

    } catch (error) {
        alert("Error: " + error.message);
    }
}


async function eliminarRegistro(id) {
    const confirmar = confirm(
        "¿Estás seguro de que deseas eliminar este registro?"
    );

    if (!confirmar) return;

    const config = configuracion[seccionActual];

    try {
        const respuesta = await fetch(`${config.ruta}${id}`, {
            method: "DELETE"
        });

        const resultado = await respuesta.json();

        if (!respuesta.ok) {
            throw new Error(
                resultado.detail || "No se pudo eliminar el registro."
            );
        }

        alert("Registro eliminado correctamente.");

        await cargarRegistros();

        if (seccionActual === "productos") {
            await cargarProductos();
        }

    } catch (error) {
        alert("Error: " + error.message);
    }
}
