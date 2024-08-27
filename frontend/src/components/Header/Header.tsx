import React, { useEffect, useState } from 'react';
import { useLocation } from 'wouter';
import classes from './Header.module.scss';
import { BiMenuAltRight } from 'react-icons/bi';
import { AiOutlineClose } from 'react-icons/ai';
import { useSelector } from 'react-redux';
import { IRootState } from '../../store';
import { ROLES } from '../../api/auth/types';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [size, setSize] = useState({
    width: 0,
    height: 0,
  });
  const [location, setLocation] = useLocation();

  const menuToggleHandler = () => {
    setMenuOpen((s) => !s);
  };

  useEffect(() => {
    const handleResize = () => {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (size.width > 768 && menuOpen) {
      setMenuOpen(false);
    }
  }, [size.width, menuOpen]);

  useEffect(() => {
    setMenuOpen(true);
  }, [location]);

  const handleLinkClick = (path: string) => {
    if (location !== path) {
      setLocation(path);
      setMenuOpen(true);
    }
  };

  const payload = useSelector((state: IRootState) => ({
    accessToken: state.auth.authData.accessToken,
    role: state.auth.authData.role,
  }));

  return (
    <header className={classes.header}>
      <div className={classes.header__content}>
        <h2 className={classes.header__content__logo}>timetable</h2>
        <nav
          className={`${classes.header__content__nav} ${
            menuOpen ? classes.isMenu : ''
          }`}
        >
          <ul className={classes.header__content__nav__list}>
            <li onClick={() => handleLinkClick('/')}>
              <span
                className={`${classes.header__content__link} ${classes.innerLink}`}
              >
                главная
              </span>
            </li>

            {/* {payload.role === ROLES.ADMIN && ( */}
            <li onClick={() => handleLinkClick('/dashboard')}>
              <span
                className={`${classes.header__content__link} ${classes.innerLink}`}
              >
                администрирование
              </span>
            </li>
            {/* )} */}

            <li onClick={() => handleLinkClick('/signIn')}>
              <span
                className={`${classes.header__content__link} ${classes.innerLink}`}
              >
                профиль
              </span>
            </li>

            {/* {payload.accessToken && ( */}
            <li onClick={() => handleLinkClick('/generate')}>
              <span
                className={`${classes.header__content__link} ${classes.innerLink}`}
              >
                создать расписание
              </span>
            </li>
            {/* )} */}

            {/* {payload.accessToken && ( */}
            <li onClick={() => handleLinkClick('/add')}>
              <span
                className={`${classes.header__content__link} ${classes.innerLink}`}
              >
                добавить
              </span>
            </li>
            {/* )} */}
          </ul>
        </nav>
        <div className={classes.header__content__toggle}>
          {menuOpen ? (
            <BiMenuAltRight onClick={menuToggleHandler} />
          ) : (
            <AiOutlineClose onClick={menuToggleHandler} />
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
