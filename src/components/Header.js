import { Link } from "react-router-dom";
import logo from ".././assets/img/argentBankLogo.png";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../features/SignIn";
import { useNavigate } from "react-router-dom";

const HeaderNav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px 20px;
`;

const NavLink = styled(Link)`
  font-weight: bold;
  color: #2c3e50;
`;

const NavLinkLogo = styled(NavLink)`
  display: flex;
  align-items: center;
`;

const NavLinkItem = styled(NavLink)`
  text-decoration: none;
  margin-right: 0.5rem;
  &:hover {
    text-decoration: underline;
  }
`;

const NavLinkLogoImgContainer = styled.div`
  display: flex;
  align-items: center;
`;

const NavLinkLogoImg = styled.img`
  max-width: 100%;
  width: 200px;
`;

export default function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isSignedIn = useSelector((state) => state.SignIn.isLoggedIn);
  const userInfo = useSelector((state) => state.SignIn.data.user);
  const logOutClick = () => {
    navigate("/Home");
    dispatch(logout());
  };
  let navlinkItem;
  if (isSignedIn) {
    console.log(isSignedIn);
    console.log(userInfo);
    if (userInfo) {
      navlinkItem = (
        <>
          <div className="nav-link-item-containr">
            <NavLinkItem to="/User">
              <i className="fa fa-user-circle"></i>
              &nbsp;{userInfo.firstName}
            </NavLinkItem>
            <NavLinkItem
              onClick={(e) => {
                e.preventDefault();
                logOutClick();
              }}
            >
              <i className="fa fa-sign-out"></i>
              &nbsp;Sign Out
            </NavLinkItem>
          </div>
        </>
      );
      console.log(navlinkItem);
    }
  } else {
    console.log(isSignedIn);
    navlinkItem = (
      <NavLinkItem to="/Sign-in">
        <i className="fa fa-user-circle"></i>
        &nbsp;Sign In
      </NavLinkItem>
    );
  }
  return (
    <HeaderNav>
      <NavLinkLogo to="/">
        <NavLinkLogoImgContainer>
          <NavLinkLogoImg src={logo} alt="Argent Bank Logo"></NavLinkLogoImg>
        </NavLinkLogoImgContainer>
        <h1 className="sr-only">Argent Bank</h1>
      </NavLinkLogo>
      {navlinkItem}
    </HeaderNav>
  );
}
