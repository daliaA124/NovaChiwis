
from sqlalchemy.orm import Session
import models
import schemas

def crear_categoria(db: Session, datos: schemas.CategoriaCreate):
    nueva = models.Categoria(**datos.model_dump())
    db.add(nueva)
    db.commit()
    db.refresh(nueva)
    return nueva


def obtener_categorias(db: Session):
    return db.query(models.Categoria).all()


def obtener_categoria(db: Session, categoria_id: int):
    return db.query(models.Categoria).filter(
        models.Categoria.id == categoria_id
    ).first()


def actualizar_categoria(db: Session, categoria_id: int, datos: schemas.CategoriaUpdate):
    categoria = obtener_categoria(db, categoria_id)
    if categoria:
        for campo, valor in datos.model_dump(exclude_unset=True).items():
            setattr(categoria, campo, valor)
        db.commit()
        db.refresh(categoria)
    return categoria


def eliminar_categoria(db: Session, categoria_id: int):
    categoria = obtener_categoria(db, categoria_id)
    if categoria:
        db.delete(categoria)
        db.commit()
    return categoria

def crear_proveedor(db: Session, datos: schemas.ProveedorCreate):
    nuevo = models.Proveedor(**datos.model_dump())
    db.add(nuevo)
    db.commit()
    db.refresh(nuevo)
    return nuevo


def obtener_proveedores(db: Session):
    return db.query(models.Proveedor).all()


def obtener_proveedor(db: Session, proveedor_id: int):
    return db.query(models.Proveedor).filter(
        models.Proveedor.id == proveedor_id
    ).first()


def actualizar_proveedor(db: Session, proveedor_id: int, datos: schemas.ProveedorUpdate):
    proveedor = obtener_proveedor(db, proveedor_id)
    if proveedor:
        for campo, valor in datos.model_dump(exclude_unset=True).items():
            setattr(proveedor, campo, valor)
        db.commit()
        db.refresh(proveedor)
    return proveedor


def eliminar_proveedor(db: Session, proveedor_id: int):
    proveedor = obtener_proveedor(db, proveedor_id)
    if proveedor:
        db.delete(proveedor)
        db.commit()
    return proveedor


def crear_producto(db: Session, datos: schemas.ProductoCreate):
    nuevo = models.Producto(**datos.model_dump())
    db.add(nuevo)
    db.commit()
    db.refresh(nuevo)
    return nuevo


def obtener_productos(db: Session):
    return db.query(models.Producto).all()


def obtener_producto(db: Session, producto_id: int):
    return db.query(models.Producto).filter(
        models.Producto.id == producto_id
    ).first()


def actualizar_producto(db: Session, producto_id: int, datos: schemas.ProductoUpdate):
    producto = obtener_producto(db, producto_id)
    if producto:
        for campo, valor in datos.model_dump(exclude_unset=True).items():
            setattr(producto, campo, valor)
        db.commit()
        db.refresh(producto)
    return producto


def eliminar_producto(db: Session, producto_id: int):
    producto = obtener_producto(db, producto_id)
    if producto:
        db.delete(producto)
        db.commit()
    return producto


def crear_cliente(db: Session, datos: schemas.ClienteCreate):
    nuevo = models.Cliente(**datos.model_dump())
    db.add(nuevo)
    db.commit()
    db.refresh(nuevo)
    return nuevo


def obtener_clientes(db: Session):
    return db.query(models.Cliente).all()


def obtener_cliente(db: Session, cliente_id: int):
    return db.query(models.Cliente).filter(
        models.Cliente.id == cliente_id
    ).first()


def actualizar_cliente(db: Session, cliente_id: int, datos: schemas.ClienteUpdate):
    cliente = obtener_cliente(db, cliente_id)
    if cliente:
        for campo, valor in datos.model_dump(exclude_unset=True).items():
            setattr(cliente, campo, valor)
        db.commit()
        db.refresh(cliente)
    return cliente


def eliminar_cliente(db: Session, cliente_id: int):
    cliente = obtener_cliente(db, cliente_id)
    if cliente:
        db.delete(cliente)
        db.commit()
    return cliente

