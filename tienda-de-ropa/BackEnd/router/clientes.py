@app.post("/register")
def register(user: User):
    """Registra un nuevo usuario. Devuelve error si ya existe."""
    ok = create_user(user.username, user.password)
    if ok:
        return {"msg": "Usuario creado"}
    return {"error": "Usuario ya existe"}

@app.post("/login")
def login(user: User):
    """Valida usuario y contraseña. Devuelve mensaje de éxito o error."""
    ok = check_user(user.username, user.password)
    if ok:
        return {"msg": "Login correcto", "username": user.username}
    return {"error": "Credenciales inválidas"}
