
import psycopg
from psycopg.types.json import Jsonb
import os

DATABASE_PASSWORD = os.getenv("DATABASE_PASSWORD")

dns = f"postgresql://postgres.dncdqfmfixojxprdlbkf:{DATABASE_PASSWORD}@aws-0-us-west-2.pooler.supabase.com:5432/postgres"

conexion = psycopg.connect(dns)
cursor = conexion.cursor()


# crea
def crearProducto(nombre, descripcion, precio, moneda, categoria,
                  imagen, imagenes, talles, colores, stock, destacado):

    cursor.execute("""
        INSERT INTO productos (
            nombre, descripcion, precio, moneda, categoria,
            imagen, imagenes, talles, colores, stock, destacado
        )
        VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
        RETURNING id
    """, (
        nombre,
        descripcion,
        precio,
        moneda,
        categoria,
        imagen,
        Jsonb(imagenes),
        Jsonb(talles),
        Jsonb(colores),
        stock,
        destacado
    ))

    nuevo_id = cursor.fetchone()[0]

    conexion.commit()

    return {
        "Mensaje": "Se ha creado un nuevo producto",
        "id": nuevo_id
    }


# ve pero todos los productos
def verProductos():

    cursor.execute("SELECT * FROM productos")

    respuesta = cursor.fetchall()

    productos = []

    for producto in respuesta:

        dicConvertido = {
            "id": producto[0],
            "nombre": producto[1],
            "descripcion": producto[2],
            "precio": float(producto[3]),
            "moneda": producto[4],
            "categoria": producto[5],
            "imagen": producto[6],
            "imagenes": producto[7],
            "talles": producto[8],
            "colores": producto[9],
            "stock": producto[10],
            "destacado": producto[11]
        }

        productos.append(dicConvertido)

    return productos


# busca producto especifico por id
def verProductoId(id):

    cursor.execute(
        "SELECT * FROM productos WHERE id = %s",
        (id,)
    )

    respuesta = cursor.fetchone()

    if respuesta is None:
        return {"Mensaje": "No se encontró el producto"}

    dicConvertido = {
        "id": respuesta[0],
        "nombre": respuesta[1],
        "descripcion": respuesta[2],
        "precio": float(respuesta[3]),
        "moneda": respuesta[4],
        "categoria": respuesta[5],
        "imagen": respuesta[6],
        "imagenes": respuesta[7],
        "talles": respuesta[8],
        "colores": respuesta[9],
        "stock": respuesta[10],
        "destacado": respuesta[11]
    }

    return dicConvertido


# mmodifica
def modificarProducto(id, nombre, descripcion, precio, moneda,
                      categoria, imagen, imagenes, talles,
                      colores, stock, destacado):

    cursor.execute("""
        UPDATE productos
        SET
            nombre = %s,
            descripcion = %s,
            precio = %s,
            moneda = %s,
            categoria = %s,
            imagen = %s,
            imagenes = %s,
            talles = %s,
            colores = %s,
            stock = %s,
            destacado = %s
        WHERE id = %s
        RETURNING id
    """, (
        nombre,
        descripcion,
        precio,
        moneda,
        categoria,
        imagen,
        Jsonb(imagenes),
        Jsonb(talles),
        Jsonb(colores),
        stock,
        destacado,
        id
    ))

    respuesta = cursor.fetchone()

    conexion.commit()

    if respuesta is None:
        return {"Mensaje": "No se encontró el producto"}

    return {"Mensaje": "Producto modificado correctamente"}


# elimina producto
def eliminarProducto(id):

    cursor.execute(
        "DELETE FROM productos WHERE id = %s RETURNING id",
        (id,)
    )

    respuesta = cursor.fetchone()

    conexion.commit()

    if respuesta is None:
        return {"Mensaje": "No se encontró el producto"}

    return {"Mensaje": "Producto eliminado correctamente"}


    

