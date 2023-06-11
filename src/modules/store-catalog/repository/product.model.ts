import { Model, Table, Column, PrimaryKey } from "sequelize-typescript";

@Table({
    tableName: "products",
    timestamps: false,
})
export  class ProductModel extends Model{
    
    @PrimaryKey
    @Column({ allowNull: false })
    declare id: string;

    @Column({ allowNull: false })
    declare name: string;

    @Column({ allowNull: false })
    declare description: string;

    @Column({ allowNull: false })
    declare salesPrice: number;

}