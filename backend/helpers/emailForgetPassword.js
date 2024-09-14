import nodemailer from "nodemailer"

const emailForgetPassword = async (data) => {
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
    subject: 'Restablece tu password!',
    text: 'Sigue los pasos para restablecer tu password',
    html: `
      <p> Hola ${name}, solicitaste reestablecer tu password </p>
      <p> Haz click en el enlace para generar nuevo password :
        <a href="${process.env.FRONT_URL}/forget-password/${token}"> Reestablecer tu password </a>
      </p>

      <p>Si tu no creaste esta cuenta, ignora el mensaje</p>

    `
  })
}

export default emailForgetPassword