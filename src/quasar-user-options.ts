import 'quasar/dist/quasar.css'
import '@quasar/extras/material-icons/material-icons.css'
import { Cookies, Dark, Dialog, Loading, Notify } from 'quasar'

// To be used on app.use(Quasar, { ... })
export default {
  config: {},
  plugins: {
    Notify,
    Cookies,
    Dark, //TODO test some plugins
    Screen,
    Loading,
    Dialog
  }
}
