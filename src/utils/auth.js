// Utility to get/set users in localStorage
function getStoredUsers() {
    const data = localStorage.getItem("users");
    return data ? JSON.parse(data) : [];
}
function setStoredUsers(users) {
    localStorage.setItem("users", JSON.stringify(users));
}
function setCurrentUser(user) {
    localStorage.setItem("currentUser", JSON.stringify(user));
}
function getCurrentUser() {
    const data = localStorage.getItem("currentUser");
    return data ? JSON.parse(data) : null;
}

export function login({ email, password }) {
    const users = getStoredUsers();
    const user = users.find(
        (u) => u.email === email && u.password === password,
    );
    if (user) {
        setCurrentUser(user);
        return Promise.resolve(user);
    }
    return Promise.reject("Invalid credentials");
}

export function register({ name, avatar, email, password }) {
    let users = getStoredUsers();
    if (users.find((u) => u.email === email)) {
        return Promise.reject("User already exists");
    }
    const newUser = { name, avatar, email, password };
    users.push(newUser);
    setStoredUsers(users);
    setCurrentUser(newUser);
    return Promise.resolve(newUser);
}

export function getUserInfo() {
    return Promise.resolve(getCurrentUser());
}
