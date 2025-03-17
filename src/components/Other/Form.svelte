<script>
	export let props;

	let { fields, onSubmit } = props;

	// Initialize `data` based on `fields`
	let data = {};
	fields.forEach((field) => {
		data[field.name] = field.defaultValue ?? (field.type === 'checkbox' ? false : ''); // Use defaultValue if provided
	});

	fields.forEach((field) => {
		if (!(field.name in data)) {
			data[field.name] = field.type === 'checkbox' ? false : ''; // Default for checkboxes and other fields
		}
	});

	function handleSubmit(event) {
		event.preventDefault(); // Prevent default form submission
		if (onSubmit) {
			onSubmit(data); // Pass collected data to the parent
		}
	}
</script>

<form id="form-component" on:submit={handleSubmit} class="needs-validation" novalidate>
	{#each fields as field}
		<div class="form-group mb-3">
			{#if field.showLabel}
				<label for={field.id}>{field.name}</label>{/if}
			{#if field.type === 'textarea'}
				<textarea
					class="form-control"
					id={field.id}
					bind:value={data[field.name]}
					placeholder={field.placeholder || ''}
					required={field.required || false}
					rows="5"
				></textarea>
			{:else if field.type === 'checkbox'}
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
			{:else}
				<input
					class="form-control"
					id={field.id}
					bind:value={data[field.name]}
					placeholder={field.placeholder || ''}
					required={field.required || false}
				/>
			{/if}
			{#if field.helperText}
				<small id="{field.id}-help" class="form-text text-muted">{field.helperText}</small>
			{/if}
		</div>
	{/each}
</form>
