
from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse

from database import engine, Base
import models

from routers import categorias, proveedores, productos, clientes


app = FastAPI(
    title="Sistema de Gestión de Tienda",
    description="API para administrar categorías, productos, proveedores y clientes",
    version="1.0.0"
)

Base.metadata.create_all(bind=engine)

app.mount("/static", StaticFiles(directory="static"), name="static")

app.include_router(categorias.router)
app.include_router(proveedores.router)
app.include_router(productos.router)
app.include_router(clientes.router)


@app.get("/")
def inicio():
    return FileResponse("static/index.html")
