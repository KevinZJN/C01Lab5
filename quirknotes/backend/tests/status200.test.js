test("1+2=3, empty array is empty", () => {
    expect(1 + 2).toBe(3);
    expect([].length).toBe(0);
  });
  
const SERVER_URL = "http://localhost:4000";

beforeEach(async () => {
  // Delete prior notes before each test
  const deleteNotesResponse = await fetch(`${SERVER_URL}/deleteAllNotes`, {
    method: 'DELETE',
  });
  const deleteNotesBody = await deleteNotesResponse.json();
  expect(deleteNotesResponse.status).toBe(200);
});

test("/postNote - Post a note", async () => {
  const title = "NoteTitleTest";
  const content = "NoteTitleContent";

  const postNoteRes = await fetch(`${SERVER_URL}/postNote`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: title,
      content: content,
    }),
  });

  const postNoteBody = await postNoteRes.json();

  expect(postNoteRes.status).toBe(200);
  expect(postNoteBody.response).toBe("Note added succesfully.");
});

// Test to return a list of zero notes after deleting all notes
test("/getAllNotes - Return list of zero notes for getAllNotes", async () => {
  const res = await fetch(`${SERVER_URL}/getAllNotes`);
  const body = await res.json();
  expect(res.status).toBe(200);
  expect(body.length).toBe(0);
});

// Test to return a list of two notes after posting two notes
test("/getAllNotes - Return list of two notes for getAllNotes", async () => {
  // Post two notes
  await fetch(`${SERVER_URL}/postNote`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title: "First Note", content: "Content of the first note" }),
  });
  await fetch(`${SERVER_URL}/postNote`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title: "Second Note", content: "Content of the second note" }),
  });

  // Get all notes
  const res = await fetch(`${SERVER_URL}/getAllNotes`);
  const body = await res.json();
  expect(res.status).toBe(200);
  expect(body.length).toBe(2);
});

// Test to delete a specific note
test("/deleteNote - Delete a note", async () => {
  // Assume a note ID is known, for example 'noteId'
  const noteId = "someNoteId"; // Replace with a valid ID
  const res = await fetch(`${SERVER_URL}/deleteNote/${noteId}`, { method: "DELETE" });
  expect(res.status).toBe(200);

  // Optionally, verify the note is deleted by attempting to fetch it or checking the list
});

// Test to patch a note with new content and title
test("/patchNote - Patch with content and title", async () => {
  const noteId = "someNoteId"; // Replace with a valid ID
  const updatedTitle = "Updated Title";
  const updatedContent = "Updated content";
  const res = await fetch(`${SERVER_URL}/patchNote/${noteId}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title: updatedTitle, content: updatedContent }),
  });
  expect(res.status).toBe(200);
  // Optionally, verify the note's updated fields
});

// Test to patch a note with just a new title
test("/patchNote - Patch with just title", async () => {
  const noteId = "someNoteId"; // Replace with a valid ID
  const updatedTitle = "New Title Only";
  const res = await fetch(`${SERVER_URL}/patchNote/${noteId}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title: updatedTitle }),
  });
  expect(res.status).toBe(200);
  // Optionally, verify the note's updated title
});

// Test to patch a note with just new content
test("/patchNote - Patch with just content", async () => {
  const noteId = "someNoteId"; // Replace with a valid ID
  const updatedContent = "New Content Only";
  const res = await fetch(`${SERVER_URL}/patchNote/${noteId}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ content: updatedContent }),
  });
  expect(res.status).toBe(200);
  // Optionally, verify the note's updated content
});

// Test to delete all notes when only one note is present
test("/deleteAllNotes - Delete one note", async () => {
  // Ensure there's only one note present, perhaps by setting up the test environment
  const res = await fetch(`${SERVER_URL}/deleteAllNotes`, { method: "DELETE" });
  expect(res.status).toBe(200);
  // Optionally, verify that no notes remain
});

// Test to delete all notes when three notes are present
test("/deleteAllNotes - Delete three notes", async () => {
  // Ensure there are three notes present, perhaps by setting up the test environment
  const res = await fetch(`${SERVER_URL}/deleteAllNotes`, { method: "DELETE" });
  expect(res.status).toBe(200);
  // Optionally, verify that no notes remain
});

// Test to update the color of a note to red
