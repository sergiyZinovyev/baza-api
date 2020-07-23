
import Mailer from '../../../common/mailer';

class Options {
  public readonly from: string = 'send@galexpo.lviv.ua';
  public readonly to: string | Array<string>;
  public readonly subject: string = 'Запит на зміну пароля';
  public readonly attachments: Array<Object> = [];
  public readonly html: string = '';

  constructor(to?:string | Array<string>, html?: string) {
    this.to = to ?? 'send@galexpo.lviv.ua';
    this.html = html ?? '';
  }
}

class Email {
 
  private html(link: string): string{
    return `<p>Ви встановили (або скинули) пароль для отримання запрошень на виставки серії <strong> "Галицькі-Експозиції"</strong>.</p>
            <p>Пароль стане активним тільки після підтвердження</p>
            <p>Увага! обов'язково запам'ятайте свій пароль. Отримати запрошення без пароля буде неможливо.</p>
            <br>
            <p>Щоб підтвердити (або скинути) пароль натисніть на посилання нижче:</p>
            <p><strong>https://${process.env.HOST}/${link}</strong></p>
            <br>
            <p>Якщо ви нічого не встановлювали тоді нічого не робіть і просто видаліть цей лист</p>
            <br>
            <div><strong>З повагою ПрАТ "Гал-Експо"</div></strong>
            <div><strong>Організатор виставок серії "Галицькі-Експозиції"</div></strong>`
  }
 
  sendPasswordToEmail(link: string, email: string): Promise<any>{
    const mailOptions = new Options(email, this.html(link));
    return new Promise((resolve, reject) => {
      Mailer.transporter.sendMail(mailOptions, (err, info) => {
        if (err) return reject(`sendPasswordToEmail ${err}`);
        return resolve(info)
      })
    })    
  }

}
 
export default new Email();