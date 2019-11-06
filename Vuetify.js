import Vue from "vue";
import Vuetify from "vuetify/lib";
import "vuetify/src/stylus/app.styl";
import de from "vuetify/es5/locale/de";
import colors from "vuetify/es5/util/colors";

Vue.use(Vuetify, {
  theme: {
    primary: colors.lightBlue.lighten1,
    secondary: colors.lightBlue.darken2,
    accent: colors.lightBlue.accent2,
    error: colors.lightBlue.accent1,
    info: colors.lightBlue.lighten3,
    success: colors.lightBlue.darken4,
    warning: colors.lightBlue.lighten2
  },
  iconfont: "mdi",
  lang: {
    locales: { de },
    current: "de"
  }
});
