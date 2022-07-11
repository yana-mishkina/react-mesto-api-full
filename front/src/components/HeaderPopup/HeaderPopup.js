function HeaderPopup(props) {

  return(
    <div className={`header-popup ${props.isBurgerOpen ? 'header-popup_closed' : ''}`}>
      <p className="header-popup__email">{props.email}</p>
      <button className="button header-popup__button" onClick={props.onSignOut}>Выйти</button>
    </div>
  );
}

export default HeaderPopup;