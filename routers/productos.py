
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
import crud
import schemas
from database import get_db

router = APIRouter(prefix="/productos", tags=["Productos"])


@router.post("/", response_model=schemas.ProductoResponse)
def crear(datos: schemas.ProductoCreate, db: Session = Depends(get_db)):
    return crud.crear_producto(db, datos)


@router.get("/", response_model=list[schemas.ProductoResponse])
def listar(db: Session = Depends(get_db)):
    return crud.obtener_productos(db)


@router.get("/{producto_id}", response_model=schemas.ProductoResponse)
def consultar(producto_id: int, db: Session = Depends(get_db)):
    producto = crud.obtener_producto(db, producto_id)
    if not producto:
        raise HTTPException(status_code=404, detail="Producto no encontrado")
    return producto


@router.put("/{producto_id}", response_model=schemas.ProductoResponse)
def actualizar(producto_id: int, datos: schemas.ProductoUpdate, db: Session = Depends(get_db)):
    producto = crud.actualizar_producto(db, producto_id, datos)
    if not producto:
        raise HTTPException(status_code=404, detail="Producto no encontrado")
    return producto


@router.delete("/{producto_id}")
def eliminar(producto_id: int, db: Session = Depends(get_db)):
    producto = crud.eliminar_producto(db, producto_id)
    if not producto:
        raise HTTPException(status_code=404, detail="Producto no encontrado")
    return {"mensaje": "Producto eliminado correctamente"}

