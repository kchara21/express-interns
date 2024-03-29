"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkRole = void 0;
const typeorm_1 = require("typeorm");
const user_1 = require("../entities/user");
const checkRole = (roles) => {
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const { userId } = res.locals.jwtPayload;
        const userRepository = (0, typeorm_1.getRepository)(user_1.User);
        let user;
        try {
            user = yield userRepository.findOneOrFail(userId);
        }
        catch (e) {
            return res.status(401).json({ message: 'Not Authorized' });
        }
        //Check
        const { role } = user;
        if (roles.includes(role)) {
            next();
        }
        else {
            res.status(401).json({ message: 'Not Authorized' });
        }
    });
};
exports.checkRole = checkRole;
