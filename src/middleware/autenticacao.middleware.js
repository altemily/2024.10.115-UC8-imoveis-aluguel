const jwt = require("jsonwebtoken");

class AutenticacaoMiddleware {
  static autenticarToken(req, res, next) {
    let token = null;

    // Token no header no formato Bearer <token>
    const authHeader = req.headers["authorization"];
    if (authHeader) {
      const parts = authHeader.split(" ");
      if (parts.length === 2 && parts[0] === "Bearer") {
        token = parts[1];
      }
    }

    if (!token) {
      return res.status(401).json({ msg: "Token de acesso não fornecido." });
    }

    jwt.verify(token, process.env.SECRET_KEY, (err, usuario) => {
      if (err) {
        // Diferencia erro de expiração de token
        if (err.name === "TokenExpiredError") {
          return res.status(401).json({ msg: "Token expirado. Faça login novamente." });
        }
        return res.status(403).json({ msg: "Token inválido." });
      }

      req.usuario = usuario;
      next();
    });
  }
}

module.exports = AutenticacaoMiddleware;