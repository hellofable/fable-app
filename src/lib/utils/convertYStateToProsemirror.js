import * as Y from 'yjs';
import { yDocToProsemirrorJSON } from 'y-prosemirror';

export function convertYStateToProsemirror(state) {
    const ydoc = new Y.Doc();
    const byteArray = Uint8Array.from(atob(state), c => c.charCodeAt(0));
    Y.applyUpdate(ydoc, byteArray); // Apply the state update
    const node = yDocToProsemirrorJSON(ydoc, "default");
    return node
}


