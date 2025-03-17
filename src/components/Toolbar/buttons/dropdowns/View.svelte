<script>
    import DropdownMenu from "./DropdownMenu.svelte";
    let menu = {
        name: "View",
        icon: "bi bi-eye",
        items: [
            { name: "Cards View", id: "cards", selected: false },
            { name: "Script View", id: "script", selected: false },
            { name: "Text View", id: "text", selected: false },
        ],
    };
</script>

<DropdownMenu {menu} />
