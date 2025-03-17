<script>
	export let sharedWith;
	import { _script, pb } from '$lib';

	function click() {
		pb.db.scripts.removeShare({ scriptId: $_script.id, userId: sharedWith.id });
	}
</script>

<button on:click={click} class="btn btn-danger btn-sm">Remove Share</button>
