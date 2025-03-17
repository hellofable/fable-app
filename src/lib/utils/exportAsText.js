import { textParsers, _editor, _app } from "$lib";

export function exportAsText() {
    const html = _editor.get().getHTML();

    const title = _app.get().script?.title;
    const filename = title ? title.replace(/\s+/g, '_').toLowerCase() : 'script';

    const textWithSpans = textParsers.domParser(html);
    const fountain = textParsers.HTMLToMarkdown(textWithSpans);

    // Create a Blob with the Fountain text
    const blob = new Blob([fountain], { type: 'text/plain' });

    // Create a temporary link element
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `${filename}.txt`; // Use the dynamically generated filename

    // Trigger the download
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Cleanup the object URL
    URL.revokeObjectURL(link.href);
}
