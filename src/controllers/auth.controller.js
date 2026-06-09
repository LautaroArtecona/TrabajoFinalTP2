import { registerUserInDB, loginUserInDB } from "../services/auth.service.js";

export const register = async (req, res) => {
  try {
    const { name, email, password, rol } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "Faltan campos obligatorios." });
    }

    const newUser = await registerUserInDB({ name, email, password, rol });

    res.status(201).json({
      message: "Usuario registrado con éxito",
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        rol: newUser.rol,
      },
    });
  } catch (error) {
    if (error.message === "Ya existe un usuario con ese email.") {
      return res.status(400).json({ message: error.message });
    }
    res.status(500).json({ message: "Error al registrar el usuario", error: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Faltan campos obligatorios." });
    }

    const { token, user } = await loginUserInDB({ email, password });

    res.status(200).json({
      message: "Login exitoso",
      token,
      user,
    });
  } catch (error) {
    if (error.message === "Credenciales inválidas.") {
      return res.status(401).json({ message: error.message });
    }
    res.status(500).json({ message: "Error al iniciar sesión", error: error.message });
  }
};
