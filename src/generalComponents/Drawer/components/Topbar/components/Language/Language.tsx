import { Check } from "@mui/icons-material";
import {
  FormControl,
  ListItemIcon,
  ListItemText,
  MenuItem,
  MenuList,
  Paper,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { ResponsiveDrawerStyles } from "../../../../styles/ResponsiveDrawer.styles";

const Language = () => {
  const { t, i18n } = useTranslation();

  return (
    <FormControl sx={ResponsiveDrawerStyles().lenguageFormControl}>
      <Paper sx={ResponsiveDrawerStyles().lenguagePaper}>
        <MenuList sx={ResponsiveDrawerStyles().lenguageMenuList}>
          <MenuItem
            onClick={() => {
              i18n.changeLanguage("en");
            }}
          >
            <ListItemIcon>
              <img
                src="https://freesvg.org/img/US-UK_Flag.png"
                width={25}
                height={30}
              />
            </ListItemIcon>
            <ListItemText>
              English
            </ListItemText>
            {i18n.language === "en" ? <Check /> : null}
          </MenuItem>
          <MenuItem
            onClick={() => {
              i18n.changeLanguage("es");
            }}
          >
            <ListItemIcon>
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR8f2i27YCOTRvjX51zEh8Gd_-7rsyDtv0HEVCPSy_wiLhqdvte5NuL9qNHxaTQvRaWfcA&usqp=CAU"
                width={25}
              />
            </ListItemIcon>
            <ListItemText>
              Español
            </ListItemText>
            {i18n.language === "es" ? <Check /> : null}
          </MenuItem>
        </MenuList>
      </Paper>
    </FormControl>
  );
};

export default Language;
