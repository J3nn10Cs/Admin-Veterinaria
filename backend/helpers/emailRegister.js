import nodemailer from "nodemailer"

const emailRegister = async (data) => {
  const transport = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });
  const {email, token, name} = data;
  //Enviar email
  const info = await transport.sendMail({
    //quien envia
    from: "Admindistrador de pacientes de veterinaria",
    //a quien se le envia
    to: email,
    //asunto
    subject: 'Comprueba tu cuenta AQUI!',
    text: 'Comprueba tu cuenta',
    html: `
      <p> Hola ${name}, comprueba tu cuenta </p>
      <p> Tu cuenta ya está lista, comprueba en :
        <a href="${process.env.FRONT_URL}/confirm/${token}"> Comprobar tu cuenta </a>
      </p>

      <p>Si tu no creaste esta cuenta, ignora el mensaje</p>

    `
  })
}

export default emailRegister