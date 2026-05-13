"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WinnersModule = void 0;
const common_1 = require("@nestjs/common");
const winners_service_1 = require("./services/winners.service");
const winners_controller_1 = require("./controllers/winners.controller");
const prisma_service_1 = require("../prisma/prisma.service");
let WinnersModule = class WinnersModule {
};
exports.WinnersModule = WinnersModule;
exports.WinnersModule = WinnersModule = __decorate([
    (0, common_1.Module)({
        controllers: [winners_controller_1.WinnersController],
        providers: [winners_service_1.WinnersService, prisma_service_1.PrismaService],
    })
], WinnersModule);
//# sourceMappingURL=winners.module.js.map