"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RaffleService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let RaffleService = class RaffleService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAll() {
        return this.prisma.raffle.findMany({
            include: {
                _count: {
                    select: { tickets: true },
                },
            },
        });
    }
    async create(data) {
        return this.prisma.raffle.create({
            data: {
                title: data.title,
                description: data.description,
                prize: data.prize,
                status: 'OPEN',
                drawDate: new Date(data.drawDate),
            },
        });
    }
    async findOne(id) {
        return this.prisma.raffle.findUnique({
            where: { id },
            include: {
                tickets: {
                    include: { user: true },
                },
            },
        });
    }
};
exports.RaffleService = RaffleService;
exports.RaffleService = RaffleService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], RaffleService);
//# sourceMappingURL=raffle.service.js.map