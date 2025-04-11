async function generateModel() {
    const clothingImage = document.getElementById('clothingImage').files[0];
    const clothingType = document.getElementById('clothingType').value;
    const status = document.getElementById('status');
    const modelImage = document.getElementById('modelImage');
    const downloadLink = document.getElementById('downloadLink');

    if (!clothingImage || !clothingType) {
        status.textContent = '请上传图片并填写服装类型！';
        return;
    }

    status.textContent = '正在生成...';
    modelImage.style.display = 'none';
    downloadLink.style.display = 'none';

    const formData = new FormData();
    formData.append('image', clothingImage);
    formData.append('clothingType', clothingType);

    try {
        // 替换为你的Render.com后端URL
        const response = await fetch('https://your-render-app.onrender.com/generate', {
            method: 'POST',
            body: formData
        });

        const data = await response.json();
        if (data.success) {
            modelImage.src = data.imageUrl;
            modelImage.style.display = 'block';
            downloadLink.href = data.imageUrl;
            downloadLink.style.display = 'block';
            status.textContent = '生成成功！';
        } else {
            status.textContent = '生成失败：' + data.error;
        }
    } catch (error) {
        status.textContent = '错误：' + error.message;
    }
}