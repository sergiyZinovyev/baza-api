import nodemailer from 'nodemailer';

export class Mailer {
	
	public transporter = nodemailer.createTransport({
		host: process.env.EMAIL_BH_HOST,
		port: 587,
		secure: false, //disable SSL    
		requireTLS: true, //Force TLS 
		tls: {
			rejectUnauthorized: false
		},
		auth: {
			pass: process.env.EMAIL_BH_PASS,
			user: process.env.EMAIL_BH_USER
		}
	});

}
   
export default new Mailer();
  