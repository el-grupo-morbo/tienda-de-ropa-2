import psycopg
import os

DATABASE_PASSWORD = os.getenv("DATABASE_PASSWORD")

dns = f"postgresql://postgres.dncdqfmfixojxprdlbkf:{DATABASE_PASSWORD}@aws-0-us-west-2.pooler.supabase.com:5432/postgres"

conexion = psycopg.connect(dns)
cursor = conexion.cursor()


# CREAR CLIENTE
def crearCliente(nombre, apellido, gmail, contraseña):

    cursor.execute("""
        INSERT INTO clientes (nombre, apellido, gmail, contraseña)
        VALUES (%s, %s, %s, %s)
        RETURNING id
    """, (nombre, apellido, gmail, contraseña))

    nuevo_id = cursor.fetchone()[0]

    conexion.commit()

    return {
        "Mensaje": "Se ha registrado un nuevo cliente",
        "id": nuevo_id
    }


# VER TODOS LOS CLIENTES
def verClientes():

    cursor.execute("SELECT * FROM clientes")

    respuesta = cursor.fetchall()

    clientes = []

    for cliente in respuesta:

        dicConvertido = {
            "id": cliente[0],
            "nombre": cliente[1],
            "apellido": cliente[2],
            "gmail": cliente[3],
        
        }

        clientes.append(dicConvertido)

    return clientes


# BUSCAR CLIENTE POR ID
def verClienteId(id):

    cursor.execute(
        "SELECT * FROM clientes WHERE id = %s",
        (id,)
    )

    respuesta = cursor.fetchone()

    if respuesta is None:
        return {"Mensaje": "No se encontró el cliente"}

    dicConvertido = {
        "id": respuesta[0],
        "nombre": respuesta[1],
        "apellido": respuesta[2],
        "gmail": respuesta[3],
        
    }

    return dicConvertido


# MODIFICAR CLIENTE
def modificarCliente(id, nombre, apellido, gmail, contraseña):

    cursor.execute("""
        UPDATE clientes
        SET
            nombre = %s,
            apellido = %s,
            gmail = %s,
            contraseña = %s
        WHERE id = %s
        RETURNING id
    """, (nombre, apellido, gmail, contraseña, id))

    respuesta = cursor.fetchone()

    conexion.commit()

    if respuesta is None:
        return {"Mensaje": "No se encontró el cliente"}

    return {"Mensaje": "Cliente modificado correctamente"}


# ELIMINAR CLIENTE
def eliminarCliente(id):

    cursor.execute(
        "DELETE FROM clientes WHERE id = %s RETURNING id",
        (id,)
    )

    respuesta = cursor.fetchone()

    conexion.commit()

    if respuesta is None:
        return {"Mensaje": "No se encontró el cliente"}

    return {"Mensaje": "Cliente eliminado correctamente"}