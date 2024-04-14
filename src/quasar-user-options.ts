import 'quasar/dist/quasar.css'
import '@quasar/extras/material-icons/material-icons.css'
import { Dialog, Loading } from 'quasar'

// To be used on app.use(Quasar, { ... })
export default {
  config: {},
  plugins: {
    Loading,
    Dialog
  }
}
