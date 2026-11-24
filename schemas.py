
from pydantic import BaseModel, ConfigDict
from typing import Optional


class CategoriaBase(BaseModel):
    nombre: str
    descripcion: Optional[str] = None

class CategoriaCreate(CategoriaBase):
    pass

class CategoriaUpdate(BaseModel):
    nombre: Optional[str] = None
    descripcion: Optional[str] = None

class CategoriaResponse(CategoriaBase):
    id: int
    model_config = ConfigDict(from_attributes=True)


class ProveedorBase(BaseModel):
    nombre: str
    telefono: str
    correo: str
    direccion: str

class ProveedorCreate(ProveedorBase):
    pass

class ProveedorUpdate(BaseModel):
    nombre: Optional[str] = None
    telefono: Optional[str] = None
    correo: Optional[str] = None
    direccion: Optional[str] = None

class ProveedorResponse(ProveedorBase):
    id: int
    model_config = ConfigDict(from_attributes=True)


class ProductoBase(BaseModel):
    nombre: str
    precio: float
    stock: int
    categoria_id: int
    proveedor_id: int

class ProductoCreate(ProductoBase):
    pass

class ProductoUpdate(BaseModel):
    nombre: Optional[str] = None
    precio: Optional[float] = None
    stock: Optional[int] = None
    categoria_id: Optional[int] = None
    proveedor_id: Optional[int] = None

class ProductoResponse(ProductoBase):
    id: int
    model_config = ConfigDict(from_attributes=True)


class ClienteBase(BaseModel):
    nombre: str
    telefono: str
    correo: str

class ClienteCreate(ClienteBase):
    pass

class ClienteUpdate(BaseModel):
    nombre: Optional[str] = None
    telefono: Optional[str] = None
    correo: Optional[str] = None

class ClienteResponse(ClienteBase):
    id: int
    model_config = ConfigDict(from_attributes=True)

