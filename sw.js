// Ju's Corner · funciona offline. Mude a versão para forçar atualização.
const V = 'juscorner-v1';
const SHELL = ['./', 'index.html', 'config.js', 'manifest.webmanifest', 'img/cisnes.webp', 'img/envelope2.webp', 'img/selo2.webp', 'img/selo.webp', 'img/flores.webp', 'img/teto.webp', 'img/icon-192.png'];
self.addEventListener('install', e => { e.waitUntil(caches.open(V).then(c => c.addAll(SHELL))); self.skipWaiting(); });
self.addEventListener('activate', e => { e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== V).map(k => caches.delete(k)))).then(() => self.clients.claim())); });
self.addEventListener('fetch', e => {
  const req = e.request, url = new URL(req.url);
  if (req.method !== 'GET' || url.hostname.endsWith('supabase.co') || url.pathname.endsWith('dados.json')) return;
  const sameOrigin = url.origin === location.origin;
  if (req.mode === 'navigate' || (sameOrigin && /\.(html|js|webmanifest)$/.test(url.pathname))) {
    // páginas e scripts: tenta a rede (pega atualizações), cai no cache offline
    e.respondWith(fetch(req).then(r => { const c = r.clone(); caches.open(V).then(x => x.put(req, c)); return r; }).catch(() => caches.match(req).then(r => r || caches.match('index.html'))));
    return;
  }
  // imagens, fontes e bibliotecas: cache primeiro
  e.respondWith(caches.match(req).then(hit => hit || fetch(req).then(r => { if (r.ok || r.type === 'opaque') { const c = r.clone(); caches.open(V).then(x => x.put(req, c)); } return r; })));
});
