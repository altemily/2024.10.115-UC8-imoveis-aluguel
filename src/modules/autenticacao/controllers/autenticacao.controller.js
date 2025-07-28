const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");
dotenv.config();

const Usuario = require("../../usuario/models/usuario.model");

// Tempos de expiração dos tokens
const tempo_acess_token = process.env.TEMPO_ACESS_TOKEN || "15m";
const tempo_refresh_token = process.env.TEMPO_REFRESH_TOKEN || "7d";
const secret_key = process.env.SECRET_KEY || "segredo";

class AutenticacaoController {
  // Gera o token de acesso (JWT)
  static gerarTokenAcesso(dadosUsuario) {
    return jwt.sign(dadosUsuario, secret_key, {
      expiresIn: tempo_acess_token,
    });
  }

  // Gera o refresh token
  static gerarRefreshToken(dadosUsuario) {
    return jwt.sign(dadosUsuario, secret_key, {
      expiresIn: tempo_refresh_token,
    });
  }

  static async login(req, res) {
    try {
      const { email, senha } = req.body;

      if (!email || !senha) {
        return res.status(400).json({ msg: "E-mail e senha são obrigatórios." });
      }

      const usuario = await Usuario.findOne({ where: { email } });

      if (!usuario) {
        return res.status(401).json({ msg: "Usuário não encontrado!" });
      }

      const senhaCorreta = await bcrypt.compare(senha, usuario.senha);
      if (!senhaCorreta) {
        return res.status(400).json({ msg: "E-mail ou senha incorretos!" });
      }

      // Dados que vão para o token
      const dadosUsuario = {
        id: usuario.id,
        nome: usuario.nome,
        email: usuario.email,
        role: usuario.role,
      };

      const tokenAcesso = AutenticacaoController.gerarTokenAcesso(dadosUsuario);
      const refreshToken = AutenticacaoController.gerarRefreshToken(dadosUsuario);

      // Envia o refreshToken em cookie httpOnly
      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 dias
      });

      return res.status(200).json({
        msg: "Usuário logado com sucesso!",
        tokenAcesso,
        nome: usuario.nome,
        email: usuario.email,
        role: usuario.role,
      });
    } catch (error) {
      return res.status(500).json({
        msg: "Erro interno do servidor. Por favor, tente mais tarde.",
        erro: error.message,
      });
    }
  }

  static refreshToken(req, res) {
    const { refreshToken } = req.cookies;

    if (!refreshToken) {
      return res.status(403).json({ msg: "Refresh token não fornecido!" });
    }

    jwt.verify(refreshToken, secret_key, (erro, usuario) => {
      if (erro) {
        return res.status(403).json({ msg: "Refresh token inválido!" });
      }

      // Gera novo token de acesso
      const dadosUsuario = {
        id: usuario.id,
        nome: usuario.nome,
        email: usuario.email,
        role: usuario.role,
      };

      const novoTokenAcesso = AutenticacaoController.gerarTokenAcesso(dadosUsuario);

      return res.status(200).json({ tokenAcesso: novoTokenAcesso });
    });
  }

  static async sair(req, res) {
    try {
      res.clearCookie("refreshToken", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
      });
      return res.status(200).json({ msg: "Logout realizado com sucesso." });
    } catch (error) {
      return res.status(500).json({
        msg: "Erro interno do servidor. Por favor, tente mais tarde.",
        erro: error.message,
      });
    }
  }

  // Middleware: AUTENTICAR (protege rotas)
  static async autenticar(req, res, next) {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(403).json({ msg: "Token não fornecido." });
    }

    try {
      const decoded = jwt.verify(token, secret_key);
      req.user = decoded; // Adiciona dados do usuário ao request
      next();
    } catch (error) {
      return res.status(401).json({ msg: "Token inválido.", erro: error.message });
    }
  }

  // Middleware: AUTORIZAR (por role)
  static autorizar(...rolesPermitidas) {
    return (req, res, next) => {

      if (!req.user || !rolesPermitidas.includes(req.user.role)) {
        return res.status(403).json({ msg: "Acesso não autorizado para este papel." });
      }
      next();
    };
  }
}

module.exports = AutenticacaoController;
