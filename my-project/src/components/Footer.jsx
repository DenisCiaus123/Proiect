export const Footer = () => {
    const currentYear = new Date().getFullYear();
    return (
        <footer>
            <ul className="footer-list">
                <li className="footer-link"><a href="">Link 1 PH</a></li>
                <li className="footer-link"><a href="">Link 2 PH</a></li>
                <li className="copyright">Copyright {currentYear}</li>
            </ul>
        </footer>
    );
};