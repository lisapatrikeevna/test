import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import { Box } from '@mui/system';
// import avatar from '../assets/img.webp';
import avatar from '../../assets/img.webp';
import { HomeOutlined } from '@mui/icons-material';

type Props = {
  isOpenMainSideBar: boolean;
};

const AppPageMainSideBar = ({ isOpenMainSideBar }: Props) => {
  const handleAvatarClick = () => {};

  return (
    <Box
      sx={{
        height: '100vh',
        width: isOpenMainSideBar ? '250px' : '0px',
        transition: 'width 0.5s ease',
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        background: '#e0e0e0',
        padding: isOpenMainSideBar ? '10px' : '0px',
        overflow: 'hidden',
      }}
    >
      {isOpenMainSideBar && (
        <>
          <Box
            sx={{
              width: '60px',
              height: '60px',
              marginLeft: '30px',
              marginTop: '20px',
              borderRadius: '50%',
              overflow: 'hidden',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {/* <img
              src={avatar}
              alt="Avatar"
              onClick={handleAvatarClick}
              style={{ width: '100%', height: '100%' }}
            /> */}
          </Box>
          <ListItem
            disablePadding
            // className={activeItem === 'home' ? sidebar.active : ''}
            // onClick={() => {
            //   handleClick('home');
            //   setIsActive(false);
            // }}
          >
            <ListItemButton disableRipple>
              <ListItemIcon>
                <HomeOutlined />
              </ListItemIcon>
              <ListItemText primary="Home" />
            </ListItemButton>
          </ListItem>
        </>
      )}
    </Box>
  );
};

export default AppPageMainSideBar;
