const mailer = require('nodemailer');

const mailSend = async(to,subject,text)=>{
    const mailOptions = {
        from: 'hetvidoshi0202@gmail.com',
        to: to,
        subject: subject,
     //   text: text
        html: "<h1>Welcome to app</h1><p>Thank you for joining us</p>"
    }

    const transporter = mailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'hetvidoshi0202@gmail.com',
            pass: 'dzky glrs bwth ozhf'
        }
    })
        
    const res = await transporter.sendMail(mailOptions)
    
    return res

}
module.exports = {
    mailSend
}