import React from 'react'
import PropTypes from 'prop-types'
import AppBar from '@material-ui/core/AppBar'
import CssBaseline from '@material-ui/core/CssBaseline'
import Divider from '@material-ui/core/Divider'
import Drawer from '@material-ui/core/Drawer'
import Hidden from '@material-ui/core/Hidden'
import IconButton from '@material-ui/core/IconButton'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import Home from '@material-ui/icons/HomeRounded'
import ListItemText from '@material-ui/core/ListItemText'
import MenuIcon from '@material-ui/icons/Menu'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'
import { Link } from 'react-router'
import GitHub from './Github'

const drawerWidth = 240

const styles = theme => ({
  root: {
    display: 'flex',
    color: theme.palette.text.primary,
  },
  navTitle: {
    marginLeft: 10,
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    marginLeft: drawerWidth,
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
    },
  },
  menuButton: {
    marginRight: 20,
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  grow: {
    flexGrow: 1,
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
  },
})

class ResponsiveDrawer extends React.Component {
  state = {
    mobileOpen: false,
  }

  handleDrawerToggle = () => {
    this.setState(state => ({ mobileOpen: !state.mobileOpen }))
  }

  render() {
    const { theme, classes, children } = this.props

    const drawer = (
      <div style={{ marginBottom: 100 }}>
        <div className={classes.toolbar} />
        <Divider />
        <Typography variant="h6" className={classes.navTitle}>
          Documentation
        </Typography>
        <List>
          <Link to="/getting-started/installation">
            <ListItem button>
              <ListItemText primary="Installation" />
            </ListItem>
          </Link>
          <Link to="/getting-started/features">
            <ListItem button>
              <ListItemText primary="Features" />
            </ListItem>
          </Link>
        </List>
        <Divider />
        <Typography variant="h6" className={classes.navTitle}>
          Component API
        </Typography>
        <List>
          <Link to="/component-api/node-group">
            <ListItem button>
              <ListItemText primary="NodeGroup" />
            </ListItem>
          </Link>
          <Link to="/component-api/animate">
            <ListItem button>
              <ListItemText primary="Animate" />
            </ListItem>
          </Link>
        </List>
        <Divider />
        <Typography variant="h6" className={classes.navTitle}>
          Demos
        </Typography>
        <List>
          <Link to="/demos/node-group">
            <ListItem button>
              <ListItemText primary="NodeGroup" />
            </ListItem>
          </Link>
          <Link to="/demos/animate">
            <ListItem button>
              <ListItemText primary="Animate" />
            </ListItem>
          </Link>
          <Link to="/demos/charts">
            <ListItem button>
              <ListItemText primary="SVG Charts" />
            </ListItem>
          </Link>
          <Link to="/demos/simple">
            <ListItem button>
              <ListItemText primary="Simple" />
            </ListItem>
          </Link>
          <Link to="/demos/animated-bar">
            <ListItem button>
              <ListItemText primary="Animated Bars" secondary={'CodeSandbox'} />
            </ListItem>
          </Link>
          <Link to="/demos/draggable-list">
            <ListItem button>
              <ListItemText
                primary="Draggable List"
                secondary={'CodeSandbox'}
              />
            </ListItem>
          </Link>
        </List>
      </div>
    )

    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={this.handleDrawerToggle}
              className={classes.menuButton}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant="h6"
              color="inherit"
              noWrap
              className={classes.grow}
            >
              React Move
            </Typography>
            <Link style={{ color: 'inherit' }} to="/">
              <IconButton color="inherit">
                <Home />
              </IconButton>
            </Link>
            <a
              style={{ color: 'inherit' }}
              href="https://github.com/react-tools/react-move"
            >
              <IconButton color="inherit">
                <GitHub />
              </IconButton>
            </a>
          </Toolbar>
        </AppBar>
        <nav className={classes.drawer}>
          <Hidden smUp implementation="css">
            <Drawer
              variant="temporary"
              anchor={theme.direction === 'rtl' ? 'right' : 'left'}
              open={this.state.mobileOpen}
              onClose={this.handleDrawerToggle}
              classes={{
                paper: classes.drawerPaper,
              }}
            >
              {drawer}
            </Drawer>
          </Hidden>
          <Hidden xsDown implementation="css">
            <Drawer
              classes={{
                paper: classes.drawerPaper,
              }}
              variant="permanent"
              open
            >
              {drawer}
            </Drawer>
          </Hidden>
        </nav>
        <main className={classes.content}>
          <div className={classes.toolbar} />
          {children}
        </main>
      </div>
    )
  }
}

ResponsiveDrawer.propTypes = {
  theme: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  children: PropTypes.object.isRequired,
}

export default withStyles(styles, { withTheme: true })(ResponsiveDrawer)
