const MODEL = "gemini-2.5-flash";

const PAGE = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="theme-color" content="#071426">
<title>KNOWVERSE AI — Knowledge Assistant</title>
<style>
:root{color-scheme:dark;--bg:#071426;--panel:#0d2038;--line:#1d3857;--cyan:#42d9f5;--muted:#9bb0c9;--white:#f4f8ff}
*{box-sizing:border-box}body{margin:0;background:radial-gradient(ellipse at 50% -20%,#123d61 0%,var(--bg) 58%);font:16px/1.55 system-ui,-apple-system,Segoe UI,sans-serif;color:var(--white);min-height:100vh}
.shell{width:min(900px,100%);margin:auto;padding:24px 16px 40px}.top{display:flex;align-items:center;gap:12px;margin:10px 0 28px}.logo{width:46px;height:46px;border-radius:14px;background:linear-gradient(135deg,#35d8f2,#2368bb);display:grid;place-items:center;color:#031321;font-weight:900;font-size:22px;box-shadow:0 8px 28px #20c8e344}.brand{font-weight:850;letter-spacing:2px;font-size:18px}.subbrand{font-size:12px;color:var(--muted);letter-spacing:1.5px}.hero{text-align:center;margin:30px auto 26px}.pill{display:inline-block;border:1px solid #2b6682;color:var(--cyan);padding:5px 11px;border-radius:99px;font-size:12px;letter-spacing:1px}.hero h1{font-size:clamp(30px,6vw,48px);line-height:1.1;margin:15px 0 10px}.hero h1 span{color:var(--cyan)}.hero p{color:var(--muted);max-width:590px;margin:auto}.panel{border:1px solid var(--line);background:linear-gradient(180deg,#102641ee,#0a1a2eee);border-radius:22px;overflow:hidden;box-shadow:0 18px 60px #0005}.toolbar{padding:14px 18px;border-bottom:1px solid var(--line);display:flex;justify-content:space-between;align-items:center;color:var(--muted);font-size:13px}.status{color:#77e5b4}.messages{height:min(52vh,520px);min-height:300px;overflow:auto;padding:20px;display:flex;flex-direction:column;gap:14px}.msg{max-width:88%;padding:12px 15px;border-radius:16px;white-space:pre-wrap;overflow-wrap:anywhere}.bot{align-self:flex-start;background:#142d49;border:1px solid #244666}.user{align-self:flex-end;background:#123e58;border:1px solid #23718d}.composer{padding:14px;border-top:1px solid var(--line);display:flex;gap:10px}.composer textarea{flex:1;resize:vertical;min-height:48px;max-height:140px;border:1px solid #294867;border-radius:14px;background:#07182b;color:white;padding:13px;font:inherit;outline:none}.composer textarea:focus{border-color:var(--cyan)}button{border:0;border-radius:14px;padding:0 20px;background:linear-gradient(135deg,#42d9f5,#3294d5);color:#041525;font-weight:800;font-size:15px;cursor:pointer}button:disabled{opacity:.5;cursor:wait}.hint{font-size:12px;color:var(--muted);text-align:center;margin:12px}.quick{display:flex;gap:8px;justify-content:center;flex-wrap:wrap;margin:18px 0}.quick button{background:#102b45;color:#cdeeff;border:1px solid #28516e;padding:8px 12px;font-size:12px}.foot{text-align:center;color:#8299b4;font-size:12px;margin:22px 0}.foot a{color:var(--cyan);text-decoration:none}
@media(max-width:520px){.shell{padding:16px 10px 28px}.messages{padding:14px;height:52vh}.msg{max-width:95%}.composer{padding:10px}.composer button{padding:0 14px}.hero{margin:20px auto}}
</style>
</head>
<body><main class="shell">
<header class="top"><div class="logo">K</div><div><div class="brand">KNOWVERSE</div><div class="subbrand">EXPLORE • LEARN • DISCOVER</div></div></header>
<section class="hero"><span class="pill">FREE AI KNOWLEDGE ASSISTANT</span><h1>Ask. Explore. <span>Understand.</span></h1><p>Your learning companion for science, technology, history, general knowledge and more. Ask in English or Sinhala.</p></section>
<section class="panel"><div class="toolbar"><span>KNOWVERSE AI CHAT</span><span class="status">● Ready</span></div><div class="messages" id="messages" aria-live="polite"><div class="msg bot">ආයුබෝවන්! 👋 I'm KNOWVERSE AI. Ask me anything about learning, science, technology, history or general knowledge.</div></div><form class="composer" id="form"><textarea id="prompt" maxlength="4000" placeholder="Type your question… / ඔබේ ප්‍රශ්නය ලියන්න" required></textarea><button id="send" type="submit">Send ➤</button></form></section>
<div class="quick"><button data-q="Explain how artificial intelligence works simply.">How AI works</button><button data-q="Tell me 5 amazing science facts.">Science facts</button><button data-q="Give me a short general knowledge quiz.">Quick quiz</button></div>
<p class="hint">AI can make mistakes. Verify important information with reliable sources. Do not share passwords or private information.</p>
<footer class="foot">Part of <a href="https://httpsknowverse.wordpress.com/">KNOWVERSE</a> · Powered by Gemini</footer>
</main>
<script>
const form=document.getElementById('form'),input=document.getElementById('prompt'),send=document.getElementById('send'),messages=document.getElementById('messages');
let history=[];
function bubble(text,who){const el=document.createElement('div');el.className='msg '+who;el.textContent=text;messages.appendChild(el);messages.scrollTop=messages.scrollHeight;return el}
async function ask(q){if(!q.trim()||send.disabled)return;bubble(q,'user');input.value='';send.disabled=true;send.textContent='…';const pending=bubble('Thinking…','bot');
try{const r=await fetch('/api/chat',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({message:q,history})});const data=await r.json();if(!r.ok)throw new Error(data.error||'Request failed');pending.textContent=data.reply;history.push({role:'user',parts:[{text:q}]},{role:'model',parts:[{text:data.reply}]});if(history.length>12)history=history.slice(-12)}
catch(e){pending.textContent='Sorry, I could not answer right now. '+e.message}
finally{send.disabled=false;send.textContent='Send ➤';input.focus()}}
form.addEventListener('submit',e=>{e.preventDefault();ask(input.value)});
document.querySelectorAll('[data-q]').forEach(b=>b.addEventListener('click',()=>ask(b.dataset.q)));
input.addEventListener('keydown',e=>{if(e.key==='Enter'&&!e.shiftKey){e.preventDefault();form.requestSubmit()}});
</script></body></html>`;

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (request.method === "GET" && url.pathname === "/") {
      return new Response(PAGE, { headers: { "content-type": "text/html; charset=utf-8", "x-content-type-options": "nosniff" } });
    }
    if (request.method === "POST" && url.pathname === "/api/chat") {
      if (!env.GEMINI_API_KEY) return Response.json({ error: "The AI service has not been configured yet." }, { status: 503 });
      try {
        const body = await request.json();
        const message = String(body.message || "").trim();
        if (!message || message.length > 4000) return Response.json({ error: "Please enter a question under 4,000 characters." }, { status: 400 });
        const history = Array.isArray(body.history) ? body.history.slice(-12) : [];
        const contents = [...history, { role: "user", parts: [{ text: message }] }];
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent`, {
          method: "POST",
          headers: { "Content-Type": "application/json", "x-goog-api-key": env.GEMINI_API_KEY },
          body: JSON.stringify({
            contents,
            systemInstruction: { parts: [{ text: "You are KNOWVERSE AI, a helpful, accurate educational assistant. Explain clearly for students. Respond in the language the user uses, including Sinhala. Be honest about uncertainty. Never claim to have browsed the web unless a search tool was actually used. Encourage checking reliable sources for important facts." }] },
            generationConfig: { temperature: 0.6, maxOutputTokens: 900 }
          })
        });
        const data = await response.json();
        if (!response.ok) return Response.json({ error: data.error?.message || "Gemini API request failed." }, { status: response.status });
        const reply = data.candidates?.[0]?.content?.parts?.map(p => p.text || "").join("").trim();
        if (!reply) return Response.json({ error: "No answer was returned. Please try again." }, { status: 502 });
        return Response.json({ reply });
      } catch (e) {
        return Response.json({ error: "Could not process that request. Please try again." }, { status: 500 });
      }
    }
    return new Response("Not found", { status: 404 });
  }
};
