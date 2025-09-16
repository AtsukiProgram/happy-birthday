class BirthdayApp {
    constructor() {
        this.targetDate = new Date('2025-09-12T00:00:00');
        this.correctPassword = 'keisukehappy';

        // パスワード関連の要素
        this.passwordScreen = document.getElementById('password-screen');
        this.passwordInput = document.getElementById('password-input');
        this.passwordSubmit = document.getElementById('password-submit');
        this.errorMessage = document.getElementById('error-message');
        this.mainContent = document.getElementById('main-content');

        // メインコンテンツの要素
        this.celebrationBtn = document.getElementById('celebration-btn');
        this.banner = document.getElementById('banner');
        this.leftCracker = document.getElementById('left-cracker');
        this.rightCracker = document.getElementById('right-cracker');
        this.countdownElements = {
            days: document.getElementById('days'),
            hours: document.getElementById('hours'),
            minutes: document.getElementById('minutes'),
            seconds: document.getElementById('seconds')
        };

        this.init();
    }

    init() {
        // パスワード認証のイベントリスナー
        this.passwordSubmit.addEventListener('click', () => this.checkPassword());
        this.passwordInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.checkPassword();
            }
        });

        // パスワード入力フィールドにフォーカス
        this.passwordInput.focus();
    }

    checkPassword() {
        const inputPassword = this.passwordInput.value;

        if (inputPassword === this.correctPassword) {
            // 正しいパスワードの場合
            this.showMainContent();
        } else {
            // 間違ったパスワードの場合
            this.showError();
        }
    }

    showError() {
        this.errorMessage.classList.remove('error-hidden');
        this.errorMessage.classList.add('error-visible');
        this.passwordInput.value = '';
        this.passwordInput.focus();

        // 3秒後にエラーメッセージを非表示
        setTimeout(() => {
            this.errorMessage.classList.remove('error-visible');
            this.errorMessage.classList.add('error-hidden');
        }, 3000);
    }

    showMainContent() {
        // パスワード画面を非表示
        this.passwordScreen.classList.add('password-hidden');

        // メインコンテンツを表示
        setTimeout(() => {
            this.passwordScreen.style.display = 'none';
            this.mainContent.classList.remove('content-hidden');
            this.mainContent.classList.add('content-visible');

            // メインアプリケーションを初期化
            this.initMainApp();
        }, 500);
    }

    initMainApp() {
        // カウントダウンを開始
        this.updateCountdown();
        this.countdownInterval = setInterval(() => this.updateCountdown(), 1000);

        // お祝いボタンのイベントリスナー
        this.celebrationBtn.addEventListener('click', () => this.triggerCelebration());

        // スムーズスクロール
        document.addEventListener('wheel', (e) => {
            if (e.deltaY > 0) {
                const countdownSection = document.getElementById('countdown-section');
                countdownSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }

    updateCountdown() {
        const now = new Date().getTime();
        const targetTime = this.targetDate.getTime();
        const difference = targetTime - now;

        if (difference > 0) {
            const days = Math.floor(difference / (1000 * 60 * 60 * 24));
            const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((difference % (1000 * 60)) / 1000);

            this.countdownElements.days.textContent = days;
            this.countdownElements.hours.textContent = hours;
            this.countdownElements.minutes.textContent = minutes;
            this.countdownElements.seconds.textContent = seconds;
        } else {
            // 誕生日になった場合
            this.countdownElements.days.textContent = '0';
            this.countdownElements.hours.textContent = '0';
            this.countdownElements.minutes.textContent = '0';
            this.countdownElements.seconds.textContent = '0';

            // 次の年の誕生日に更新
            this.targetDate.setFullYear(this.targetDate.getFullYear() + 1);
        }
    }

    triggerCelebration() {
        // ボタンを非表示にする
        this.celebrationBtn.classList.remove('visible');
        this.celebrationBtn.classList.add('hidden');

        // クラッカーを表示
        this.leftCracker.classList.add('show');
        this.rightCracker.classList.add('show');

        // 垂れ幕を表示
        this.banner.classList.add('drop-in');
        this.banner.style.opacity = '1';

        // 5秒後に垂れ幕とクラッカーを退場させてボタンを再表示
        setTimeout(() => {
            this.banner.classList.remove('drop-in');
            this.banner.classList.add('drop-out');

            // クラッカーを隠す
            this.leftCracker.classList.remove('show');
            this.leftCracker.classList.add('hide');
            this.rightCracker.classList.remove('show');
            this.rightCracker.classList.add('hide');

            // 垂れ幕が完全に退場した後にボタンを再表示
            setTimeout(() => {
                this.celebrationBtn.classList.remove('hidden');
                this.celebrationBtn.classList.add('visible');
                this.banner.classList.remove('drop-out');
                this.banner.style.opacity = '0';

                // クラッカーのクラスをリセット
                this.leftCracker.classList.remove('hide');
                this.rightCracker.classList.remove('hide');
            }, 2000);
        }, 5000);
    }
}

// ページ読み込み完了時に初期化
document.addEventListener('DOMContentLoaded', () => {
    new BirthdayApp();
});
