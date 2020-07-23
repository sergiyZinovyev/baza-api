export interface IExhibition {
  numexhib?: number,
  //nameexhibpolne?: string,
  nameexhibkor?: string,
  nameexhibkor_en?: string,
  id_exhib_dict?: number,
  //placeid?: number,
  //year?: number,
  datebegin?: string,
  dateend?: string,
  // platazakrprum?: number,
  // plataotkrprum?: number,
  // platacatalogforuchasnyk?: number,
  // platacatalogforzaochny?: number,
  // otkrarea?: number,
  // zakrarea?: number,
  // platazakrprum2?: number,
  // plataotkrprum2?: number,
  // platacatalogforuchasnyk2?: number,
  // platacatalogforzaochny2?: number,
  // plata_orgvnesok?: string,
  // plata_orgvnesok2?: string,
  // next_predstavnuk_banket?: string,
  // next_predstavnuk_banket2?: string,
  // next_predstavnuk_notbanket?: string,
  // next_predstavnuk_notbanket2?: string,
  typeOfReg?: string,
  description?: string,
  description_en?: string,
  site?: string
}

export class Exhibition implements IExhibition {
  numexhib = null;
  // nameexhibpolne = "";
  nameexhibkor = "";
  nameexhibkor_en = "";
  id_exhib_dict = null;
  // placeid = null;
  // year = null;
  datebegin = "";
  dateend = "";
  // platazakrprum = null;
  // plataotkrprum = null;
  // platacatalogforuchasnyk = null;
  // platacatalogforzaochny = null;
  // otkrarea = null;
  // zakrarea = null;
  // platazakrprum2 = null;
  // plataotkrprum2 = null;
  // platacatalogforuchasnyk2 = null;
  // platacatalogforzaochny2 = null;
  // plata_orgvnesok = "";
  // plata_orgvnesok2 = "";
  // next_predstavnuk_banket = "";
  // next_predstavnuk_banket2 = "";
  // next_predstavnuk_notbanket = "";
  // next_predstavnuk_notbanket2 = "";
  typeOfReg = "";
  description = "";
  description_en = "";
  site = "";

  constructor(parameters?: IExhibition) {
    if(parameters){
      for (let key in parameters){
        this[key] = parameters[key]
      }
    }
  }

  public keysToString(){
    return Object.getOwnPropertyNames(this).join(', ')
  }
} 

