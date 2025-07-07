const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");
dotenv.config();

const Usuario = require("../../usuario/models/usuario.model");

const tempo_acess_token = process.env.TEMPO_ACESS_TOKEN;
const tempo_refresh_token = process.env.TEMPO_REFRESH_TOKEN;

class AutenticacaoController {
  static gerarTokenAcesso(dadosUsuario) {
    return jwt.sign(dadosUsuario, process.env.SECRET_KEY, {
      expiresIn: tempo_acess_token,
    });
  }

  static gerarRefreshToken(dadosUsuario) {
    return jwt.sign(dadosUsuario, process.env.SECRET_KEY, {
      expiresIn: tempo_refresh_token,
    });
  }

  static async login(req, res) {
    try {
      const { email, senha } = req.body;

      if (!email || !senha) {
        return res.status(400).json({
          msg: "É necessário informar e-mail e senha para login.",
        });
      }

      const usuario = await Usuario.findOne({ where: { email } });

      if (!usuario) {
        return res.status(401).json({ msg: "Usuário não encontrado!" });
      }

      const senhaCorreta = await bcrypt.compare(senha, usuario.senha);
      if (!senhaCorreta) {
        return res.status(400).json({ msg: "E-mail ou senha incorretos!" });
      }

      const dadosUsuario = {
        nome: usuario.nome,
        email: usuario.email,
        papel: "admin",
      };

      const tokenAcesso = AutenticacaoController.gerarTokenAcesso(dadosUsuario);
      const refreshToken = AutenticacaoController.gerarRefreshToken(dadosUsuario);

      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 dias
      });

      return res.status(200).json({
        msg: "Usuário logado com sucesso",
        tokenAcesso,
        nome: usuario.nome,
        email: usuario.email,
        papel: "admin",
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
      return res.status(403).json({ msg: "Refresh token inválido!" });
    }

    jwt.verify(refreshToken, process.env.SECRET_KEY, (erro, usuario) => {
      if (erro) {
        return res.status(403).json({ msg: "Refresh token inválido!" });
      }

      const dadosUsuario = {
        nome: usuario.nome,
        email: usuario.email,
        papel: "admin",
      };

      const novoTokenAcesso = this.gerarTokenAcesso(dadosUsuario);

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
      return res.status(200).json({ msg: "Logout realizado com sucesso" });
    } catch (error) {
      return res.status(500).json({
        msg: "Erro interno do servidor. Por favor, tente mais tarde.",
        erro: error.message,
      });
    }
  }

  static async autenticar(req, res, next) {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(403).json({ msg: "Token não fornecido" });
    }

    try {
      const decoded = jwt.verify(token, process.env.SECRET_KEY);
      req.usuario = decoded;
      next();
    } catch (error) {
      return res.status(401).json({ msg: "Token inválido", erro: error.message });
    }
  }
}

module.exports = AutenticacaoController;
