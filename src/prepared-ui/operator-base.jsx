import React from "react";

// OPERATOR — shared tokens + tiny primitives
// Dark performance dashboard, cyan accent.
(function(){
  // Accent palette options — same chroma/lightness, different hue.
  const OP_ACCENTS = {
    cyan:    { accent: "oklch(0.80 0.13 205)", accentDim: "oklch(0.55 0.09 205)" },
    amber:   { accent: "oklch(0.80 0.13 75)",  accentDim: "oklch(0.55 0.09 75)"  },
    lime:    { accent: "oklch(0.80 0.16 135)", accentDim: "oklch(0.55 0.10 135)" },
    magenta: { accent: "oklch(0.74 0.18 340)", accentDim: "oklch(0.55 0.12 340)" },
    violet:  { accent: "oklch(0.74 0.15 290)", accentDim: "oklch(0.55 0.10 290)" },
    red:     { accent: "oklch(0.72 0.18 25)",  accentDim: "oklch(0.55 0.12 25)"  },
  };

  const OP_TOKENS = {
    dark: {
      bg:        "#0b0d10",
      bg2:       "#0f1217",
      surface:   "#13171d",
      surfaceHi: "#181d24",
      line:      "#222831",
      lineHi:    "#2c333e",
      text:      "#e6eaf0",
      dim:       "#9aa3b2",
      mute:      "#5b6472",
      accent:    "oklch(0.80 0.13 205)",   // cyan
      accentDim: "oklch(0.55 0.09 205)",
      good:      "oklch(0.80 0.16 150)",
      warn:      "oklch(0.82 0.15 80)",
      bad:       "oklch(0.72 0.18 25)",
      gridStroke:"#1a1f27",
    },
    light: {
      bg:        "#f3f1ec",
      bg2:       "#ecebe5",
      surface:   "#ffffff",
      surfaceHi: "#f7f6f1",
      line:      "#dcd9d1",
      lineHi:    "#c2bfb5",
      text:      "#15171b",
      dim:       "#5b6271",
      mute:      "#8c93a1",
      accent:    "oklch(0.55 0.13 220)",
      accentDim: "oklch(0.75 0.05 220)",
      good:      "oklch(0.55 0.16 150)",
      warn:      "oklch(0.65 0.16 60)",
      bad:       "oklch(0.55 0.18 25)",
      gridStroke:"#e3e1d8",
    }
  };

  // Build a token set with overridden accent + theme.
  function getOpTokens({mode = "dark", accent = "cyan"} = {}){
    const base = mode === "light" ? OP_TOKENS.light : OP_TOKENS.dark;
    const ac = OP_ACCENTS[accent] || OP_ACCENTS.cyan;
    return { ...base, ...ac };
  }

  const OP_FONT_BODY = "'JetBrains Mono', ui-monospace, Menlo, monospace";
  const OP_FONT_DISP = "'Space Grotesk', 'Inter', system-ui, sans-serif";

  // Lightweight primitives (consume tokens from props)
  function OpPill({children, tone="dim", t}) {
    const c = tone === "good" ? t.good
            : tone === "bad"  ? t.bad
            : tone === "warn" ? t.warn
            : tone === "accent" ? t.accent
            : t.dim;
    return (
      <span style={{
        display: "inline-block",
        fontFamily: OP_FONT_BODY, fontSize: 10, fontWeight: 600,
        color: c, border: `1px solid ${c}55`,
        background: `${c}10`,
        padding: "2px 7px",
        letterSpacing: "0.08em", textTransform: "uppercase",
        whiteSpace: "nowrap", lineHeight: 1.4,
      }}>{children}</span>
    );
  }

  function OpKpi({label, value, sub, tone, t}) {
    const valColor = tone === "good" ? t.good
                   : tone === "bad"  ? t.bad
                   : tone === "warn" ? t.warn
                   : t.text;
    return (
      <div style={{
        background: t.surface, border: `1px solid ${t.line}`,
        padding: "14px 16px 12px",
        display: "flex", flexDirection: "column", gap: 4, minHeight: 92
      }}>
        <div style={{
          fontFamily: OP_FONT_BODY, fontSize: 10, color: t.mute,
          letterSpacing: "0.14em", textTransform: "uppercase"
        }}>{label}</div>
        <div style={{
          fontFamily: OP_FONT_DISP, fontSize: 32, lineHeight: 1,
          color: valColor, fontWeight: 500, letterSpacing: "-0.02em"
        }}>{value}</div>
        {sub && (
          <div style={{
            fontFamily: OP_FONT_BODY, fontSize: 11, color: t.dim, lineHeight: 1.4
          }}>{sub}</div>
        )}
      </div>
    );
  }

  function OpBar({value, color, bg, height=4}){
    return (
      <div style={{height, background: bg, position: "relative"}}>
        <div style={{
          position: "absolute", inset: 0, right: "auto",
          width: `${Math.max(0, Math.min(100, value))}%`,
          background: color
        }} />
      </div>
    );
  }

  // Subtle striped placeholder
  function OpStripe({w, h, label, t}){
    const id = "stripe-"+Math.random().toString(36).slice(2,8);
    return (
      <div style={{
        width: w, height: h, background: t.surfaceHi,
        border: `1px dashed ${t.line}`, position: "relative",
        display: "flex", alignItems: "center", justifyContent: "center",
        overflow: "hidden"
      }}>
        <svg width="100%" height="100%" style={{position:"absolute", inset:0}}>
          <defs>
            <pattern id={id} width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
              <line x1="0" y1="0" x2="0" y2="6" stroke={t.line} strokeWidth="1"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill={`url(#${id})`} opacity="0.5"/>
        </svg>
        {label && (
          <div style={{
            position: "relative", zIndex: 1,
            fontFamily: OP_FONT_BODY, fontSize: 10,
            color: t.mute, letterSpacing: "0.1em", textTransform: "uppercase",
            background: t.bg, padding: "2px 6px"
          }}>{label}</div>
        )}
      </div>
    );
  }

  // 7-day sparkline (compliance rate) — auto-ranged to data so it isn't flat.
  function OpSpark({data, t, height=46, accent}){
    const dataMin = Math.min(...data);
    const dataMax = Math.max(...data);
    const padRange = Math.max(10, (dataMax - dataMin) * 0.5);
    const min = Math.max(0,   Math.floor(dataMin - padRange));
    const max = Math.min(100, Math.ceil (dataMax + padRange));
    const w = 220, h = height;
    const stepX = w / (data.length - 1);
    const pts = data.map((v, i) => {
      const x = i*stepX;
      const y = h - ((v-min)/(max-min))*h;
      return [x,y];
    });
    const d = pts.map((p,i)=> (i?`L${p[0]} ${p[1]}`:`M${p[0]} ${p[1]}`)).join(" ");
    const area = d + ` L${w} ${h} L0 ${h} Z`;
    // Grid lines: pick 3 evenly spaced gridlines INSIDE the visible range.
    const grids = [0.25, 0.5, 0.75].map(p => Math.round(min + (max-min)*p));
    return (
      <svg viewBox={`0 0 ${w} ${h}`} width="100%" height={h} preserveAspectRatio="none">
        {grids.map(g=>(
          <line key={g} x1="0" x2={w}
            y1={h - ((g-min)/(max-min))*h} y2={h - ((g-min)/(max-min))*h}
            stroke={t.gridStroke} strokeDasharray="2 3" strokeWidth="1"/>
        ))}
        <path d={area} fill={accent||t.accent} opacity="0.12"/>
        <path d={d} fill="none" stroke={accent||t.accent} strokeWidth="1.5" vectorEffect="non-scaling-stroke"/>
        {pts.map((p,i)=>(
          <circle key={i} cx={p[0]} cy={p[1]} r="2.2" fill={t.bg} stroke={accent||t.accent} strokeWidth="1.4" vectorEffect="non-scaling-stroke"/>
        ))}
      </svg>
    );
  }

  // Tab strip (Operator)
  function OpTabs({tabs, active, onChange, t}){
    return (
      <div style={{
        display: "flex", gap: 0, borderBottom: `1px solid ${t.line}`
      }}>
        {tabs.map(tb => {
          const a = tb.id === active;
          return (
            <button key={tb.id} onClick={()=>onChange(tb.id)} style={{
              background: "transparent",
              color: a ? t.text : t.dim,
              border: "none",
              borderBottom: `2px solid ${a ? t.accent : "transparent"}`,
              padding: "12px 16px",
              fontFamily: OP_FONT_BODY, fontSize: 11, fontWeight: 600,
              letterSpacing: "0.12em", textTransform: "uppercase",
              cursor: "pointer", marginBottom: -1
            }}>{tb.label}</button>
          );
        })}
      </div>
    );
  }

  Object.assign(window, {OP_TOKENS, OP_ACCENTS, getOpTokens, OP_FONT_BODY, OP_FONT_DISP, OpPill, OpKpi, OpBar, OpStripe, OpSpark, OpTabs});
})();
