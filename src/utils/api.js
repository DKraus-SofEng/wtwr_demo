// Utility to get/set clothing items in localStorage
function getStoredClothingItems() {
    const data = localStorage.getItem("clothingItems");
    return data ? JSON.parse(data) : null;
}
function setStoredClothingItems(items) {
    localStorage.setItem("clothingItems", JSON.stringify(items));
}

// Utility to get/set users in localStorage
function getStoredUsers() {
    const data = localStorage.getItem("users");
    return data ? JSON.parse(data) : [];
}
function setStoredUsers(users) {
    localStorage.setItem("users", JSON.stringify(users));
}

// Utility to get/set current user
function getCurrentUser() {
    const data = localStorage.getItem("currentUser");
    return data ? JSON.parse(data) : null;
}
function setCurrentUser(user) {
    localStorage.setItem("currentUser", JSON.stringify(user));
}

// Initialize clothing items if not present
import { mockClothingItems } from "./mockData";
if (!getStoredClothingItems()) {
    setStoredClothingItems(mockClothingItems);
}

export function getClothingItems() {
    return Promise.resolve(getStoredClothingItems());
}

export function addItem({ name, imageUrl, weather }) {
    const items = getStoredClothingItems();
    const newItem = {
        _id: Date.now().toString(),
        name,
        imageUrl, // can be base64 or url
        weather,
        owner: getCurrentUser()?.email || "demo",
        likes: [],
    };
    items.unshift(newItem);
    setStoredClothingItems(items);
    return Promise.resolve(newItem);
}

export function deleteItem(id) {
    let items = getStoredClothingItems();
    items = items.filter((item) => item._id !== id);
    setStoredClothingItems(items);
    return Promise.resolve();
}

export function likeItem(id, userEmail) {
    const items = getStoredClothingItems();
    const item = items.find((i) => i._id === id);
    if (item && !item.isDefault && !item.likes.includes(userEmail)) {
        item.likes.push(userEmail);
        setStoredClothingItems(items);
    }
    return Promise.resolve(item);
}

export function unlikeItem(id, userEmail) {
    const items = getStoredClothingItems();
    const item = items.find((i) => i._id === id);
    if (item && !item.isDefault && item.likes.includes(userEmail)) {
        item.likes = item.likes.filter((e) => e !== userEmail);
        setStoredClothingItems(items);
    }
    return Promise.resolve(item);
}

export function getUserInfo() {
    return Promise.resolve(getCurrentUser());
}

export function updateUserProfile({ name, avatar }) {
    let user = getCurrentUser();
    if (user) {
        user = { ...user, name, avatar };
        setCurrentUser(user);
        // update in users list
        const users = getStoredUsers();
        const idx = users.findIndex((u) => u.email === user.email);
        if (idx !== -1) {
            users[idx] = user;
            setStoredUsers(users);
        }
    }
    return Promise.resolve(user);
}
