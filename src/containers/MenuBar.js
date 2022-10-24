import React, {useState} from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import InputBase from '@material-ui/core/InputBase';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import {alpha } from '@material-ui/core/styles/colorManipulator';
import { withStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import AddBox from '@material-ui/icons/AddBox';
import Home from '@material-ui/icons/Home';
import AccountCircle from '@material-ui/icons/AccountCircle';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/MoreVert';
import PowerSettingsNew from '@material-ui/icons/PowerSettingsNew';
import { updateInput } from '../actions';

const styles = theme => ({
  logo: {
    width: 400,
    height: 150
  },
  ncAccName: {
    marginLeft:20,
    marginRight: 20,
    fontSize: 25,
    marginTop: 30,
  },
  root: {
    width: '100%'
  },
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
      fontFamily: "'Leckerli One', cursive",
      cursor: 'pointer'
    }
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    border: "solid lightgray 1px",
    marginTop: 20,
    marginRight: theme.spacing.unit * 2,
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing.unit * 3,
      width: 'auto'
    }
  },
  searchIcon: {
    width: theme.spacing.unit * 9,
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  interact: {
    display: 'flex',
    alignItems: 'center',
    marginTop: 20,
  },
  inputRoot: {
    color: 'inherit',
    width: '100%'
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 10,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: 300
    }
  },
  sectionDesktop: {
    marginTop: 20,
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex'
    }
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none'
    }
  }
});

const PrimarySearchMenuBar = props => {

  const [state, setState] = useState({
    anchorEl: null,
    mobileMoreAnchorEl: null
  });

  const isMenuOpen = Boolean(state.anchorEl);
  const isMobileMenuOpen = Boolean(state.mobileMoreAnchorEl);
  const { classes, searchInput } = props;

  const handleHomeClick = mobile => {
    props.history.push('/dashboard');
    if (mobile) this.handleMobileMenuClose();
  };

  const handleNewPost = () => {
    props.history.push('/dashboard/new');
  };

  const handleProfileMenuOpen = event => {
    setState({ ...state, anchorEl: event.currentTarget });
  };

  const handleMobileMenuOpen = event => {
    setState({...state, mobileMoreAnchorEl: event.currentTarget });
  };

  const handleMobileMenuClose = () => {
    setState({ ...state, mobileMoreAnchorEl: null });
  };


  const handleMenuClose = props => {
    setState({ anchorEl: null, mobileMoreAnchorEl: null });
    handleMobileMenuClose();
  };

  const handleLogout = () => {
    localStorage.removeItem('userToken');
    props.history.replace('/login');
  };

  const handleInput = (e) => {
    props.updateInput(e.target.value);
  }

  const renderMenu = (
      <Menu
          anchorEl={state.anchorEl}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          open={isMenuOpen}
          onClose={handleMenuClose}
      >
        <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
  );
  const renderMobileMenu = (
      <Menu
          anchorEl={state.mobileMoreAnchorEl}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          open={isMobileMenuOpen}
          onClose={handleMenuClose}
      >
        <MenuItem onClick={() => handleHomeClick(true)}>
          <IconButton color="inherit">
            <Badge badgeContent={0} color="secondary">
              <Home />
            </Badge>
          </IconButton>
          <p>Dashboard</p>
        </MenuItem>
        <MenuItem onClick={handleMobileMenuClose}>
          <IconButton color="inherit">
            <Badge badgeContent={0} color="secondary">
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <p>Notifications</p>
        </MenuItem>
        <MenuItem onClick={handleProfileMenuOpen}>
          <IconButton color="inherit">
            <AccountCircle />
          </IconButton>
          <p>Profile</p>
        </MenuItem>
        <MenuItem onClick={handleLogout}>
          <IconButton color="inherit">
            <PowerSettingsNew />
          </IconButton>
          <p>Logout</p>
        </MenuItem>
      </Menu>
  );


    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <img alt="logo" className={classes.logo} src={"./newhow.png"}/>
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="Search…"
                value={searchInput}
                onChange={handleInput}
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput
                }}
              />
            </div>
            <div className={classes.interact}>
              <IconButton onClick={handleNewPost} color="inherit">
                <AddBox />
              </IconButton>
            </div>
            <div className={classes.grow} />
            <div className={classes.sectionDesktop}>
              <IconButton
                aria-owns={isMenuOpen ? 'material-appbar' : undefined}
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="inherit"
              >
                <AccountCircle />
                <p className={classes.ncAccName}>dx.io</p>
              </IconButton>
            </div>
            <div className={classes.sectionMobile}>
              <IconButton aria-haspopup="true" onClick={handleMobileMenuOpen} color="inherit">
                <MoreIcon />
              </IconButton>
            </div>
          </Toolbar>
        </AppBar>
        {renderMenu}
        {renderMobileMenu}
      </div>
    );
}

PrimarySearchMenuBar.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = ({ searchInput }) => ({ searchInput });

export default connect(
  mapStateToProps,
  { updateInput }
)(withStyles(styles)(PrimarySearchMenuBar));
