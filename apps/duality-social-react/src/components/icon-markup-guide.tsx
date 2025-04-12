import {
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@mui/material';
import React from 'react';

interface ListItemProps {
  component: string;
  disableTypography: boolean;
  primary: React.ReactNode;
  secondary: React.ReactNode;
}

const IconMarkupGuide: React.FC = () => {
  return (
    <Box>
      <Typography variant="h6" mt={2}>
        Icon Markup:
      </Typography>
      <List>
        <ListItem>
          <ListItemIcon>
            <i className="fa-regular fa-heart" />
          </ListItemIcon>
          <ListItemText
            primary="Basic Icon"
            secondary="{{heart}} renders as a regular heart icon"
          />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <i className="fa-regular fa-heart" />
          </ListItemIcon>
          <ListItemText
            primary="Styled Icon"
            secondary="{{solid heart}} renders as a solid heart icon"
          />
        </ListItem>
        <ListItem>
          <ListItemText
            primary="Available Styles"
            secondary="classic, duotone, light, regular, solid, thin, brands, sharp solid"
          />
        </ListItem>
        <ListItem>
          <ListItemText
            primary="Sizes"
            secondary="xs, sm, lg, xl, 2xl, 1x, 2x, 3x, 4x, 5x, 6x, 7x, 8x, 9x, 10x"
          />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <i className="fa-solid fa-heart fa-lg" />
          </ListItemIcon>
          <ListItemText
            primary="Size Example"
            secondary="{{solid heart lg}} renders a large solid heart icon"
          />
        </ListItem>
        <ListItem>
          <ListItemText
            primary="Animations"
            secondary="spin, spin-pulse, spin-reverse, pulse, beat, fade, beat-fade, flip, flip-both, flip-horizontal, flip-vertical, rotate-90, rotate-180, rotate-270, rotate-by"
          />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <i className="fa-solid fa-heart fa-spin" />
          </ListItemIcon>
          <ListItemText
            primary="Animation Example"
            secondary="{{solid heart spin}} renders a spinning solid heart icon"
          />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <i className="fa-solid fa-heart fa-lg fa-spin" />
          </ListItemIcon>
          <ListItemText
            primary="Combined Usage"
            secondary="{{solid heart lg spin}} renders a large, spinning, solid heart icon"
          />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <i
              className="fa-solid fa-heart"
              style={{ color: 'red', fontSize: '20px' }}
            />
          </ListItemIcon>
          <ListItemText
            primary="Custom Styled Icon"
            secondary="{{solid heart; color: red; font-size: 20px;}} renders as a red, 20px solid heart icon. CSS styles are added after a semicolon."
          />
        </ListItem>
        <ListItem>
          <ListItemText
            {...({
              component: 'div',
              disableTypography: true,
              primary: (
                <Typography variant="body1">Custom Style Order</Typography>
              ),
              secondary: (
                <React.Fragment>
                  <Typography variant="body2">
                    When using icons, follow this order:
                  </Typography>
                  <List dense>
                    <ListItem>
                      <ListItemText primary="1. Icon style (optional, e.g., solid, regular)" />
                    </ListItem>
                    <ListItem>
                      <ListItemText primary="2. Icon name (required, e.g., heart)" />
                    </ListItem>
                    <ListItem>
                      <ListItemText primary="3. Additional properties (optional, e.g., lg, spin)" />
                    </ListItem>
                    <ListItem>
                      <ListItemText primary="4. Semicolon (;) - only if adding CSS styles" />
                    </ListItem>
                    <ListItem>
                      <ListItemText primary="5. CSS styles (optional)" />
                    </ListItem>
                  </List>
                  <Typography variant="body2">Examples:</Typography>
                  <List dense>
                    <ListItem>
                      <ListItemIcon>
                        <i className="fa-regular fa-heart" />
                      </ListItemIcon>
                      <ListItemText primary="Basic: {{heart}}" />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <i className="fa-solid fa-heart" />
                      </ListItemIcon>
                      <ListItemText primary="With style: {{solid heart}}" />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <i className="fa-solid fa-heart fa-lg fa-spin" />
                      </ListItemIcon>
                      <ListItemText primary="With properties: {{heart lg spin}}" />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <i
                          className="fa-solid fa-heart"
                          style={{ color: 'red', fontSize: '20px' }}
                        />
                      </ListItemIcon>
                      <ListItemText primary="With CSS: {{heart; color: red; font-size: 20px;}}" />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <i
                          className="fa-solid fa-heart fa-lg fa-spin"
                          style={{ color: 'red', fontSize: '20px' }}
                        />
                      </ListItemIcon>
                      <ListItemText primary="Full example: {{solid heart lg spin; color: red; font-size: 20px;}}" />
                    </ListItem>
                  </List>
                  <Typography variant="body2">
                    Remember: Only the icon name is required. All other elements
                    are optional.
                  </Typography>
                  <Typography
                    variant="body1"
                    component="div"
                    sx={{ marginBottom: 2 }}
                  >
                    A complete list of icons available (we're using a complete
                    Pro set) can be found here{' '}
                    <a
                      href="https://fontawesome.com/icons"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      https://fontawesome.com/icons
                    </a>
                  </Typography>
                  <Typography variant="body2" mt={2}>
                    For more detailed styling options, refer to the{' '}
                    <a
                      href="https://docs.fontawesome.com/web/style/style-cheatsheet"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      FontAwesome Style Cheatsheet
                    </a>
                    . Our markup is a custom shorthand for this.
                  </Typography>
                </React.Fragment>
              ),
            } as ListItemProps)}
          />
        </ListItem>
      </List>
    </Box>
  );
};

export default IconMarkupGuide;
