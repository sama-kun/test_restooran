import { MigrationInterface, QueryRunner } from "typeorm";
export declare class Initial1710679774239 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
