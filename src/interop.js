// const { invoke } = window.__TAURI__.tauri;
import { core } from "@tauri-apps/api";
const { invoke } = core


// Called by Elm Land after the app starts up
export const onReady = ({ app }) => {

  if (app.ports && app.ports.outgoing) {
    // Listen to messages from Elm Land
    app.ports.outgoing.subscribe(async ({ tag, payload }) => {
      switch (tag) {
        case 'GREET':
          let responseFromRust = await greet(payload)
          app.ports.listenForGreeting.send(responseFromRust)
          return
      }
    })
  }

}

async function greet(name) {
  return await invoke("greet", { name });
}
