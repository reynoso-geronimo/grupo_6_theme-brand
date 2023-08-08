module.exports = (sequelize, dataTypes) => {
    let alias = "Usuarios";
    let cols = {
        id:{
         type: dataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true
        },
        email:{
         type: dataTypes.STRING
        },
        nombre:{
         type: dataTypes.STRING
        },
        apellido:{
         type: dataTypes.STRING
        },
        password:{
         type: dataTypes.STRING
        },
        categoria:{
         type: dataTypes.STRING
        },
        avatar:{
         type: dataTypes.STRING
        }
    };
    let config = {
        tableName: "Usuarios",
        timestamps: false
    }
    
    const Usuario = sequelize.define(alias, cols, config);

    return Usuario;
}