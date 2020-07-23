import { validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';

const validate = (validations: Array<any>) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        await Promise.all(validations.map(validation => validation.run(req)));
    
        const errors = validationResult(req);
        if (errors.isEmpty()) {
        return next();
        }
    
        res.status(422).json({ errors: errors.array() });
    };
};

export default validate 
