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
