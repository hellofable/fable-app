<script>
  import moment from "moment";

  export let items;

  function groupItems(items) {
    return items.reduce((groups, item) => {
      const year = moment(item.created).year();
      const month = moment(item.created).format("MMMM");
      const day = moment(item.created).format("MMMM D");

      if (!groups[year]) groups[year] = {};
      if (!groups[year][month]) groups[year][month] = {};
      if (!groups[year][month][day]) groups[year][month][day] = [];

      groups[year][month][day].push(item);
      return groups;
    }, {});
  }

  $: groupedItems = groupItems(items);

  // Use Sets to track expanded years/months/days
  let openYears = new Set();
  let openMonths = new Set(); // keys like `${year}-${month}`
  let openDays = new Set(); // keys like `${year}-${month}-${day}`

  function toggle(set, key) {
    set.has(key) ? set.delete(key) : set.add(key);
    // Trigger reactivity
    set = new Set(set);
    return set;
  }

  function dateFormat(time) {
    return moment(time).format("h:mm A");
  }
</script>

{#each Object.keys(groupedItems) as year}
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <!-- svelte-ignore a11y-no-static-element-interactions -->
  <div
    class="collapsible"
    on:click={() => (openYears = toggle(openYears, year))}
  >
    <i
      class={`bi ${openYears.has(year) ? "bi-caret-down-fill" : "bi-caret-right-fill"}`}
    ></i>
    {year}
  </div>
  {#if openYears.has(year)}
    <div class="content">
      {#each Object.keys(groupedItems[year]) as month}
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <!-- svelte-ignore a11y-no-static-element-interactions -->
        <div
          class="collapsible"
          on:click={() => (openMonths = toggle(openMonths, `${year}-${month}`))}
        >
          <i
            class={`bi ${openMonths.has(`${year}-${month}`) ? "bi-caret-down-fill" : "bi-caret-right-fill"}`}
          ></i>
          {month}
        </div>
        {#if openMonths.has(`${year}-${month}`)}
          <div class="content">
            {#each Object.keys(groupedItems[year][month]) as day}
              <!-- svelte-ignore a11y-click-events-have-key-events -->
              <!-- svelte-ignore a11y-no-static-element-interactions -->
              <div
                class="collapsible"
                on:click={() =>
                  (openDays = toggle(openDays, `${year}-${month}-${day}`))}
              >
                <i
                  class={`bi ${openDays.has(`${year}-${month}-${day}`) ? "bi-caret-down-fill" : "bi-caret-right-fill"}`}
                ></i>
                {day}
              </div>
              {#if openDays.has(`${year}-${month}-${day}`)}
                <div class="content">
                  {#each groupedItems[year][month][day] as item (item.id)}
                    <div class="backup">
                      <a
                        href="/scripts?backupId={item.id}"
                        role="button"
                        class="text-muted backup-link"
                      >
                        {dateFormat(item.created)}
                      </a>
                    </div>
                  {/each}
                </div>
              {/if}
            {/each}
          </div>
        {/if}
      {/each}
    </div>
  {/if}
{/each}

<style>
  .collapsible {
    cursor: pointer;
    user-select: none;
    font-weight: bold;
  }

  .content {
    margin-left: 20px;
  }

  a.backup-link {
    text-decoration: none;
  }

  a.backup-link:hover {
    border-bottom: 1px dotted;
  }
</style>
