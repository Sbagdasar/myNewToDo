import "./App.css";
import { useAppSelector } from "@/common/hooks";
import { getTheme } from "@/common/theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { Header } from "@/common/components";
import { Main } from "@/app/Main.tsx";
import { selectThemeMode } from "@/app/app-slice.ts";

export const App = () => {
  const themeMode = useAppSelector(selectThemeMode);

  const theme = getTheme(themeMode);

  return (
    <ThemeProvider theme={theme}>
      <div className={"app"}>
        <CssBaseline />
        <Header />
        <Main />
      </div>
    </ThemeProvider>
  );
};
