<script>
  export let Form;
  export let props;

  import Folders from "./Folders.svelte";
  let { fields, onSubmit } = props;

  function handleSubmit(event) {
    event.preventDefault();
    onSubmit(fields);
  }
</script>

<form
  id="form-component"
  on:submit={handleSubmit}
  class="needs-validation"
  novalidate
>
  <Folders folderId="root" {fields} />
</form>
