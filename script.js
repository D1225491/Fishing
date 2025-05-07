// 切換登入方式（身分證 / 帳號）
const tabs = document.querySelectorAll(".tab");
const forms = document.querySelectorAll(".form");

tabs.forEach((tab, index) => {
    tab.addEventListener("click", () => {
        // 標籤樣式切換
        tabs.forEach(t => t.classList.remove("active"));
        tab.classList.add("active");

        // 顯示對應表單
        forms.forEach(f => f.classList.remove("active"));
        forms[index].classList.add("active");
    });
});

// 切換密碼顯示 / 隱藏
const toggleButtons = document.querySelectorAll(".toggle-visibility");

toggleButtons.forEach(button => {
    button.addEventListener("click", () => {
        const input = button.previousElementSibling;
        if (input.type === "password") {
            input.type = "text";
            button.textContent = "🙈";
        } else {
            input.type = "password";
            button.textContent = "👁️";
        }
    });
});

// 假登入按鈕
const loginButtons = document.querySelectorAll(".login-button");

loginButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        alert("登入成功！歡迎使用中華郵政網路郵局 👋");
    });
});
