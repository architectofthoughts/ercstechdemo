document.addEventListener("DOMContentLoaded", function() {
    const sidebar = document.querySelector('.sidebar');
    if (sidebar) {
        // Restore scroll position
        const savedScroll = sessionStorage.getItem('sidebarScroll');
        if (savedScroll) {
            sidebar.scrollTop = savedScroll;
        }

        // Save scroll position before leaving the page
        window.addEventListener('beforeunload', function() {
            sessionStorage.setItem('sidebarScroll', sidebar.scrollTop);
        });
    }
});
