
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
import crud
import schemas
from database import get_db

router = APIRouter(prefix="/categorias", tags=["Categorías"])


@router.post("/", response_model=schemas.CategoriaResponse)
def crear(datos: schemas.CategoriaCreate, db: Session = Depends(get_db)):
    return crud.crear_categoria(db, datos)


@router.get("/", response_model=list[schemas.CategoriaResponse])
def listar(db: Session = Depends(get_db)):
    return crud.obtener_categorias(db)


@router.get("/{categoria_id}", response_model=schemas.CategoriaResponse)
def consultar(categoria_id: int, db: Session = Depends(get_db)):
    categoria = crud.obtener_categoria(db, categoria_id)
    if not categoria:
        raise HTTPException(status_code=404, detail="Categoría no encontrada")
    return categoria


@router.put("/{categoria_id}", response_model=schemas.CategoriaResponse)
def actualizar(categoria_id: int, datos: schemas.CategoriaUpdate, db: Session = Depends(get_db)):
    categoria = crud.actualizar_categoria(db, categoria_id, datos)
    if not categoria:
        raise HTTPException(status_code=404, detail="Categoría no encontrada")
    return categoria


@router.delete("/{categoria_id}")
def eliminar(categoria_id: int, db: Session = Depends(get_db)):
    categoria = crud.eliminar_categoria(db, categoria_id)
    if not categoria:
        raise HTTPException(status_code=404, detail="Categoría no encontrada")
    return {"mensaje": "Categoría eliminada correctamente"}
