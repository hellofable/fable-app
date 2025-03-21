<script>
  import { meta } from "tinro";
  const route = meta();

  import { pb } from "$lib";
  let fileInput;

  function handleFileChange(event) {
    const file = event.target.files[0];

    if (!file) {
      console.log("No file selected");
      return;
    }

    const reader = new FileReader();

    reader.onload = async () => {
      try {
        const fileContents = reader.result; // File's text content
        const filename = file.name; // Use the file name as the script title

        // Call the import function
        const response = await pb.db.scripts.importFromText(
          filename,
          fileContents
        );

        //  error handling based on response structure
        if (response && response.success) {
          console.log("Script imported successfully:", response.res);
        } else {
          console.error("Script import failed:", response);
          alert(
            "Failed to import script. Please check the file and try again."
          );
        }
      } catch (error) {
        console.error("Error importing script:", error);
        alert("An unexpected error occurred while importing the script.");
      }
    };

    reader.onerror = () => {
      console.error("Error reading file:", reader.error);
      alert("Error reading the file. Please try again.");
    };

    reader.readAsText(file);
  }

  function openFileChooser() {
    fileInput.click(); // Trigger the file input element programmatically
  }
</script>

<a class="dropdown-item" on:click={openFileChooser} href=""
  >Import From Text
</a>

<input
  bind:this={fileInput}
  type="file"
  accept=".txt, .fountain"
  style="display: none;"
  on:change={handleFileChange}
/>
