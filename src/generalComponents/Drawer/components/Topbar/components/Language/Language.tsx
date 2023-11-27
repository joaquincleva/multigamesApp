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

const Language = () => {
  const { t, i18n } = useTranslation();
  
  return (
    <FormControl sx={{margin: 0, padding: 0, mx: 0, my:0 }}>
      <Paper sx={{ width: "100%", padding: 0,  border: "none", boxShadow: "none" }}>
        <MenuList sx={{ width: 200, padding: 0}}>
          <MenuItem onClick={()=>{i18n.changeLanguage("en")}}>
            <ListItemIcon>
              <img src="https://freesvg.org/img/US-UK_Flag.png" width={25} height={30}/>
            </ListItemIcon>
            <ListItemText>{t("settings.drawer.language.options.en")}</ListItemText>
            {i18n.language === "en" ?<Check />:null}
          </MenuItem>
          <MenuItem onClick={()=>{i18n.changeLanguage("fr")}}>
            <ListItemIcon>
              <img src="https://uxwing.com/wp-content/themes/uxwing/download/flags-landmarks/spain-flag-icon.png" width={25}/>
            </ListItemIcon>
            <ListItemText>{t("settings.drawer.language.options.fr")}</ListItemText>
            {i18n.language === "fr" ?<Check />:null}
          </MenuItem>
        </MenuList>
      </Paper>
    </FormControl>
  );
};

export default Language;
