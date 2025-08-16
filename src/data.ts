import { Food } from "./app/shared/models/food";
import { Tag } from "./app/shared/models/Tag";

export const Sample_Foods: Food[] = [
    {
        id: "1",
        name: "Pizza",
        price: 10,
        tags: ["FastFood", "Pizza", "Lunch"],
        favorite: true,
        stars: 4.5,
        imageUrl: "/assets/food-1.jpg",
        origins: ["Italy"],
        cooktime: "10-20"
    },
    {
        id: "2",
        name: "Burger",
        price: 8,
        tags: ["FastFood", "Burger", "Lunch"],
        favorite: false,
        stars: 4.0,
        imageUrl: "/assets/food-2.jpg",
        origins: ["USA"],
        cooktime: "15-25"
    },
    {
        id: "3",
        name: "Sushi",
        price: 12,
        tags: ["Japanese", "Sushi", "Dinner"],
        favorite: true,
        stars: 4.8,
        imageUrl: "/assets/food-3.jpg",
        origins: ["Japan"],
        cooktime: "20-30"
    }
]

export const Sample_Tags:Tag[] = [
    { name: "FastFood", count: 10 },
    { name: "Pizza", count: 5 },
    { name: "Burger", count: 8 },
    { name: "Japanese", count: 3 },
    { name: "Sushi", count: 4 },
    { name: "Lunch", count: 6 },
    { name: "Dinner", count: 2 }
]