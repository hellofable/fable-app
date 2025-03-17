<script>
	import DropdownMenu from "./DropdownMenu.svelte";
	let menu = {
		name: "User",
		icon: "bi bi-person",
		items: [
			{ name: "Manage Subscription", id: "sub", selected: false },
			{ name: "Logout", id: "logout", selected: false },
			// { name: "", id: "", divider: true },
			// { name: "Dark", id: "dark", selected: true },
			// { name: "Light ", id: "light" },
		],
	};
</script>

<DropdownMenu {menu} />
