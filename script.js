document.addEventListener('DOMContentLoaded', () => {
    const copyUrlButton = document.getElementById('copyUrlButton');
    const originalButtonText = copyUrlButton.innerHTML; // Store original HTML content

    if (copyUrlButton) {
        copyUrlButton.addEventListener('click', () => {
            const urlToCopy = window.location.href;

            navigator.clipboard.writeText(urlToCopy).then(() => {
                // Success
                copyUrlButton.innerHTML = '<i class="fas fa-check"></i> 복사 완료!';
                copyUrlButton.style.backgroundColor = '#28a745'; // Green for success

                setTimeout(() => {
                    copyUrlButton.innerHTML = originalButtonText;
                    copyUrlButton.style.backgroundColor = '#007bff'; // Revert to original color
                }, 2000); // Revert after 2 seconds
            }).catch(err => {
                // Error (e.g., on insecure contexts http:// not https://, or permissions denied)
                console.error('URL 복사 실패:', err);
                copyUrlButton.innerHTML = '<i class="fas fa-times"></i> 복사 실패';
                copyUrlButton.style.backgroundColor = '#dc3545'; // Red for error

                // Try fallback for older browsers or insecure contexts (less reliable)
                try {
                    const textArea = document.createElement('textarea');
                    textArea.value = urlToCopy;
                    textArea.style.position = 'fixed'; // Prevent scrolling to bottom
                    document.body.appendChild(textArea);
                    textArea.focus();
                    textArea.select();
                    document.execCommand('copy');
                    document.body.removeChild(textArea);
                    
                    // If execCommand worked, update button (may not always be detectable)
                    copyUrlButton.innerHTML = '<i class="fas fa-check"></i> 복사 완료! (대체)';
                    copyUrlButton.style.backgroundColor = '#28a745';

                } catch (fallbackErr) {
                    console.error('대체 복사 방법 실패:', fallbackErr);
                    alert('URL을 복사할 수 없습니다. 수동으로 복사해주세요.');
                }


                setTimeout(() => {
                    copyUrlButton.innerHTML = originalButtonText;
                    copyUrlButton.style.backgroundColor = '#007bff';
                }, 3000); // Longer timeout for error messages
            });
        });
    }
});