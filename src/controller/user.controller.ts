import { Router, Response, Request } from 'express';
import { User } from '../models/User';
import { UserService } from '../services/user.service';
import { ResponseHandler } from '../util/response-handler';

export class UserController {
    public router: Router;
    private userService: UserService;
    private responseHandler: ResponseHandler;

    constructor() {
        this.userService = new UserService();
        this.responseHandler = new ResponseHandler();
        this.router = Router();
        this.routes();
    }

    public getAll = async (req: Request, res: Response) => {
        try {
            const users = await this.userService.getAll();
            res.send(this.responseHandler.format(users)).json();
        } catch (error) {
            res.sendStatus(500).send(this.responseHandler.formatError(error))
        }
    }

    public getById = async (req: Request, res: Response) => {
        try {
            const id = req['params']['id'];
            const users = await this.userService.getById(Number(id));
            res.send(this.responseHandler.format(users)).json();
        } catch (error) {
            res.sendStatus(500).send(this.responseHandler.formatError(error))
        }
    }

    public create = async (req: Request, res: Response) => {
        try {
            const userReq = req['body'] as User;
            const user = await this.userService.create(userReq);
            res.send(this.responseHandler.format(user));
        } catch (error) {
            res.sendStatus(500).send(this.responseHandler.formatError(error))
        }
    }

    public update = async (req: Request, res: Response) => {
        const userReq = req['body'] as User;
        const id = req['params']['id'];
        try {
            const user = await this.userService.update(userReq, Number(id));
            res.send(this.responseHandler.format(user));
        } catch (error) {
            res.sendStatus(500).send(this.responseHandler.formatError(error))
        }
    }

    public delete = async (req: Request, res: Response) => {
        const id = req['params']['id'];
        try {
            const user = this.userService.delete(Number(id));
            res.send(this.responseHandler.format(user));
        } catch (error) {
            res.sendStatus(500).send(this.responseHandler.formatError(error))
        }
    }

    public routes() {
        this.router.get('/', this.getAll);
        this.router.get('/:id', this.getById);
        this.router.post('/', this.create);
        this.router.put('/:id', this.update);
        this.router.delete('/:id', this.delete);
    }
}