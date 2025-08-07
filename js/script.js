// 背景视频数组
const videos = [
    '/yanking3/videos/bg1.mp4',
    '/yanking3/videos/bg2.mp4',
    '/yanking3/videos/bg3.mp4'
];

// 随机选择背景视频
function setRandomBackground() {
    const randomIndex = Math.floor(Math.random() * videos.length);
    const videoSource = document.getElementById('videoSource');
    const bgVideo = document.getElementById('bgVideo');
    
    videoSource.src = videos[randomIndex];
    bgVideo.load();
    bgVideo.play();
}

// 音乐控制
const bgMusic = document.getElementById('bgMusic');
const musicBtn = document.getElementById('musicBtn');

// 尝试自动播放音乐
function initMusic() {
    bgMusic.volume = 0.5;
    
    // 检查本地存储中是否有音乐状态
    const musicState = localStorage.getItem('musicState');
    
    if (musicState === 'playing') {
        bgMusic.play().catch(e => {
            console.log("自动播放被阻止:", e);
        });
        musicBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
    } else {
        musicBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
    }
}

// 切换音乐播放状态
if (musicBtn) {
    musicBtn.addEventListener('click', () => {
        if (bgMusic.paused) {
            bgMusic.play();
            musicBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
            localStorage.setItem('musicState', 'playing');
        } else {
            bgMusic.pause();
            musicBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
            localStorage.setItem('musicState', 'paused');
        }
    });
}

// 相册标签过滤
function initGalleryTabs() {
    const tabs = document.querySelectorAll('.gallery-tab');
    const items = document.querySelectorAll('.gallery-item');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // 更新标签状态
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            
            const category = tab.dataset.category;
            
            // 过滤项目
            items.forEach(item => {
                if (category === 'all' || item.dataset.category === category) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
}

// 联系表单处理
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // 获取表单数据
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                subject: document.getElementById('subject').value,
                message: document.getElementById('message').value
            };
            
            // 这里应该是发送表单数据的代码
            // 现在只显示成功消息
            alert('消息已发送！感谢您的联系。');
            contactForm.reset();
        });
    }
}

// 页面加载时初始化
document.addEventListener('DOMContentLoaded', () => {
    setRandomBackground();
    initMusic();
    
    // 初始化特定页面的功能
    if (document.querySelector('.gallery-tabs')) {
        initGalleryTabs();
    }
    
    if (document.getElementById('contactForm')) {
        initContactForm();
    }
});