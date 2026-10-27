/* Surah Lessons - progress tracking, based on the animations (stored in this browser, one record per sign-in) */
(function(){
  function key(){ var s = SurahSite.session(); return 'surahlessons.progress.v1.' + (s ? s.user.toLowerCase() : 'guest'); }
  function fresh(){ return {data: {}}; }
  function uniq(a){ var out = [], seen = {}; (a || []).forEach(function(x){ x = parseInt(x, 10); if (x > 0 && !seen[x]) { seen[x] = 1; out.push(x); } }); return out.sort(function(p, q){ return p - q; }); }
  /* Keeps only animation progress: {data:{surahId:{v:[watched ayahs], k:[known ayahs], n:total}}}. Older step-based data is ignored. */
  function normalize(o){
    if (!o || typeof o !== 'object' || !o.data || typeof o.data !== 'object') { return null; }
    var out = {};
    Object.keys(o.data).forEach(function(sid){ var r = o.data[sid]; if (r && (r.v || r.k)) { out[sid] = {v: uniq(r.v), k: uniq(r.k), n: r.n || 0, ts: r.ts || 0}; } });
    return {data: out};
  }
  function load(){ try { var o = normalize(JSON.parse(localStorage.getItem(key()) || 'null')); if (o) { return o; } } catch (e) {} return fresh(); }
  function save(o){ try { localStorage.setItem(key(), JSON.stringify({data: o.data})); return true; } catch (e) { return false; } }
  function inRange(a, n){ return a.filter(function(x){ return x <= n; }); }

  var P = {
    record: function(sid){ return load().data[sid] || {v: [], k: [], n: 0}; },
    state: function(sid){ var r = P.record(sid); return {viewed: r.v || [], known: r.k || []}; },
    /* viewed: ayah numbers watched (added to what is saved); known: ayah numbers marked "I know it" (replaces, or null to leave as is) */
    report: function(sid, viewed, known, total){
      var o = load(), r = o.data[sid] || (o.data[sid] = {v: [], k: [], n: 0, ts: 0});
      r.v = uniq((r.v || []).concat(viewed || []));
      if (known && known.length !== undefined) { r.k = uniq(known); }
      r.n = total || r.n; r.ts = Date.now();
      return save(o);
    },
    resetSurah: function(sid){ var o = load(); delete o.data[sid]; return save(o); },
    summary: function(s){
      var r = P.record(s.id), n = s.ayahs, v = inRange(r.v || [], n).length, k = inRange(r.k || [], n).length;
      return {n: n, viewed: v, known: k, pct: n ? Math.round(k * 100 / n) : 0, vpct: n ? Math.round(Math.max(v, k) * 100 / n) : 0,
              hasAnim: s.animations.length > 0, complete: n > 0 && k >= n, started: v > 0 || k > 0};
    },
    overall: function(){
      var all = SurahSite.SURAHS, t = {surahs: all.length, completed: 0, inprogress: 0, notstarted: 0, known: 0, viewed: 0, ayahs: 0};
      all.forEach(function(s){ var x = P.summary(s); t.known += x.known; t.viewed += x.viewed; t.ayahs += x.n; if (x.complete) { t.completed++; } else if (x.started) { t.inprogress++; } else { t.notstarted++; } });
      t.pct = t.ayahs ? Math.round(t.known * 100 / t.ayahs) : 0;
      return t;
    },
    reset: function(){ return save(fresh()); },
    exportJSON: function(){
      var s = SurahSite.session();
      return JSON.stringify({app: 'surah-lessons', version: 3, user: s ? s.user : '', exported: new Date().toISOString(), progress: load()}, null, 1);
    },
    importJSON: function(text){
      var o; try { o = JSON.parse(text); } catch (e) { return false; }
      if (!o || typeof o !== 'object') { return false; }
      var prog = o.progress ? o.progress : (o.store ? o.store : o);
      prog = normalize(prog);
      if (!prog) { return false; }
      return save(prog);
    }
  };
  window.SurahProgress = P;
})();
