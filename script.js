// Hardcoded users
const users = [
  {
    email: "user1@colony.com",
    password: "1234",
    house: "H-101",
    head: "Mr. Ramesh",
    contact: "9876543210",
    members: 4
  },
  {
    email: "user2@colony.com",
    password: "abcd",
    house: "H-102",
    head: "Mrs. Lakshmi",
    contact: "9988776655",
    members: 3
  }
];

let complaints = [
  { text: "Water leakage in block B", votes: 2, id: 1 },
  { text: "Street lights not working", votes: 5, id: 2 },
  { text: "Garbage not collected in A wing", votes: 3, id: 3 },
  { text: "Security guard absent at night", votes: 1, id: 4 },
  { text: "Too much noise from flat 304", votes: 2, id: 5 }
];

let voted = [];
let currentUser = null;

function login() {
  const email = document.getElementById("email").value.trim().toLowerCase();
  const password = document.getElementById("password").value.trim();

  const user = users.find(u => u.email === email && u.password === password);

  if (user) {
    currentUser = user;
    document.getElementById("loginSection").style.display = "none";
    document.getElementById("userSection").style.display = "block";
    document.getElementById("userEmail").textContent = user.email;

    const info = `
      <p><strong>House:</strong> ${user.house}</p>
      <p><strong>Head:</strong> ${user.head}</p>
      <p><strong>Contact:</strong> ${user.contact}</p>
      <p><strong>Family Members:</strong> ${user.members}</p>
    `;
    document.getElementById("userInfo").innerHTML = info;

    renderComplaints();
  } else {
    alert("Incorrect email or password.");
  }
}

function submitComplaint() {
  const input = document.getElementById("newComplaint");
  const text = input.value.trim();
  if (text) {
    complaints.push({ text, votes: 0, id: Date.now() });
    input.value = "";
    renderComplaints();
  }
}

function upvote(id) {
  if (voted.includes(id)) return;

  const complaint = complaints.find(c => c.id === id);
  if (complaint) {
    complaint.votes++;
    voted.push(id);
    renderComplaints();
  }
}

function renderComplaints() {
  const list = document.getElementById("complaintList");
  list.innerHTML = "";

  const top = complaints.slice().sort((a, b) => b.votes - a.votes).slice(0, 20);

  top.forEach(c => {
    const div = document.createElement("div");
    div.className = "card";
    div.innerHTML = `
      <span>${c.text}</span>
      <div>
        <strong>${c.votes}</strong>
        <button onclick="upvote(${c.id})" ${voted.includes(c.id) ? "disabled" : ""}>
          ${voted.includes(c.id) ? "Voted" : "Upvote"}
        </button>
      </div>
    `;
    list.appendChild(div);
  });
}
