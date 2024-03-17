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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const users_service_1 = require("./users.service");
const BaseController_1 = require("../../common/base/BaseController");
const update_user_dto_1 = require("./dto/update-user.dto");
const user_entity_1 = require("../../database/entities/user.entity");
const search_user_dto_1 = require("./dto/search-user.dto");
const auth_user_decorator_1 = require("../../common/decorators/auth-user.decorator");
const roles_quard_1 = require("../../common/guards/roles.quard");
const swagger_1 = require("@nestjs/swagger");
const enums_1 = require("../../interfaces/enums");
const roles_auth_decorator_1 = require("../../common/decorators/roles-auth.decorator");
let UserController = class UserController extends BaseController_1.BaseController {
    constructor(userService) {
        super();
        this.userService = userService;
        this.dataService = userService;
    }
    create(data, user) {
        return this.dataService.create(data, user);
    }
    update(user, id, updateUserDto) {
        return this.dataService.update(user, id, updateUserDto);
    }
    async findAll(query) {
        const { pagination, sort, relations, filter, search } = query;
        return this.dataService.findAll(pagination, sort, relations, filter, search);
    }
    async getOne(id, query) {
        const { relations } = query;
        return this.dataService.findById(id, relations);
    }
    me(user) {
        if (!user)
            throw new common_1.HttpException('Токен неверный', common_1.HttpStatus.UNAUTHORIZED);
        return this.dataService.findOne({
            where: { id: user.id },
            relations: [],
        });
    }
};
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Create Category' }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        type: user_entity_1.UserEntity,
        description: 'User created successfully',
    }),
    (0, swagger_1.ApiBody)({ type: user_entity_1.UserEntity }),
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(roles_quard_1.RolesQuard),
    (0, roles_auth_decorator_1.Roles)(enums_1.RoleEnum.ROOT),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, auth_user_decorator_1.AuthUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, user_entity_1.UserEntity]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "create", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Update User' }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        type: user_entity_1.UserEntity,
        description: 'User updated successfully',
    }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'User ID' }),
    (0, swagger_1.ApiBody)({ type: user_entity_1.UserEntity }),
    (0, common_1.Patch)(':id'),
    (0, common_1.UseGuards)(roles_quard_1.RolesQuard),
    (0, roles_auth_decorator_1.Roles)(enums_1.RoleEnum.ROOT),
    __param(0, (0, auth_user_decorator_1.AuthUser)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.UserEntity, Number, update_user_dto_1.UpdateUserDto]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "update", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get all Users using query' }),
    (0, swagger_1.ApiQuery)({ type: search_user_dto_1.SearchUserDto }),
    (0, common_1.Get)(),
    (0, common_1.UseGuards)(roles_quard_1.RolesQuard),
    (0, roles_auth_decorator_1.Roles)(enums_1.RoleEnum.ROOT),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [search_user_dto_1.SearchUserDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "findAll", null);
__decorate([
    (0, swagger_1.ApiParam)({ name: 'id', description: 'User ID' }),
    (0, swagger_1.ApiOperation)({ summary: 'Get User by id' }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        type: user_entity_1.UserEntity,
    }),
    (0, swagger_1.ApiQuery)({ name: 'relations', required: false, type: Array }),
    (0, common_1.UseGuards)(roles_quard_1.RolesQuard),
    (0, roles_auth_decorator_1.Roles)(enums_1.RoleEnum.ROOT),
    (0, common_1.Get)('/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, search_user_dto_1.SearchUserDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getOne", null);
__decorate([
    (0, common_1.Get)('auth/me'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(roles_quard_1.RolesQuard),
    (0, roles_auth_decorator_1.Roles)(enums_1.RoleEnum.ROOT),
    __param(0, (0, auth_user_decorator_1.AuthUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.UserEntity]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "me", null);
UserController = __decorate([
    (0, swagger_1.ApiTags)('User'),
    (0, common_1.Controller)('user'),
    (0, swagger_1.ApiBearerAuth)(),
    __metadata("design:paramtypes", [users_service_1.UserService])
], UserController);
exports.UserController = UserController;
//# sourceMappingURL=users.controller.js.map