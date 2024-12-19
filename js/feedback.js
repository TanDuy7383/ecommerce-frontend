document.addEventListener('DOMContentLoaded', () => {
    const feedbackForm = document.getElementById('feedback-form');

    feedbackForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const formData = new FormData(feedbackForm);
        const data = Object.fromEntries(formData.entries());

        fetch('https://your-server-endpoint.com/feedback', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(result => {
            alert('Phản hồi của bạn đã được gửi thành công!');
            feedbackForm.reset();  // Reset lại form sau khi gửi thành công
        })
        .catch(error => {
            console.error('Có lỗi xảy ra:', error);
            alert('Có lỗi xảy ra khi gửi phản hồi. Vui lòng thử lại sau.');
        });
    });
});
