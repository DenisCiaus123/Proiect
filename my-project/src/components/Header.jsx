export const Header = ({ title, subtitle, logo }) => {
    return (
        <nav className="navbar">
            <div className="navbar-logo">
                <img src={logo} alt="Logo" className="logo-img" />
            </div>
            <h1 className="navbar-title">{title}</h1>
            <h2 className="navbar-subtitle">{subtitle}</h2>
        </nav>
    );
};
