
// export interface IRegionReqQuery {
//   countryid?: number;
//   regionid?: number
// };

 
// export interface IVisitorRes {
//   regnum?: number,
//   name?: string,
//   prizv?: string,
//   namepovne?: string,
//   countryid?: number,
//   postindeks?: string,
//   regionid?: number,
//   city?: string,
//   address?: string,
//   postaddreses?: string,
//   telephon?: string,
//   pobatkovi?: string,
//   gender?: string,
//   m_robotu?: string,
//   sferadij?: string,
//   posada?: string,
//   type?: string,
//   kompeten?: string,
//   potvid?: string,
//   email?: string,
//   datawnesenny?: string,
//   datelastcor?: string,
//   rating?: string,
//   ins_user?: number,
//   cellphone?: string,
//   sending?: number,
//   password?: string
// }

 
// export class RegionReqQuery implements IRegionReqQuery {
//   countryid: number = null;
//   regionid: number = null;
//   constructor(parameters?: IRegionReqQuery) {
//     if(parameters){
//       for (let key in parameters){
//         if(this.hasOwnProperty(key)) this[key] = Number.parseInt(parameters[key])
//       }
//     }
//   }
//   public keysValueToArr(): Array<number>{
//     let arr = [];
//     for (let key in this){
//       if(this[key]) arr.push(this[key])
//     }
//     return arr
//   }
// }


// export class Visitor implements IVisitorRes {
//   regnum: number = null;
//   name: string = '';
//   prizv: string = '';
//   namepovne: string = '';
//   countryid: number = null;
//   postindeks: string = '';
//   regionid: number = null;
//   city: string = '';
//   address: string = '';
//   postaddreses: string = '';
//   telephon: string = '';
//   pobatkovi: string = '';
//   gender: string = '';
//   m_robotu: string = '';
//   sferadij: string = '';
//   posada: string = '';
//   type: string = '';
//   kompeten: string = '';
//   potvid: string = '';
//   email: string = '';
//   datawnesenny: string = '';
//   datelastcor: string = '';
//   rating: string = '';
//   ins_user: number = null;
//   cellphone: string = '';
//   sending: number = null;
//   password: string = '';

//   constructor(parameters?: IVisitorRes) {
//     if(parameters){
//       for (let key in parameters){
//         this[key] = parameters[key]
//       }
//     }
//   }

//   public keysToString(){
//     return Object.getOwnPropertyNames(this).join(', ')
//   }
// } 

