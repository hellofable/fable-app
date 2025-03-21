<script>
  export let props;

  let { fields, onSubmit } = props;

  // Initialize `data` based on `fields`
  let data = {};
  fields.forEach((field) => {
    data[field.name] =
      field.defaultValue ?? (field.type === "checkbox" ? false : ""); // Use defaultValue if provided
  });

  fields.forEach((field) => {
    if (!(field.name in data)) {
      data[field.name] = field.type === "checkbox" ? false : ""; // Default for checkboxes and other fields
    }
  });

  function handleSubmit(event) {
    event.preventDefault(); // Prevent default form submission
    if (onSubmit) {
      onSubmit(data); // Pass collected data to the parent
    }
  }

  function handleFileChange(event, fieldName) {
    const file = event.target.files[0];
    if (!file) return;

    const allowedTypes = ["text/plain", "application/octet-stream"];
    const allowedExtensions = [".txt", ".fountain"];

    const isValidExtension = allowedExtensions.some((ext) =>
      file.name.endsWith(ext)
    );
    const isValidType = allowedTypes.includes(file.type) || file.type === "";

    if (isValidExtension && isValidType) {
      const reader = new FileReader();
      reader.onload = () => {
        data[fieldName] = {
          filename: file.name,
          content: reader.result,
        };
      };
      reader.readAsText(file);
    } else {
      alert("Please upload a valid .txt or .fountain file.");
    }
  }
</script>

<form
  id="form-component"
  on:submit={handleSubmit}
  class="needs-validation"
  novalidate
>
  {#each fields as field}
    <div class="form-group mb-3">
      {#if field.showLabel}
        <label for={field.id}>{field.name}</label>{/if}
      {#if field.type === "textarea"}
        <textarea
          class="form-control"
          id={field.id}
          bind:value={data[field.name]}
          placeholder={field.placeholder || ""}
          required={field.required || false}
          rows="5"
        ></textarea>
      {:else if field.type === "checkbox"}
        <div class="form-check">
          <input
            type="checkbox"
            class="form-check-input"
            id={field.id}
            bind:checked={data[field.name]}
            required={field.required || false}
          />
          <label class="form-check-label" for={field.id}>{field.name}</label>
        </div>
      {:else if field.type === "select"}
        <select
          class="form-control"
          id={field.id}
          bind:value={data[field.name]}
          required={field.required || false}
        >
          {#each field.options as option}
            <option value={option.value}>{option.label}</option>
          {/each}
        </select>

        <!-- Dynamic helper text based on selected option -->
        {#if field.options.find((opt) => opt.value === data[field.name])?.helperText}
          <div class="mt-2 small ms-1">
            <p id="{field.id}-help" class="form-text text-muted">
              {field.options.find((opt) => opt.value === data[field.name])
                ?.helperText}
            </p>
          </div>
        {:else if field.helperText}
          <small id="{field.id}-help" class="form-text text-muted">
            {field.helperText}
          </small>
        {/if}
      {:else if field.type === "file"}
        <input
          type="file"
          class="form-control"
          id={field.id}
          accept=".txt,.fountain"
          on:change={(e) => handleFileChange(e, field.name)}
          required={field.required || false}
        />
      {:else}
        <input
          class="form-control"
          id={field.id}
          bind:value={data[field.name]}
          placeholder={field.placeholder || ""}
          required={field.required || false}
        />
      {/if}
      {#if field.helperText}
        <small id="{field.id}-help" class="form-text text-muted"
          >{field.helperText}</small
        >
      {/if}
    </div>
  {/each}
</form>
