<script>
  export let fields = [];
  export let onSubmit, props;

  let data = {};

  // Initialize data with default values
  fields.forEach((field) => {
    data[field.name] =
      field.defaultValue ?? (field.type === "checkbox" ? false : "");
  });

  async function handleSubmit(event) {
    event.preventDefault();
    if (onSubmit) {
      const res = await onSubmit(data);

      if (res.success) {
        fields.forEach((field) => {
          data[field.name] =
            field.defaultValue ?? (field.type === "checkbox" ? false : "");
        });
      }
    }
  }
</script>

<form on:submit={handleSubmit} class="needs-validation">
  {#each fields as field}
    <div class="mb-3">
      {#if field.showLabel}
        <label for={field.id} class="form-label"
          >{field.label || field.name}</label
        >
      {/if}

      {#if field.type === "textarea"}
        <textarea
          class="form-control"
          id={field.id}
          bind:value={data[field.name]}
          placeholder={field.placeholder || ""}
          required={field.required || false}
          rows={field.rows || 3}
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
          <label class="form-check-label" for={field.id}
            >{field.label || field.name}</label
          >
        </div>
      {:else if field.type === "number"}
        <input
          type="number"
          class="form-control"
          id={field.id}
          bind:value={data[field.name]}
          placeholder={field.placeholder || ""}
          required={field.required || false}
        />
      {:else if field.type === "email"}
        <input
          type="email"
          class="form-control"
          id={field.id}
          bind:value={data[field.name]}
          placeholder={field.placeholder || ""}
          required={field.required || false}
        />
      {:else}
        <input
          type="text"
          class="form-control"
          id={field.id}
          bind:value={data[field.name]}
          placeholder={field.placeholder || ""}
          required={field.required || false}
        />
      {/if}

      <div class="text-start">
        {#if field.helperText}
          <small class="form-text text-muted">{field.helperText}</small>
        {/if}
      </div>
    </div>
  {/each}

  <div class="text-end">
    <button
      disabled={props.disabled || false}
      type="submit"
      class="btn {props.submitClass}"
    >
      {props.submitTitle || "Submit"}
    </button>
  </div>
</form>
