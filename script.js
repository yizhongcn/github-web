// 计数器交互
const btn = document.getElementById('counterBtn');
const countEl = document.getElementById('count');
let count = 0;

btn.addEventListener('click', () => {
  count++;
  countEl.textContent = count;
});

// 页面加载提示
console.log('✅ GitHub Pages 站点加载成功！');
