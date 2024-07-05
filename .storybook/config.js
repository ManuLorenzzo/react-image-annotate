// .storybook/config.js

import React from "react"
import { configure, addDecorator } from "@storybook/react"
import Theme from "../src/Theme"
import { action } from "@storybook/addon-actions"
import SettingsProvider from "../src/SettingsProvider"

// Agregar un decorador para envolver todas las stories con el tema
addDecorator((storyFn) => <Theme>{storyFn()}</Theme>)
// Puedes descomentar la siguiente línea si necesitas el SettingsProvider
// addDecorator(storyFn => <SettingsProvider>{storyFn()}</SettingsProvider>)

// Función para cargar las stories
function loadStories() {
  require("../src/stories")
}

configure(loadStories, module)
