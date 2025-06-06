// 切換登入方式（身分證 / 帳號）
const tabs = document.querySelectorAll(".tab");
const forms = document.querySelectorAll(".form");

alert("提醒您：本頁為仿網路郵局介面之學生專案，僅供展示與練習，不具備真實功能，請勿輸入真實資料。");

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
    btn.addEventListener("click", (e) => {
        // 取得當前顯示的表單
        const activeForm = btn.closest('.form');
        if (!activeForm) return;
        let hasEmpty = false;
        // 移除舊的錯誤訊息
        activeForm.querySelectorAll('.required-msg').forEach(msg => msg.remove());
        // 檢查所有 input 欄位
        activeForm.querySelectorAll('input').forEach(input => {
            if (input.value.trim() === "") {
                hasEmpty = true;
                // 只在欄位下方插入一次提示
                if (!input.nextElementSibling || !input.nextElementSibling.classList.contains('required-msg')) {
                    const msg = document.createElement('div');
                    msg.textContent = '*此為必填欄位';
                    msg.className = 'required-msg';
                    msg.style.color = 'red';
                    msg.style.fontSize = '0.9em';
                    msg.style.marginTop = '2px';
                    // 處理密碼欄位包在 wrapper 內的情況
                    if (input.parentElement.classList.contains('password-wrapper')) {
                        input.parentElement.after(msg);
                    } else {
                        input.after(msg);
                    }
                }
            }
        });
        if (hasEmpty) {
            e.preventDefault();
            return;
        }
        alert("登入成功！歡迎使用中華郵政網路郵局 👋");
    });
});
