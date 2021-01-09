"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length,
        r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
        d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else
        for (var i = decorators.length - 1; i >= 0; i--)
            if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) {
        decorator(target, key, paramIndex);
    }
};
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.AdminController = void 0;
const common_1 = require("@nestjs/common");
const search_dto_1 = require("../../common/dto/search.dto");
const config_1 = require("../../config");
let AdminController = class AdminController {
    constructor(httpService) {
        this.httpService = httpService;
    }
    async delete(res, req, requestDto) {
        const result = {
            requestArgs: requestDto,
            headers: req.headers
        };
        if (config_1.config.app.isMaster === 'yes') {
            const nodeRes = await this.httpService
                .post(`http://${config_1.config.app.childNodeHost}/admin/ping`, Object.assign({}, requestDto))
                .toPromise();
            result.childNodeResult = nodeRes.data;
        }
        res.json({
            err: 0,
            data: result,
        });
    }
};
__decorate([
    common_1.Post('ping'),
    __param(0, common_1.Res()),
    __param(1, common_1.Req()),
    __param(2, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, search_dto_1.SearchDto]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "delete", null);
AdminController = __decorate([
    common_1.Controller('admin'),
    __metadata("design:paramtypes", [common_1.HttpService])
], AdminController);
exports.AdminController = AdminController;
//# sourceMappingURL=admin.controller.js.map