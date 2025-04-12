import {
  AppBar,
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from '@mui/material';
import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import dualitySocialSymbol from '../assets/DSImageOnlySmall.png';
import { AuthContext } from '../auth-provider.tsx';
import { CommentMenuOption, useMenu } from '../menu-context.tsx';

const TopMenu: React.FC = () => {
  const { isAuthenticated, logout, user } = useContext(AuthContext);
  const { commentOptions } = useMenu();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [commentsAnchorEl, setCommentsAnchorEl] = useState<null | HTMLElement>(
    null,
  );
  const [helpAnchorEl, setHelpAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCommentsMenu = (event: React.MouseEvent<HTMLElement>) => {
    setCommentsAnchorEl(event.currentTarget);
  };

  const handleHelpMenu = (event: React.MouseEvent<HTMLElement>) => {
    setHelpAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setCommentsAnchorEl(null);
    setHelpAnchorEl(null);
  };

  return (
    <AppBar
      position="fixed"
      sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
    >
      <Toolbar sx={{ minHeight: 64 }}>
        <Box display="flex" alignItems="center" flexGrow={1}>
          <img
            src={dualitySocialSymbol}
            alt="Duality Social"
            style={{ height: 40, marginRight: 10 }}
          />
          <Typography variant="h6" component="div">
            <span
              style={{
                fontFamily: 'Electric Shocker, Arial, sans-serif',
                fontSize: '2rem',
              }}
            >
              Duality
            </span>
            <span
              style={{ fontFamily: 'Eurostile Extended, Arial, sans-serif' }}
            >
              {' '}
              Social
            </span>
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
                  <i className="fa-solid fa-comment" />
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
                    ),
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
                <i className="fa-solid fa-user" />
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
                    navigate(`/profile/${user?.username}`);
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
            <div>
              <IconButton
                size="large"
                aria-label="help"
                aria-controls="help-menu"
                aria-haspopup="true"
                onClick={handleHelpMenu}
                color="inherit"
              >
                <i className="fa-solid fa-question-circle" />
              </IconButton>
              <Menu
                id="help-menu"
                anchorEl={helpAnchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(helpAnchorEl)}
                onClose={handleClose}
              >
                <MenuItem
                  component={Link}
                  to="/help/post-format"
                  onClick={handleClose}
                >
                  Post Formatting Guide
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
