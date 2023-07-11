import { useState, useContext, useCallback, useEffect } from 'react';
import styles from './index.module.css';
import PhoneImg from '../../assets/images/phone.png';
import MOA from '../../assets/images/MOA_logo.png';
import Emblem from '../../assets/images/emblem.png';
import plusIcon from '../../assets/icons/plus.svg';
import Image from 'next/image';
import { AppContext } from '../../context';
import router from 'next/router';
import { v4 as uuidv4 } from 'uuid';
import { useLocalization } from '../../hooks';
import toast from 'react-hot-toast';
import { Select, MenuItem } from '@material-ui/core';

function NavBar() {
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const context = useContext(AppContext);
  const t = useLocalization();

  useEffect(() => {
    const storedLanguage = localStorage.getItem('locale');
    if (storedLanguage) {
      setSelectedLanguage(storedLanguage);
    } else {
      localStorage.setItem('locale', 'en');
    }
  }, []);

  const toggleLanguage = useCallback(
    (event: any) => {
      const newLanguage = event.target.value;
      localStorage.setItem('locale', newLanguage);
      context?.setLocale(newLanguage);
      setSelectedLanguage(newLanguage);
    },
    [context]
  );

  return (
    <div className={styles.navbar}>
      <div className={styles.newChatContainer}>
        <Select value={selectedLanguage} onChange={toggleLanguage}>
          <MenuItem value="en">English</MenuItem>
          <MenuItem value="hi">Hindi</MenuItem>
          <MenuItem value="bn">Bangla</MenuItem>
          <MenuItem value="ta">Tamil</MenuItem>
          <MenuItem value="te">Telugu</MenuItem>
        </Select>
      </div>
      <div className={styles.navbarHeading}>{t('label.title')}</div>
      <div className={styles.rightSideIcons}></div>
    </div>
  );
}

export default NavBar;
