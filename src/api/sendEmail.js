import nodemailer from 'nodemailer';

export default async (req, res) => {
  if (req.method === 'POST') {
    const { nombre, email, empresa, mensaje } = req.body;

    // Configura tu servidor SMTP usando variables de entorno
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: false, // true para port 465, false para otros puertos
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const [primerNombre] = nombre.split(' ');
    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to: process.env.EMAIL_TO,
      subject: `${primerNombre} de ${empresa} ACEROCHAIN`,
      text: `
        Nombre completo: ${nombre}
        Email: ${email}
        Empresa: ${empresa}
        Mensaje: ${mensaje}
      `,
    };

    try {
      await transporter.sendMail(mailOptions);
      res.status(200).json({ message: 'Email enviado exitosamente' });
    } catch (error) {
      console.error('Error al enviar el correo:', error);
      res.status(500).json({ error: 'Error al enviar el correo' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};
