function changeTheme() {
    // Check if the user prefers dark mode
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        document.querySelector(".app").classList.add('dark');
        return "dark";
    } else {
        document.querySelector(".app").classList.add('light');
        return "light";
    }
}

export default changeTheme;