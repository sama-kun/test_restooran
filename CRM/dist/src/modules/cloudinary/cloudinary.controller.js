"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CloudinaryController = void 0;
const common_1 = require("@nestjs/common");
const clodinary_service_1 = require("./clodinary.service");
const platform_express_1 = require("@nestjs/platform-express");
const roles_quard_1 = require("../../common/guards/roles.quard");
const enums_1 = require("../../interfaces/enums");
const roles_auth_decorator_1 = require("../../common/decorators/roles-auth.decorator");
const auth_user_decorator_1 = require("../../common/decorators/auth-user.decorator");
const user_entity_1 = require("../../database/entities/user.entity");
const search_file_dto_1 = require("./dto/search-file.dto");
const swagger_1 = require("@nestjs/swagger");
const update_file_dto_1 = require("./dto/update-file.dto");
const multerConfig = __importStar(require("./multer.config"));
let CloudinaryController = class CloudinaryController {
    constructor(cloudinaryService) {
        this.cloudinaryService = cloudinaryService;
    }
    uploadImage(user, file, data) {
        return this.cloudinaryService.uploadFile(user, file, { folder: data.folder }, data.item);
    }
    async uploadImages(user, files, data) {
        return await this.cloudinaryService.uploadFiles(user, data.item, files, "item");
    }
    uploadPdf(user, File) {
        return this.cloudinaryService.uploadPdf(user, File);
    }
    findAll(query) {
        const { pagination, sort, relations, filter, search } = query;
        return this.cloudinaryService.findAll(pagination, sort, relations, filter, search);
    }
    getOne(id, query) {
        const { relations } = query;
        return this.cloudinaryService.findById(id, relations);
    }
};
__decorate([
    (0, swagger_1.ApiOperation)({ summary: "Upload a file" }),
    (0, swagger_1.ApiConsumes)("multipart/form-data"),
    (0, swagger_1.ApiBody)({
        description: "Image to upload",
    }),
    (0, common_1.Post)("image"),
    (0, common_1.UseGuards)(roles_quard_1.RolesQuard),
    (0, roles_auth_decorator_1.Roles)(enums_1.RoleEnum.USER),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)("file")),
    __param(0, (0, auth_user_decorator_1.AuthUser)()),
    __param(1, (0, common_1.UploadedFile)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.UserEntity, Object, Object]),
    __metadata("design:returntype", void 0)
], CloudinaryController.prototype, "uploadImage", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: "Upload a files (U can send a lot files). Only for items",
    }),
    (0, swagger_1.ApiConsumes)("multipart/form-data"),
    (0, swagger_1.ApiBody)({
        schema: {
            type: "object",
            properties: {
                item: {
                    type: "number",
                    example: 1,
                    description: "ID of item",
                },
            },
        },
    }),
    (0, common_1.Post)("upload-multiply"),
    (0, common_1.UseGuards)(roles_quard_1.RolesQuard),
    (0, roles_auth_decorator_1.Roles)(enums_1.RoleEnum.USER),
    (0, common_1.UseInterceptors)((0, platform_express_1.FilesInterceptor)("files")),
    __param(0, (0, auth_user_decorator_1.AuthUser)()),
    __param(1, (0, common_1.UploadedFiles)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.UserEntity, Array, Object]),
    __metadata("design:returntype", Promise)
], CloudinaryController.prototype, "uploadImages", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: "Upload a file format PDF" }),
    (0, swagger_1.ApiConsumes)("multipart/form-data"),
    (0, swagger_1.ApiBody)({
        description: "PDF to upload",
    }),
    (0, common_1.Post)("pdf"),
    (0, common_1.UseGuards)(roles_quard_1.RolesQuard),
    (0, roles_auth_decorator_1.Roles)(enums_1.RoleEnum.USER),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)("file", multerConfig)),
    __param(0, (0, auth_user_decorator_1.AuthUser)()),
    __param(1, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.UserEntity, Object]),
    __metadata("design:returntype", void 0)
], CloudinaryController.prototype, "uploadPdf", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: "Get all file" }),
    (0, swagger_1.ApiConsumes)("multipart/form-data"),
    (0, swagger_1.ApiBody)({
        description: "Image to upload",
    }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        type: Array,
    }),
    (0, swagger_1.ApiQuery)({ type: search_file_dto_1.SearchFileDto }),
    (0, common_1.Get)(),
    (0, common_1.UseGuards)(roles_quard_1.RolesQuard),
    (0, roles_auth_decorator_1.Roles)(enums_1.RoleEnum.USER),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [search_file_dto_1.SearchFileDto]),
    __metadata("design:returntype", void 0)
], CloudinaryController.prototype, "findAll", null);
__decorate([
    (0, swagger_1.ApiParam)({ name: "id", description: "File ID" }),
    (0, swagger_1.ApiOperation)({ summary: "Get Cart by id" }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        type: update_file_dto_1.UpdateFileDto,
        description: "Cart created successfully",
    }),
    (0, swagger_1.ApiQuery)({ name: "relations", required: false, type: Array }),
    (0, common_1.UseGuards)(roles_quard_1.RolesQuard),
    (0, roles_auth_decorator_1.Roles)(enums_1.RoleEnum.USER),
    (0, common_1.Get)(":id"),
    __param(0, (0, common_1.Param)("id", common_1.ParseIntPipe)),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, search_file_dto_1.SearchFileDto]),
    __metadata("design:returntype", void 0)
], CloudinaryController.prototype, "getOne", null);
CloudinaryController = __decorate([
    (0, swagger_1.ApiTags)("Files"),
    (0, common_1.Controller)("cloud"),
    (0, swagger_1.ApiBearerAuth)(),
    __metadata("design:paramtypes", [clodinary_service_1.CloudinaryService])
], CloudinaryController);
exports.CloudinaryController = CloudinaryController;
//# sourceMappingURL=cloudinary.controller.js.map