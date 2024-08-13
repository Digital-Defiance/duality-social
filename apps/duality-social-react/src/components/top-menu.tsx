import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Box,
} from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faComment } from '@fortawesome/free-solid-svg-icons';
import { AuthContext } from '../auth-provider';
import { CommentMenuOption, useMenu } from '../menu-context';
import dualitySocialSymbol from '../assets/DSImageOnlySmall.png';

const TopMenu: React.FC = () => {
  const { isAuthenticated, logout } = useContext(AuthContext);
  const { commentOptions } = useMenu();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [commentsAnchorEl, setCommentsAnchorEl] = useState<null | HTMLElement>(
    null
  );

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCommentsMenu = (event: React.MouseEvent<HTMLElement>) => {
    setCommentsAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setCommentsAnchorEl(null);
  };

  return (
    <AppBar position="fixed">
      <Toolbar>
        <Box display="flex" alignItems="center" flexGrow={1}>
          <img
            src={dualitySocialSymbol}
            alt="Duality Social"
            style={{ height: 40, marginRight: 10 }}
          />
          <Typography variant="h6" component="div">
            Duality Social
          </Typography>
        </Box>
        {isAuthenticated ? (
          <>
            <Button color="inherit" component={Link} to="/dashboard">
              Dashboard
            </Button>
            {commentOptions.length > 0 && (
              <div>
                <IconButton
                  size="large"
                  aria-label="show comments"
                  aria-controls="comments-menu"
                  aria-haspopup="true"
                  onClick={handleCommentsMenu}
                  color="inherit"
                >
                  <FontAwesomeIcon icon={faComment} />
                </IconButton>
                <Menu
                  id="comments-menu"
                  anchorEl={commentsAnchorEl}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={Boolean(commentsAnchorEl)}
                  onClose={handleClose}
                >
                  {commentOptions.map(
                    (option: CommentMenuOption, index: number) => (
                      <MenuItem
                        key={index}
                        onClick={() => {
                          option.action();
                          handleClose();
                        }}
                      >
                        {option.label}
                      </MenuItem>
                    )
                  )}
                </Menu>
              </div>
            )}
            <div>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <FontAwesomeIcon icon={faUser} />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem
                  onClick={() => {
                    navigate('/profile');
                    handleClose();
                  }}
                >
                  Profile
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    logout();
                    handleClose();
                  }}
                >
                  Logout
                </MenuItem>
              </Menu>
            </div>
          </>
        ) : (
          <Button color="inherit" component={Link} to="/login">
            Login
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default TopMenu;
