import controller from './controllers/controller';

class Auth {
    public access = () => controller.getAccess;
    public check = (accessLevels?: Array<number>) => controller.checkAccess(accessLevels);
}
   
export default new Auth(); 