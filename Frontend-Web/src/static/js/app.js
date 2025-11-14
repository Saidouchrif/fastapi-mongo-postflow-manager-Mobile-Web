import { fmt, clip, escapeHtml, toggle, toast } from "./helpers.js";

// === Config ===
// Use window.location.origin for relative API calls, or fallback to localhost:5000
const API_BASE = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
  ? "http://localhost:5000/api"
  : `${window.location.protocol}//${window.location.hostname}:5000/api`;
const API = `${API_BASE}/posts`;

// === Elements ===
const rowsEl = document.getElementById("rows");
const emptyEl = document.getElementById("emptyState");
const loadEl  = document.getElementById("loadingState");
const alertEl = document.getElementById("alertBox");
const newBtn  = document.getElementById("newBtn");
const refreshBtn = document.getElementById("refreshBtn");
const searchInput = document.getElementById("searchInput");
const apiLabel = document.getElementById("apiLabel");
apiLabel.textContent = API;

// Modal
const modal = document.getElementById("modal");
const modalTitle = document.getElementById("modalTitle");
const form = document.getElementById("postForm");
const postId = document.getElementById("postId");
const titleInput = document.getElementById("title");
const contentInput = document.getElementById("content");
const submitBtn = document.getElementById("submitBtn");

// Confirm
const confirmBox = document.getElementById("confirm");
const confirmYes = document.getElementById("confirmYes");
let toDeleteId = null;

// === Data ===
let allPosts = [];

// --- Requête générique ---
async function fetchJSON(url, opts) {
  const res = await fetch(url, { headers: { "Content-Type": "application/json" }, ...opts });
  let text = await res.text();
  try { text = text ? JSON.parse(text) : null; } catch {}
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return text;
}

// --- Charger les posts ---
async function loadPosts() {
  toggle(loadEl, true); toggle(emptyEl, false); rowsEl.innerHTML = "";
  try {
    const data = await fetchJSON(API);
    allPosts = Array.isArray(data) ? data : [];
    renderRows(allPosts);
  } catch (e) {
    toggle(emptyEl, true);
    toast(alertEl, "Erreur de chargement : vérifie que l’API tourne sur 5000.", "err");
  } finally {
    toggle(loadEl, false);
  }
}

// --- Affichage ---
function renderRows(list) {
  rowsEl.innerHTML = "";
  if (!list.length) { toggle(emptyEl, true); return; }
  toggle(emptyEl, false);
  for (const p of list) {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td class="px-4 py-3">${escapeHtml(p.title)}</td>
      <td class="px-4 py-3 text-gray-600">${escapeHtml(clip(p.content, 200))}</td>
      <td class="px-4 py-3 text-gray-500">${fmt(p.created_at)}</td>
      <td class="px-4 py-3 text-right">
        <button class="text-xs border px-3 py-1.5 rounded-lg hover:bg-gray-100" data-edit="${p.id}">Modifier</button>
        <button class="text-xs bg-red-600 text-white px-3 py-1.5 rounded-lg hover:bg-red-700" data-del="${p.id}">Supprimer</button>
      </td>`;
    rowsEl.appendChild(tr);
  }
}

// --- Événements sur les boutons dans le tableau ---
rowsEl.addEventListener("click", e => {
  const idEdit = e.target.getAttribute("data-edit");
  const idDel  = e.target.getAttribute("data-del");
  if (idEdit) openEdit(allPosts.find(p => p.id === idEdit));
  if (idDel) askDelete(idDel);
});

// --- Modal ---
function openCreate() {
  postId.value = "";
  modalTitle.textContent = "Nouveau post";
  titleInput.value = ""; contentInput.value = "";
  submitBtn.textContent = "Créer";
  toggle(modal, true);
}
function openEdit(p) {
  postId.value = p.id;
  modalTitle.textContent = "Modifier le post";
  titleInput.value = p.title;
  contentInput.value = p.content;
  submitBtn.textContent = "Mettre à jour";
  toggle(modal, true);
}
window.closeModal = () => toggle(modal, false);

// --- Création / Mise à jour ---
form.addEventListener("submit", async e => {
  e.preventDefault();
  const id = postId.value.trim();
  const payload = { title: titleInput.value.trim(), content: contentInput.value.trim() };
  if (!payload.title || !payload.content) { toast(alertEl, "Champs requis.", "err"); return; }

  try {
    if (!id) {
      const created = await fetchJSON(API, { method: "POST", body: JSON.stringify(payload) });
      allPosts.unshift(created);
      toast(alertEl, "Post créé avec succès.");
    } else {
      const updated = await fetchJSON(`${API}/${id}`, { method: "PUT", body: JSON.stringify(payload) });
      allPosts = allPosts.map(p => p.id === id ? updated : p);
      toast(alertEl, "Post mis à jour.");
    }
    renderRows(filterBy(searchInput.value));
    window.closeModal();
  } catch { toast(alertEl, "Erreur d’enregistrement.", "err"); }
});

// --- Suppression ---
function askDelete(id) { toDeleteId = id; toggle(confirmBox, true); }
window.closeConfirm = () => toggle(confirmBox, false);
confirmYes.addEventListener("click", async () => {
  if (!toDeleteId) return;
  try {
    await fetchJSON(`${API}/${toDeleteId}`, { method: "DELETE" });
    allPosts = allPosts.filter(p => p.id !== toDeleteId);
    renderRows(filterBy(searchInput.value));
    toast(alertEl, "Post supprimé.");
  } catch { toast(alertEl, "Erreur de suppression.", "err"); }
  window.closeConfirm();
});

// --- Recherche ---
function filterBy(q) {
  q = (q || "").toLowerCase();
  return !q ? allPosts :
    allPosts.filter(p => p.title.toLowerCase().includes(q) || p.content.toLowerCase().includes(q));
}
searchInput.addEventListener("input", () => renderRows(filterBy(searchInput.value)));

// --- Liens initiaux ---
newBtn.addEventListener("click", openCreate);
refreshBtn.addEventListener("click", loadPosts);

// --- Démarrage ---
loadPosts();
