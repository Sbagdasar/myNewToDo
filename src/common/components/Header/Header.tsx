import { useAppDispatch, useAppSelector } from "@/common/hooks";
import { getTheme } from "@/common/theme";
import {
  changeThemeModeAC,
  selectAppStatus,
  selectThemeMode,
} from "@/app/app-slice.ts";
import { AppBar, LinearProgress, Switch, Toolbar } from "@mui/material";
import Container from "@mui/material/Container";
import { containerSx } from "@/common/styles";
import IconButton from "@mui/material/IconButton";
import { NavButton } from "@/common/components";
import MenuIcon from "@mui/icons-material/Menu";

export const Header = () => {
  const themeMode = useAppSelector(selectThemeMode);
  const status = useAppSelector(selectAppStatus);

  const dispatch = useAppDispatch();

  const theme = getTheme(themeMode);

  const changeMode = () => {
    dispatch(
      changeThemeModeAC({
        themeMode: themeMode === "light" ? "dark" : "light",
      }),
    );
  };

  return (
    <AppBar position="static" sx={{ mb: "30px" }}>
      <Toolbar>
        <Container maxWidth={"lg"} sx={containerSx}>
          <IconButton color="inherit">
            <MenuIcon />
          </IconButton>
          <div>
            <NavButton>Sign in</NavButton>
            <NavButton>Sign up</NavButton>
            <NavButton background={theme.palette.primary.dark}>Faq</NavButton>
            <Switch color={"default"} onChange={changeMode} />
          </div>
        </Container>
      </Toolbar>
      {status === "loading" && <LinearProgress />}
    </AppBar>
  );
};
