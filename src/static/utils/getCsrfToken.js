export const getCSRFToken = () => {
    console.log("getCSRFToken")
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.startsWith('csrftoken3=')) {
                cookieValue = cookie.substring('csrftoken3='.length, cookie.length);
                break;
            }
        }
    }
    console.log("getCSRFToken cookie val: ", cookieValue)
    return cookieValue;
};
