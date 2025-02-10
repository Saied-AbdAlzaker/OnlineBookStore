// import axios from "axios";
// import { createContext, useState, useEffect } from "react";
// import { toast } from "react-toastify";
// import { DASHBOARD } from "../../Constants/END_POINTS";

// interface CartItem extends Product {
//   quantity: number;
//   book: string;
// }

// interface CartContextType {
//   cartItems: CartItem[];
//   addToCart: (product: Product) => void;
//   removeFromCart: (productId: string) => void;
//   updateCartItemQuantity: (productId: string, newQuantity: number) => void;
//   categories: any[];
//   books: any[];
//   cartId: any;
//   total: any;
//   loading: boolean;
//   getMyBasket: () => void;
//   confirmDelete: any;
//   setConfirmDelete: any;
//   setLoading: any;
// }

// export const CartContext = createContext<CartContextType | null>(null);

// export default function CartContextProvider(props: any) {
//   const [cartItems, setCartItems] = useState([]);
//   const [categories, setCategories] = useState<any[]>([]);
//   const [books, setBooks] = useState([]);
//   const [cartId, setCartId] = useState<string | null>(null);
//   const [total, setTotal] = useState(0);
//   const [loading, setLoading] = useState(false);
//   const [confirmDelete, setConfirmDelete] = useState<{
//     productId: string;
//     productName: string;
//   } | null>(null);
// }

// // Add To Cart
// const addToCart = async (product: any) => {
//   const existingItem = cartItems.find((item) => item.id === product.id);

//   if (existingItem) {
//     toast.info(`${product.name} is already in your cart`);
//     return;
//   }

//   try {
//     const payload = {
//       book: product.id,
//       quantity: 1,
//     };

//     const response = await axios.post(`${DASHBOARD.basket}`, payload);
//     if (response.status === 200) {
//       await getMyBasket();
//       toast.success(`${product.name} has been added to the cart!`);
//     }
//   } catch (error) {
//     console.log("Error adding product to cart:", error);
//     toast.error("An error occurred while adding the product to the cart.");
//   }
// };

// // Remove From Cart
// const removeFromCart = async (productId: string) => {
//   try {
//     const updatedCartItems = cartItems.filter(
//       (item) => item.book !== productId
//     );

//     const payload = {
//       items: updatedCartItems.map((item) => ({
//         book: item.book,
//         quantity: item.quantity.toString(),
//       })),
//     };
//     console.log(`cart id : ${cartId}`);

//     const response = await axios.put(`${DASHBOARD.basket}/${cartId}`, payload);
//     if (response.status === 200 && response.data.status === "SUCCESS") {
//       setCartItems(updatedCartItems);
//       toast.success("product removed from the cart");
//     } else {
//       throw new Error("Failed to remove product from the cart");
//     }
//   } catch (error) {
//     console.log("Error removing product from the cart: ", error.message);
//     toast.error(error.message || "An error occurred while removing the cart. ");
//   }
// };

// // Update the quantity of a product in the cart
// const updateCartItemQuantity = async (
//   productId: string,
//   newQuantity: number
// ) => {
//   setLoading(true);

//   try {
//     if (newQuantity <= 0) {
//       toast.error("Quantity must be at least 1.");
//       return;
//     }

//     const updatedCartItems = cartItems.map((item) => {
//       if (item.book === productId) {
//         return { ...item, quantity: newQuantity };
//       }
//       return item;
//     });

//     const payload = {
//       items: updatedCartItems.map((item) => ({
//         book: item.book,
//         quantity: item.quantity.toString(),
//       })),
//     };

//     const response = await axios.put(`${DASHBOARD.basket}/${cartId}`, payload);
//     if (response.status === 200 && response.data.status === "SUCCESS") {
//       setCartItems(updatedCartItems);
//       setLoading(false);
//       toast.success("Quantity Updated !");
//     } else {
//       throw new Error("Failed to update cart.");
//     }
//   } catch (error: any) {
//     console.log("Error updating cart: ", error);
//     toast.error(error.message || "An error occurred while updating the cart. ");
//   }
// };

// //
// const getMyBasket = async () => {
//   setLoading(true);
//   try {
//     const response = await axios.get(`${Basket}`);

//     const items = response.data.items || [];
//     const cartId = response.data._id;
//     const total = response.total;
//     console.log(items);

//     if (items.length === 0) {
//       setCartItems([]);
//       setLoading(false);
//       return;
//     }

//     setCartItems(items);
//     setCartId(cartId);
//     setTotal(total);

//     // toast.success("Basket Loaded Successfully");
//   } catch (error: any) {
//     console.error("Error Fetching Basket From Api: ", error);
//     toast.error(error.message || "Failed to fetch basket. ");
//   } finally {
//     setLoading(false);
//   }
// };

// // Fetch all books
// const fetchBooks = async () => {
//   setLoading(true);
//   try {
//     const response = await axios.get(`${DASHBOARD.books}`);
//     const categoriesWithBooks = response.data.filter(
//       (category: any) => category.books.length > 0
//     );

//     const allBooks =
//       categoriesWithBooks.flatMap((category: any) =>
//         category.books.map((book: any, index: number) => ({
//           id: book._id,
//           name: book.name,
//           author: book.author,
//           price: book.price,
//           iamge: TestImage[index % TestImage.length],
//           categoryId: category._id,
//         }))
//       ) || [];
//     setBooks(allBooks);
//   } catch (error: any) {
//     console.error("Error Fetching Books From Api: ", error);
//     throw new Error(error.response.data.message);
//   } finally {
//     setLoading(false);
//   }
// };

// //
// // useEffect(() => {
// //   console.log("Cart items after update", cartItems);
// // }, [cartItems]);
// // useEffect(() => {
// //   console.log("Books after update", books);
// // }, [books]);

// // Categories
// const fetchCategories = async () => {
//   setLoading(true);
//   try {
//     const response = await axios.get(`${DASHBOARD.category}`);
//     const categoriesWithBooks = response.data.filter(
//       (category: any) => category.books.length > 0
//     );

//     const meregeData = categoriesWithBooks.map((cate: any, index: number) => ({
//       ...cate,
//       image: cateImage[index % cateImage.length],
//     }));
//     setCategories(meregeData);
//   } catch (error: any) {
//     console.error("Error Fetching Categories From Api: ", error);
//     toast.error(error.response.data.message);
//   } finally {
//     setLoading(false);
//   }
// };

// useEffect(() => {
//   fetchCategories();
//   fetchBooks();
//   getMyBasket();
// }, []);

// //

// return (
//   <CartContext.Provider
//     value={{
//       cartItems,
//       addToCart,
//       removeFromCart,
//       updateCartItemQuantity,
//       categories,
//       books,
//       cartId,
//       total,
//       loading,
//       setLoading,
//       getMyBasket,
//       confirmDelete,
//       setConfirmDelete,
//     }}
//   >
//     {props.children}
//   </CartContext.Provider>
// );
