
export interface IRegionReqQuery {
  countryid?: number;
  regionid?: number
};


export interface IRegionRes {
  city_region: string;
  cityid: number;
  countryid: number;
  regionid: number;
  teretory: string;
  teretory_eng: string;
}


export class RegionReqQuery implements IRegionReqQuery {
  countryid: number = null;
  regionid: number = null;
  constructor(parameters?: IRegionReqQuery) {
    if(parameters){
      for (let key in parameters){
        if(this.hasOwnProperty(key)) this[key] = Number.parseInt(parameters[key])
      }
    }
  }
  public keysValueToArr(): Array<number>{
    let arr = [];
    for (let key in this){
      if(this[key]) arr.push(this[key])
    }
    return arr
  }
}


export class Region implements IRegionRes {
  city_region: string = null;
  cityid: number = null;
  countryid: number = null;
  regionid: number = null;
  teretory: string = undefined;
  teretory_eng: string = undefined;
  constructor(parameters?: IRegionRes) {
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

