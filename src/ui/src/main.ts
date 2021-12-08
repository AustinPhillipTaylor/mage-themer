import { createApp } from 'vue'
import App from './App.vue'
import PerfectScrollbar from 'vue3-perfect-scrollbar'
import 'vue3-perfect-scrollbar/dist/vue3-perfect-scrollbar.min.css'
import './styles/main.sass'
import { createPinia } from 'pinia'
import { usePalettesStore, paletteStorageKey } from './stores/palettes'
import { useThemesStore, themeStorageKey } from './stores/themes'
import { saveLocal } from './utils/localStorage'

const app = createApp( App )

app.use( createPinia() )


let autoSaveTimeout: NodeJS.Timeout | null = null

/**
 * To avoid bogging down the system, we won't save on every single update. We'll throttle saves
 * to only occur 3 seconds after the last change.
 */
function saveAfterTimeout() {
	// If the 3 seconds isn't up, lets null out the timeout and then reset it
	if ( autoSaveTimeout !== null ) {
		clearTimeout( autoSaveTimeout )
		autoSaveTimeout = null
	}
	autoSaveTimeout = setTimeout( savePalettesAndThemesLocally, 3000 )
}

function savePalettesAndThemesLocally() {
	const themes = useThemesStore().themes
	const palettes = usePalettesStore().palettes
	saveLocal( paletteStorageKey, JSON.stringify( palettes ) )
	saveLocal( themeStorageKey, JSON.stringify( themes ) )
}

usePalettesStore().$subscribe( saveAfterTimeout )
useThemesStore().$subscribe( saveAfterTimeout )



app.use( PerfectScrollbar )

app.mount( '#app' )
