<script>
  import { Route } from "tinro";

  import Init from "./init/Init.svelte";

  import Modal from "./components/Other/Modal.svelte";
  import Popup from "./components/Popup/Popup.svelte";
</script>

<Modal />
<Popup />

<Route>
  <Init />
</Route>
