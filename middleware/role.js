module.exports = (req, res, next) => {
    if (req.session.usuario.role === "ADMIN") {
        next();
    } else {
        res.json({msg:"No tienes los permisos"})
    }
}