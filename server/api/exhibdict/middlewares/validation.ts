import { query } from 'express-validator';
import validate from '../../../common/validator'

// export class Validation {

//   validationOptions(): Array<any>{
//     return [
//       query('countryid', 'countryid must be only an integer')
//           .if(query('countryid').exists())
//           .isInt(),
//       query('regionid', 'regionid must be only an integer')
//           .if(query('regionid').exists())
//           .isInt()
//     ];
//   }  

//   regionValidator(){
//     return validate(this.validationOptions())
//   }

// }

// export default new Validation();

