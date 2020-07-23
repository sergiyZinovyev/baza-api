import Model from './password.model';

class Service {

  async addPassword(regnum: number, password: string, firstpassword: string): Promise<string> {
    const data = await Model.getRegnumInPasswords(regnum);
    if(data.length > 0) await Model.editRowInPasswords([password, firstpassword, regnum])
    else await Model.createRowInPasswords([regnum, password, firstpassword]);
    return `confirm/?regnum=${regnum}&password=${password}&firstpassword=${firstpassword}`
  }

  async checkVisitorsPassword(regnum: number, password: string = ''): Promise<boolean> {
    const data = await Model.checkVisitorsPassword(regnum, password);
    if (data.length > 0) return true
    else return false;
  }

  async checkFirstpassword(regnum: number, firstpassword: string): Promise<string> {
    const data = await Model.getRegnumInPasswords(regnum);
    if (data.length > 0) {
      if(!data[0]['firstpassword'] || data[0]['firstpassword'] === firstpassword) return 'EDIT'
      else return 'ERROR';
    }
    return 'All necessary changes have already been made'
  }

  async editPassword(regnum: number, password: string): Promise<string> {
    const arr = ['visitors', 'visitors_create', 'visitors_edit'];
    await Promise.all(arr.map(table => Model.editPasswordInTable(table, [password, regnum])));
    return "DONE";
  }

  async delRowInPasswords(regnum: number): Promise<string> {
    await Model.delRowInPasswords([regnum]);
    return "DONE";
  }

}
 
export default new Service();