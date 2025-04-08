<script>
  import moment from "moment";

  export let items;

  // Helper function to group items by year, month, and day
  function groupItems(items) {
    return items.reduce((groups, item) => {
      const year = moment(item.created).year();
      const month = moment(item.created).format("MMMM");
      const day = moment(item.created).format("D MMMM YYYY");

      if (!groups[year]) groups[year] = {};
      if (!groups[year][month]) groups[year][month] = {};
      if (!groups[year][month][day]) groups[year][month][day] = [];

      groups[year][month][day].push(item);
      return groups;
    }, {});
  }

  let groupedItems = {};

  // Group items when the component is created
  $: groupedItems = groupItems(items);

  function toggleVisibility(id) {
    const element = document.getElementById(id);
    if (element) {
      element.style.display =
        element.style.display === "block" ? "none" : "block";
    }
  }

  function dateFormat(time) {
    return moment(time).format("D MMMM YYYY h:mm A");
  }
</script>

{#each Object.keys(groupedItems) as year}
  <div class="collapsible" on:click={() => toggleVisibility(`year-${year}`)}>
    {year}
  </div>
  <div id="year-{year}" class="content">
    {#each Object.keys(groupedItems[year]) as month}
      <div
        class="collapsible"
        on:click={() => toggleVisibility(`month-${year}-${month}`)}
      >
        {month}
      </div>
      <div id="month-{year}-{month}" class="content">
        {#each Object.keys(groupedItems[year][month]) as day}
          <div
            class="collapsible"
            on:click={() => toggleVisibility(`day-${year}-${month}-${day}`)}
          >
            {day}
          </div>
          <div id="day-{year}-{month}-{day}" class="content">
            {#each groupedItems[year][month][day] as item (item.id)}
              <div class="backup" id="backup-{item.id}">
                <a
                  href="/scripts?backupId={item.id}"
                  role="button"
                  class="text-muted">{dateFormat(item.created)}</a
                >
              </div>
            {/each}
          </div>
        {/each}
      </div>
    {/each}
  </div>
{/each}

<style>
  .collapsible {
    cursor: pointer;
    user-select: none;
    font-weight: bold;
  }

  .content {
    display: none;
    margin-left: 20px;
  }
</style>
