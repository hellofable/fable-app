<script>
    import DropdownMenu from "./DropdownMenu.svelte";
    let menu = {
        name: "Export",
        icon: "bi bi-save",
        items: [
            { name: "Export as PDF", id: "exportPdf", selected: false },
            { name: "Export as Text", id: "exportText", selected: false },
        ],
    };
</script>

<DropdownMenu {menu} />
