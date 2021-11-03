import logoPath from "../images/logo.png";

function Header() {
  return (
    <header className="header">
      <img className="header__logo" src={logoPath} alt="header logo" />
    </header>
  );
}

export default Header;
