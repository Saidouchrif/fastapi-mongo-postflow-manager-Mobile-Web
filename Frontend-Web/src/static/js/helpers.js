// === Fonctions utilitaires ===
export const fmt = iso => { try { return new Date(iso).toLocaleString(); } catch { return ""; } };
export const clip = (s, n=120) => (s || "").length > n ? s.slice(0, n) + "…" : (s || "");
export const escapeHtml = s =>
  String(s ?? "").replace(/[&<>"']/g, m => ({ "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;" }[m]));
export const toggle = (el, show) => el.classList[show ? "remove" : "add"]("hidden");

export function toast(el, msg, type="ok") {
  el.textContent = msg;
  el.className = "mt-4 p-3 rounded-lg text-sm " + (type === "err"
    ? "bg-red-50 border border-red-200 text-red-700"
    : "bg-emerald-50 border border-emerald-200 text-emerald-700");
  el.classList.remove("hidden");
  setTimeout(() => el.classList.add("hidden"), 2500);
}
