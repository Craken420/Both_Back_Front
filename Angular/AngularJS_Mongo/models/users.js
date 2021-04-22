//Documentos
var ClienteSchema = mongoose.Schema({
    nombre: String,
    apellido: String,
    domicilio: String,
    telefono: String,
    email: String
 });
 var Cliente = mongoose.model('Cliente', ClienteSchema);