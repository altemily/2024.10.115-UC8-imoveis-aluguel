class AutorizacaoMiddleware {
  /**
   * @param {Array|string} rolesPermitidas ['usuario', 'proprietario']) ou string ('admin')
   */
  static permitirAcesso(rolesPermitidas = []) {
    // Suporte para string ou array, transforma em array sempre
    if (typeof rolesPermitidas === 'string') {
      rolesPermitidas = [rolesPermitidas];
    }

    return (req, res, next) => {
      const role = req.usuario?.role;

      if (!role) {
        return res.status(403).json({ msg: 'Role não encontrada no token JWT. Faça login novamente.' });
      }

      if (!rolesPermitidas.includes(role)) {
        return res.status(403).json({ 
          msg: `Acesso negado para o papel: ${role}. Permitidos: [${rolesPermitidas.join(', ')}]`
        });
      }

      next();
    };
  }
}

module.exports = AutorizacaoMiddleware;