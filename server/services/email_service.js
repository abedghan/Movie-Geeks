const nodemailer = require('nodemailer');
const Mailgen = require('mailgen');

require('dotenv').config();



let transporter = nodemailer.createTransport({
    service: 'Gmail',
    secure: true,
    auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD
    }

});

const registerEmail = async (userEmail, user) => {

    try {
        const emailToken = user.generateRegisterToken();
        const mailGenerator = new Mailgen({
            theme: "default",
            product: {
                name:'finalproject',
                link:`${process.env. EMAIL_MAIN_URL}`
            }

        });

        const email = {
            body:{
                name: userEmail,
                intro: 'Welcome to final project! We\'re very excited to have you on board.',
                action:{
                  instructions: 'To validate your account, please click here:',
                  button:{
                      color:'#1a73e8',
                      text: 'Validate your account',
                      link: `${process.env.SITE_DOMAIN}verification?t=${emailToken}`
                  }
                  },
                  outro: 'Need help, or have questions? Just reply to this email, we\'d love to help.'
            }
          }
        let emailBody = mailGenerator.generate(email)
        let message = {
            from :process.env.EMAIL,
            to:userEmail,
            subject: 'welcome to the final project',
            html: emailBody
        }   
        await transporter.sendMail(message)
        return true
    } catch (error) {
        throw error
    }
}
const contactMail = async (contact) =>{
    try{
        const mailGenerator = new Mailgen({
            theme: "default",
            product: {
                name:'The Movie Geeks',
                link:`${process.env. EMAIL_MAIN_URL}`
            }

        });
        const email = {
            body:{
               intro:[
                ' you have a new message from',
                `Email: ${contact.email}`,
                `first name: ${contact.firstname}`,
                `last name: ${contact.lastname}`,
               ] ,
               outro:[`${contact.message}`]
            }
        };
        let emailBody = mailGenerator.generate(email);
        let message = {
            from :`${contact.email}`,
            to:process.env.EMAIL,
            subject: 'Contact',
            html: emailBody

        }
        await transporter.sendMail(message);
        return true;
    
   } catch (error) {
    throw error
    }
}

module.exports ={
    registerEmail,
    contactMail
}  