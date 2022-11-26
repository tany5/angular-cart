export default interface Iproduct {
    id: number,
    productName: string,
    description: string,
    rating: number,
    price: number,
    productImg: string,
    isAvailable: boolean,
    color: string,
    reviews: string,
    count?: number
}