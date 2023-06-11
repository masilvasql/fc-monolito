import Id from "../../../../@shared/domain/value-object/id.value-object"
import Product from "../../product.entity"
import { PlaceOrderInputDto } from "./place-order.dto"
import PlaceOrderUseCase from "./place-order.usecase"

const mockDate = new Date(2000, 1, 1)


describe('PlaceOrderUseCase Unit Test', () => {
    describe("Execute Method", () => {

        beforeAll(() => {
            jest.useFakeTimers("modern"),
                jest.setSystemTime(mockDate)
        });

        afterAll(() => {
            jest.useRealTimers();
        });


        it("should throw and error when client not fund", async () => {
            const mockClientFacade = {
                find: jest.fn().mockResolvedValue(null),
            }

            //@ts-expect-error - no params in constructor
            const placeOrderUseCase = new PlaceOrderUseCase()
            //@ts-expect-error - force set clientFacade
            placeOrderUseCase["_clientFacade"] = mockClientFacade

            const input: PlaceOrderInputDto = {
                clientId: '0',
                products: []
            }

            await expect(placeOrderUseCase.execute(input)).rejects.toThrow(new Error("Client not found"))

        })

        it("should throw and error when products are not valid", async () => {
            const mockClientFacade = {
                find: jest.fn().mockResolvedValue(true),
            }
            //@ts-expect-error - no params in constructor
            const placeOrderUseCase = new PlaceOrderUseCase()

            const mockValidateProducts = jest
                //@ts-expect-error - spy on private method
                .spyOn(placeOrderUseCase, "validateProducts")
                //@ts-expect-error - not return never
                .mockRejectedValue(new Error("No products selected"));

            //@ts-expect-error - force set clientFacade
            placeOrderUseCase["_clientFacade"] = mockClientFacade

            const input: PlaceOrderInputDto = {
                clientId: '1',
                products: []
            }

            await expect(placeOrderUseCase.execute(input)).rejects.toThrow(new Error("No products selected"))
            expect(mockValidateProducts).toHaveBeenCalledTimes(1)

        })

        describe("Place an Order", () => {
            const clientProps = {
                id: '1',
                name: 'John Doe',
                document: '00000000000',
                email: 'teste@teste.com',
                street: 'Rua teste',
                number: '123',
                complement: 'apto 123',
                city: 'São Paulo',
                state: 'SP',
                zipCode: '00000000',
            }

            const mockClientFacade = {
                find: jest.fn().mockResolvedValue(clientProps),
            };

            const mockPaymentFacade = {
                process: jest.fn(),
            }

            const mockCheckoutRepo = {
                addOrder: jest.fn(),
            }

            const mockInvoiceFacade = {
                generate: jest.fn().mockResolvedValue({ id: '1i', }),
            }

            const placeOrderUseCase = new PlaceOrderUseCase(
                mockClientFacade as any,
                null,
                null,
                mockCheckoutRepo as any,
                mockInvoiceFacade as any,
                mockPaymentFacade
            )

            const products = {
                "1": new Product({
                    id: new Id('1'),
                    name: 'Product 1',
                    description: 'Product 1',
                    salesPrice: 100,
                }),
                "2": new Product({
                    id: new Id('2'),
                    name: 'Product 2',
                    description: 'Product 2',
                    salesPrice: 200,
                })
            }

            const mockValidateProducts = jest
                //@ts-expect-error - spy on private method
                .spyOn(placeOrderUseCase, "validateProducts")
                //@ts-expect-error - spy on private method
                .mockResolvedValue(true);

            const mockGetProduct = jest
                //@ts-expect-error - spy on private method
                .spyOn(placeOrderUseCase, "getProduct")
                //@ts-expect-error - not return never
                .mockImplementation((productId: keyof typeof products) => Promise.resolve(products[productId]));

            it("should not be approved ", async () => {
                mockPaymentFacade.process = mockPaymentFacade.process.mockReturnValue({
                    transaction: "1t",
                    orderId: "1o",
                    amount: 100,
                    status: "error",
                    createdAt: new Date(),
                    updatedAt: new Date(),
                })

                const input: PlaceOrderInputDto = {
                    clientId: '1c',
                    products: [{ productId: '1' }, { productId: '2' }]
                }

                let output = await placeOrderUseCase.execute(input)

                expect(output.invoiceId).toBeNull()
                expect(output.total).toBe(300)
                expect(output.products).toStrictEqual([{ productId: '1' }, { productId: '2' }])
                expect(mockClientFacade.find).toHaveBeenCalled()
                expect(mockClientFacade.find).toHaveBeenCalledWith({ id: "1c" })
                expect(mockValidateProducts).toBeCalledTimes(1)
                expect(mockValidateProducts).toHaveBeenCalledWith(input)
                expect(mockGetProduct).toBeCalledTimes(2)
                expect(mockCheckoutRepo.addOrder).toBeCalledTimes(1)
                expect(mockPaymentFacade.process).toBeCalledTimes(1)
                expect(mockPaymentFacade.process).toHaveBeenCalledWith({
                  orderId: output.id,
                  amount: output.total,
                })
                expect(mockInvoiceFacade.generate).toBeCalledTimes(0)

            })

            it("should be approved ", async () => {
                mockPaymentFacade.process = mockPaymentFacade.process.mockReturnValue({
                    transaction: "1t",
                    orderId: "1o",
                    amount: 100,
                    status: "approved",
                    createdAt: new Date(),
                    updatedAt: new Date(),
                })

                const input: PlaceOrderInputDto = {
                    clientId: '1c',
                    products: [{ productId: '1' }, { productId: '2' }]
                }

                let output = await placeOrderUseCase.execute(input)

                expect(output.invoiceId).toBe("1i")
                expect(output.total).toBe(300)
                expect(output.products).toStrictEqual([{ productId: '1' }, { productId: '2' }])
                expect(mockClientFacade.find).toHaveBeenCalled()
                expect(mockClientFacade.find).toHaveBeenCalledWith({ id: "1c" })
                expect(mockValidateProducts).toBeCalledTimes(1)
                expect(mockGetProduct).toBeCalledTimes(2)
                expect(mockCheckoutRepo.addOrder).toBeCalledTimes(1)
                expect(mockPaymentFacade.process).toBeCalledTimes(1)
                expect(mockPaymentFacade.process).toHaveBeenCalledWith({
                  orderId: output.id,
                  amount: output.total,
                })
                expect(mockInvoiceFacade.generate).toBeCalledTimes(1)
                expect(mockInvoiceFacade.generate).toHaveBeenCalledWith({
                    name: clientProps.name,
                    document: clientProps.document,
                    street: clientProps.street,
                    number: clientProps.number,
                    complement: clientProps.complement,
                    city: clientProps.city,
                    state: clientProps.state,
                    zipCode: clientProps.zipCode,
                    items: [
                        {
                            id:products["1"].id.id,
                            name: products["1"].name,
                            price: products["1"].salesPrice,
                        },
                        {
                            id:products["2"].id.id,
                            name: products["2"].name,
                            price: products["2"].salesPrice,
                        },
                    ],
                })
            })
        })

        describe("validate Products Method", () => {
            //@ts-expect-error - no params in constructor
            const placeOrderUseCase = new PlaceOrderUseCase()

            it("should throw and error if no products are selected", async () => {
                const input: PlaceOrderInputDto = {
                    clientId: '0',
                    products: []
                }

                await expect(placeOrderUseCase["validateProducts"](input)).rejects.toThrow(new Error("No products selected"))
            })

            it("should throw an error when product is out of stock", async () => {
                const mockProductFacade = {
                    checkStock: jest.fn(({ productId }: { productId: string }) =>
                        Promise.resolve({
                            productId,
                            stock: productId === '1' ? 0 : 1
                        })
                    ),
                };

                //@ts-expect-error - force set productFacade
                placeOrderUseCase["_productFacade"] = mockProductFacade

                let input: PlaceOrderInputDto = {
                    clientId: '0',
                    products: [{ productId: '1' }]
                };

                await expect(placeOrderUseCase["validateProducts"](input)).rejects.toThrow(new Error("Product 1 is not available in stock"))

                input = {
                    clientId: '0',
                    products: [{ productId: '0' }, { productId: '1' }]
                };

                await expect(placeOrderUseCase["validateProducts"](input)).rejects.toThrow(new Error("Product 1 is not available in stock"))
                expect(mockProductFacade.checkStock).toHaveBeenCalledTimes(3)

                input = {
                    clientId: '0',
                    products: [{ productId: '0' }, { productId: '1' }, { productId: '2' }]
                };

                await expect(placeOrderUseCase["validateProducts"](input)).rejects.toThrow(new Error("Product 1 is not available in stock"))
                expect(mockProductFacade.checkStock).toHaveBeenCalledTimes(5)



            })
        })

        describe("GET PRODUCTS METHOD", () => {
            beforeAll(() => {
                jest.useFakeTimers("modern"),
                    jest.setSystemTime(mockDate)
            });

            afterAll(() => {
                jest.useRealTimers();
            });

            //@ts-expect-error - no params in constructor
            const placeOrderUseCase = new PlaceOrderUseCase();

            it("should thrown an error when product is not found", async () => {
                const mockCatalogFacade = {
                    find: jest.fn().mockResolvedValue(null),
                }
                //@ts-expect-error - force set catalogFacade
                placeOrderUseCase["_catalogFacade"] = mockCatalogFacade
                await expect(placeOrderUseCase["getProduct"]("0")).rejects.toThrow(new Error("Product not found"))
            })

            it("should return a product", async () => {
                const mockCatalogFacade = {
                    find: jest.fn().mockResolvedValue({
                        id: '0',
                        name: 'test',
                        salesPrice: 1,
                        description: 'test',
                    }),
                }

                //@ts-expect-error - force set catalogFacade
                placeOrderUseCase["_catalogFacade"] = mockCatalogFacade
                const product = await placeOrderUseCase["getProduct"]("0")
                expect(product.description).toBe("test")
                expect(product.id.id).toBe("0")
                expect(product.name).toBe("test")
                expect(product.salesPrice).toBe(1)

                expect(mockCatalogFacade.find).toHaveBeenCalledTimes(1)

            })

        })
    })
})