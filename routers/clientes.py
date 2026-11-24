
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
import crud
import schemas
from database import get_db

router = APIRouter(prefix="/clientes", tags=["Clientes"])


@router.post("/", response_model=schemas.ClienteResponse)
def crear(datos: schemas.ClienteCreate, db: Session = Depends(get_db)):
    return crud.crear_cliente(db, datos)


@router.get("/", response_model=list[schemas.ClienteResponse])
def listar(db: Session = Depends(get_db)):
    return crud.obtener_clientes(db)


@router.get("/{cliente_id}", response_model=schemas.ClienteResponse)
def consultar(cliente_id: int, db: Session = Depends(get_db)):
    cliente = crud.obtener_cliente(db, cliente_id)
    if not cliente:
        raise HTTPException(status_code=404, detail="Cliente no encontrado")
    return cliente


@router.put("/{cliente_id}", response_model=schemas.ClienteResponse)
def actualizar(cliente_id: int, datos: schemas.ClienteUpdate, db: Session = Depends(get_db)):
    cliente = crud.actualizar_cliente(db, cliente_id, datos)
    if not cliente:
        raise HTTPException(status_code=404, detail="Cliente no encontrado")
    return cliente


@router.delete("/{cliente_id}")
def eliminar(cliente_id: int, db: Session = Depends(get_db)):
    cliente = crud.eliminar_cliente(db, cliente_id)
    if not cliente:
        raise HTTPException(status_code=404, detail="Cliente no encontrado")
    return {"mensaje": "Cliente eliminado correctamente"}

