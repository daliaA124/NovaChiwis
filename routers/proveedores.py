
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
import crud
import schemas
from database import get_db

router = APIRouter(prefix="/proveedores", tags=["Proveedores"])


@router.post("/", response_model=schemas.ProveedorResponse)
def crear(datos: schemas.ProveedorCreate, db: Session = Depends(get_db)):
    return crud.crear_proveedor(db, datos)


@router.get("/", response_model=list[schemas.ProveedorResponse])
def listar(db: Session = Depends(get_db)):
    return crud.obtener_proveedores(db)


@router.get("/{proveedor_id}", response_model=schemas.ProveedorResponse)
def consultar(proveedor_id: int, db: Session = Depends(get_db)):
    proveedor = crud.obtener_proveedor(db, proveedor_id)
    if not proveedor:
        raise HTTPException(status_code=404, detail="Proveedor no encontrado")
    return proveedor


@router.put("/{proveedor_id}", response_model=schemas.ProveedorResponse)
def actualizar(proveedor_id: int, datos: schemas.ProveedorUpdate, db: Session = Depends(get_db)):
    proveedor = crud.actualizar_proveedor(db, proveedor_id, datos)
    if not proveedor:
        raise HTTPException(status_code=404, detail="Proveedor no encontrado")
    return proveedor


@router.delete("/{proveedor_id}")
def eliminar(proveedor_id: int, db: Session = Depends(get_db)):
    proveedor = crud.eliminar_proveedor(db, proveedor_id)
    if not proveedor:
        raise HTTPException(status_code=404, detail="Proveedor no encontrado")
    return {"mensaje": "Proveedor eliminado correctamente"}

