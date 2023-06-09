import {
    Column,
    Model,
    PrimaryKey,
    Table,
    HasMany
  }from "sequelize-typescript";
import {InvoiceProductModel} from "./invoice-product-model/invoice-product.model";
@Table({
    tableName: "invoices",
    timestamps: false,
})
export class InvoiceModel extends Model {
    @PrimaryKey
    @Column({ allowNull: false })
    declare id: string


    @Column({ allowNull: false })
    declare name: string


    @Column({ allowNull: false })
    declare document: string


    @Column({ allowNull: false })
    declare street: string


    @Column({ allowNull: false })
    declare number: string


    @Column({ allowNull: false })
    declare complement: string


    @Column({ allowNull: false })
    declare city: string

    @Column({ allowNull: false })
    declare state: string

    @Column({ allowNull: false })
    declare zipCode: string


    @Column({ allowNull: false })
    declare total: number


    @Column({ allowNull: false })
    declare createdAt: Date


    @Column({ allowNull: false })
    declare updatedAt: Date


    @HasMany(() => InvoiceProductModel)
    declare invoice_products: InvoiceProductModel[]


}