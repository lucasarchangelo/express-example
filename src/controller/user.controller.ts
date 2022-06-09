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
        const user = await this.userService.getAll();
        try {
            res.send(this.responseHandler.format(user)).json();
        } catch (error) {
            res.sendStatus(500).send(this.responseHandler.formatError(error))
        }
    }

    public getById = async (req: Request, res: Response) => {
        const id = req['params']['id'];
        const users = await this.userService.getById(Number(id));
        try {
            res.send(this.responseHandler.format(users)).json();
        } catch (error) {
            res.sendStatus(500).send(this.responseHandler.formatError(error))
        }
    }

    public create = async (req: Request, res: Response) => {
        const user = req['body'] as User;
        const newUser = await this.userService.create(user);
        try {
            res.send(this.responseHandler.format(newUser));
        } catch (error) {
            res.sendStatus(500).send(this.responseHandler.formatError(error))
        }
    }

    public update = async (req: Request, res: Response) => {
        const user = req['body'] as User;
        const id = req['params']['id'];
        try {
            res.send(this.responseHandler.format(this.userService.update(user, Number(id))));
        } catch (error) {
            res.sendStatus(500).send(this.responseHandler.formatError(error))
        }
    }

    public delete = async (req: Request, res: Response) => {
        const id = req['params']['id'];
        try {
            res.send(this.responseHandler.format(this.userService.delete(Number(id))));
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