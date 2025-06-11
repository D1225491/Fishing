// 警示框
window.onload = function () {
    const modal = document.getElementById("alertModal");
    const dontShow = localStorage.getItem("hidePostModal");

    if (dontShow !== "true") {
        modal.style.display = "flex";
    }
};
function closeModal() {
    const checkbox = document.getElementById("dontShowAgain");
    if (checkbox.checked) {
        localStorage.setItem("hidePostModal", "true");
    }
    document.getElementById("alertModal").style.display = "none";
}
localStorage.removeItem("hidePostModal");


// 切換登入方式（身分證 / 帳號）
const tabs = document.querySelectorAll(".tab");
const forms = document.querySelectorAll(".form");

tabs.forEach((tab, index) => {
    tab.addEventListener("click", () => {
        // 標籤樣式切換
        tabs.forEach((t, i) => {
            t.classList.remove("active");
            t.style.background = "white";
            t.style.color = "#9D9D9D"; // 灰色
        });
        tab.classList.add("active");
        tab.style.background = "#F2EBA1"; // 橘色底
        tab.style.color = "#6D973B"; // 綠色
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

// 驗證碼功能（canvas 版本）
function generateCaptcha() {
    return Math.floor(1000 + Math.random() * 9000).toString();
}

function drawCaptcha(canvas, code) {
    const ctx = canvas.getContext('2d');
    // 清空
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // 白底
    ctx.fillStyle = '#fff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    // 畫數字
    ctx.font = 'bold 22px monospace';
    ctx.fillStyle = '#222';
    ctx.textBaseline = 'middle';
    ctx.textAlign = 'center';
    ctx.fillText(code, canvas.width / 2, canvas.height / 2);
    // 畫黑色遮擋線
    for (let i = 0; i < 3; i++) {
        ctx.strokeStyle = '#222';
        ctx.beginPath();
        const y = Math.random() * canvas.height;
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, Math.random() * canvas.height);
        ctx.lineWidth = 1 + Math.random() * 1.5;
        ctx.stroke();
    }
}

function setCaptcha(form) {
    const canvas = form.querySelector('.captcha-canvas');
    if (canvas) {
        const code = generateCaptcha();
        drawCaptcha(canvas, code);
        canvas.dataset.captcha = code;
    }
}

// 初始化所有表單的驗證碼
forms.forEach(form => setCaptcha(form));

// 綁定更換驗證碼按鈕
const refreshBtns = document.querySelectorAll('.refresh-btn');
refreshBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const form = btn.closest('.form');
        setCaptcha(form);
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
            }
        });
        if (hasEmpty) {
            showModal("請完整填寫所有欄位");
            e.preventDefault();
            return;
        }
        // 驗證碼比對（canvas 版本）
        const captchaInput = activeForm.querySelector('.captcha-input');
        const captchaCanvas = activeForm.querySelector('.captcha-canvas');
        if (captchaInput && captchaCanvas) {
            if (captchaInput.value.trim() !== captchaCanvas.dataset.captcha) {
                alert('驗證碼錯誤');
                setCaptcha(activeForm); // 錯誤時自動換新驗證碼
                captchaInput.value = '';
                e.preventDefault();
                return;
            }
        }
        showModal("登入成功！歡迎使用中華郵政網路郵局 👋");
    });
});


// 郵件壽險保戶子女獎學金區塊顯示/隱藏
const scholarshipLink = document.getElementById("scholarship-link");
const mainContent = document.getElementById("main-content");
const scholarshipContent = document.getElementById("scholarship-content");
const backMainBtn = document.getElementById("back-main");

if (scholarshipLink && mainContent && scholarshipContent && backMainBtn) {
    scholarshipLink.addEventListener("click", function(e) {
        e.preventDefault();
        mainContent.style.display = "none";
        scholarshipContent.style.display = "block";
    });
    backMainBtn.addEventListener("click", function() {
        scholarshipContent.style.display = "none";
        mainContent.style.display = "flex";
    });
}

