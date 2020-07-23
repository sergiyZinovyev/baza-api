
import Mailer from '../../../common/mailer';
import {IEmailOpt} from './../controllers/interfaces/interface';

class Options {
  public readonly from: string = 'send@galexpo.lviv.ua';
  public readonly to: string | Array<string>;
  public readonly subject: string = 'Запит на зміну пароля';
  public readonly attachments: Array<Object> = [];
  public readonly html: string = '';

  constructor(to?:string | Array<string>, html?: string, attachments?: Array<Object>) {
    this.to = to ?? 'send@galexpo.lviv.ua';
    this.html = html ?? '';
    this.attachments = attachments ?? []
  }
}
 
class Email {
 
  private html(options: IEmailOpt): string{
    return `<p>Шановний(а) <strong>${options.prizv} ${options.name} ${options.pobatkovi}</strong>, у вкладенні Ви отримали персональне запрошення на виставку.</p>
            <p>Якщо Ви не змогли зберегти чи отримати на пошту повне запрошення зі штрихкодом то покажіть цей код на реєстрації:</p>
            <p><strong>${options.regnum}</strong></p>
            <p>З повагою ПрАТ "Гал-Експо"</p>`
  }
  
  sendInvite(options: IEmailOpt): Promise<any>{
    const attachments = [{path: options.file}];
    const mailOptions = new Options(options.email, this.html(options), attachments);
    return new Promise((resolve, reject) => {
      Mailer.transporter.sendMail(mailOptions, (err, info) => {
        if (err) return reject(`sendPasswordToEmail ${err}`);
        return resolve(info)
      })
    })    
  }

}
 
export default new Email();