// 導覽頁面切換功能
const pageLinks = [
    { linkId: 'scholarship-link', contentId: 'scholarship-content' },
    { linkId: 'digital-link', contentId: 'digital-content' },
    { linkId: 'bond-link', contentId: 'bond-content' },
    { linkId: 'account-link', contentId: 'account-content' },
    { linkId: 'visa-link', contentId: 'visa-content' },
    { linkId: 'service-link', contentId: 'service-content' },
    { linkId: 'notification-link', contentId: 'notification-content' }
];

pageLinks.forEach(({ linkId, contentId }) => {
    const link = document.getElementById(linkId);
    const content = document.getElementById(contentId);
    if (link && content && mainContent) {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            mainContent.style.display = 'none';
            // 隱藏所有內容區塊
            pageLinks.forEach(({ contentId }) => {
                const c = document.getElementById(contentId);
                if (c) c.style.display = 'none';
            });
            content.style.display = 'block';
        });
    }
});

// 返回首頁功能
const backBtns = document.querySelectorAll('.back-main');
backBtns.forEach(btn => {
    btn.addEventListener('click', function() {
        // 隱藏所有內容區塊
        pageLinks.forEach(({ contentId }) => {
            const c = document.getElementById(contentId);
            if (c) c.style.display = 'none';
        });
        mainContent.style.display = 'flex';
    });
});

// 輪播圖片功能（支援多張圖）
const bannerImages = [
    "images/banner.png",
    "images/bingpot.png",
    "images/cash.png",
    "images/caution.png",
];
const bannerImgElement = document.querySelector(".banner-square img");
let bannerIndex = 0;

if (bannerImgElement) {
    bannerImgElement.addEventListener('click', function() {
        if (bannerImages[bannerIndex].includes('banner.png')) {
            window.open('https://165dashboard.tw/', '_blank');
        } else if (bannerImages[bannerIndex].includes('bingpot.png')) {
            window.open('https://lottery.post.gov.tw/atm2025/', '_blank');
        } else if (bannerImages[bannerIndex].includes('caution.png')) {
            window.open('https://www.post.gov.tw/post/FileCenter/post_ww2/post_docdata_att/att_content/C9D56323-D707-4CE1-8775-43E323136251/45D57972-97EE-492F-9BB7-A1EB8A381182.jpg', '_blank');
        } else if (bannerImages[bannerIndex].includes('cash.png')) {
            window.open('https://www.post.gov.tw/post/FileCenter/post_ww2/ad/ad_linkpage/1140101_cash.html', '_blank');
        }
    });
}

function showBannerImg(idx) {
    if (bannerImgElement) {
        bannerImgElement.src = bannerImages[idx];
    }
}
showBannerImg(bannerIndex);

setInterval(() => {
    bannerIndex = (bannerIndex + 1) % bannerImages.length;
    showBannerImg(bannerIndex);
}, 3000);

// 公告區綠色圓形下拉互動
function setupNoticeDropdowns() {
    const circles = document.querySelectorAll('.green-circle');
    circles.forEach(circle => {
        circle.addEventListener('click', function(e) {
            e.stopPropagation();
            // 關閉其他
            circles.forEach(c => { if (c !== circle) c.classList.remove('open'); });
            // 切換自己
            circle.classList.toggle('open');
        });
    });
    // 點擊其他地方自動收合
    document.addEventListener('click', function() {
        circles.forEach(c => c.classList.remove('open'));
    });
}
window.addEventListener('DOMContentLoaded', setupNoticeDropdowns);

// 若 tab 切換也需調整
const tabBtns = document.querySelectorAll('.tab');
tabBtns.forEach(btn => btn.addEventListener('click', adjustLoginPanelFont));

// 彈出通知訊息的 showModal 定義（改為 alert 版本）
function showModal(message) {
    alert(message);
}
