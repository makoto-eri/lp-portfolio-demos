# 月讀（tsukuyomi）画像の来歴記録

AGENTS.md「画像は出典、利用許諾、AI生成区分を確認する」「焼き込んだ文言の生成プロンプトを保管する」に基づく記録。

- AI生成区分: 3枚（01-hero / 02-craft / 03-offer）すべて **AI生成**（GPT Image 2・OpenAI API経由・2026-08-15生成のv3）。実在の店舗・商品・人物の写真ではない
- 利用許諾: 自アカウントのAPI生成物（OpenAI利用規約に基づき商用利用可）。参照画像はv3ヒーロー（自作）のみで、他社画像・Web収集画像は入力に使用していない
- 加工: 1152×2048で生成 → PIL で 1024×1820 にリサイズ → WebP（quality 82）
- 焼き込み文言（AGENTS.md 例外の範囲内・15字以内の装飾見出しと屋号のみ）: 01-hero「月讀」／02-craft「彫金師が、ひとつずつ」／03-offer なし。価格・CTA・日付は全てHTMLオーバーレイ
- 利用条件の確認: OpenAI Terms of Use（https://openai.com/policies/terms-of-use/ ）の「Content」条項（出力の権利はユーザーに帰属し商用利用可）を 2026-08-15 に確認。生成物は本デモ専用で、第三者商標・実在人物を含まない
- 受け皿実測座標・作業記録の正本: `Documents/02_制作中/Webデザイン制作/実績ポートフォリオ/画像LPテスト 月讀ジュエリー/生成プロンプトとコピーデッキ.md`（v3セクション。以下の全文プロンプトと同内容）

## v3 完全プロンプト（2026-08-15 投入・原文まま）

生成条件: GPT Image 2（mcp-image-gpt経由・OpenAI API）／aspectRatio 9:16・imageSize 2K・quality "quality"／02と03は inputImagePath に 01-hero の生成原本（tsukuyomi-hero-v3.png）を参照指定。実出力はいずれも1152×2048。

### 01-hero.webp（参照画像なし・スタイルアンカー／2026-08-15 v4b・再生成2回で採用）

v3採用後、本人指摘「石まで金一色は違和感」を受けて素材リアリズム指定を追加し再生成（1回目v4はバッジが輪郭線になり不採用、2回目v4bで採用）。原本: `tsukuyomi-hero-v4b.png`（04_素材/AI生成画像）。

```
Vertical hero section of a luxury Japanese landing page for a custom jewelry atelier, designed as an advertisement layout with reserved text zones. Color palette: deep black #0A0A0A base, gold #C9A227 main, white #FFFFFF accent. Texture: gold foil stamping, engraved metal detail, black velvet fabric with visible weave. Lighting: single dramatic side spotlight on a dark background, deep natural shadows, shallow depth of field, studio product photography realism. Absolutely no floating particles, no sparks, no glitter dust, no light trails, no glow effects, no lens flare. The very top edge and the very bottom edge of the image must end in solid flat #0A0A0A black.
Material realism is critical: the ring band is engraved yellow gold, but the center stone is a brilliant-cut COLORLESS WHITE DIAMOND — transparent, icy white with crisp white facet reflections, absolutely not gold-tinted, not champagne, not yellow — held by bright platinum (silver-white) prongs. The diamond and prongs must clearly read as different materials from the gold band.
Zone map from top to bottom:
1) Upper area (top 4-10%): render exactly and only these two Japanese kanji characters as an elegant gold serif logotype: 「月讀」. Do not add any other letters, words, or characters anywhere in the image.
2) Upper right (roughly 70-95% width, 10-23% height): one SOLID FILLED circular disc of hammered gold foil, like a round wax seal or a gold coin — the entire disc surface completely covered in gold foil texture edge to edge, NOT an outline, NOT a ring shape, no hole, no text, no icon. It will be used as a background plate for dark text.
3) Middle (25-60% height): the handcrafted engagement ring described above, dramatically oversized and tilted diagonally, resting partly on black velvet, crisp rim light tracing the engraved gold band, the white diamond catching a clean white highlight, background falling into soft dark bokeh.
4) A horizontal band of black velvet fabric (roughly 62-78% height): empty, low contrast, no detail, reserved for headline text overlay.
5) A glossy rounded gold pill plate (roughly 81-91% height, horizontally centered, about 65% of the width): completely blank, reserved for a button label overlay.
No text anywhere except the logotype in zone 1.
```

受け皿の実測（ピクセル走査・v4b）: 金箔バッジ円 x73.4〜96.9% / y9.8〜23.3%（中心 85.2, 16.6）、金ピル x16.6〜82.6% / y81.9〜90.8%（中心 49.6, 86.4）。オーバーレイは中心合わせで配置。

### 02-craft.webp（参照画像: tsukuyomi-hero-v3.png）

```
Vertical middle section of the same luxury Japanese landing page as the reference image. Match the reference style exactly: deep black #0A0A0A base, gold #C9A227 main, white #FFFFFF accent, no other colors; engraved metal detail, black velvet texture; single dramatic side spotlight, deep natural shadows, shallow depth of field, studio photography realism. Absolutely no floating particles, no sparks, no glitter dust, no light trails, no glow effects, no lens flare. The very top edge and the very bottom edge must end in solid flat #0A0A0A black.
Zone map:
1) Upper area (top 5-11%): render exactly and only this Japanese text as one elegant gold serif line: 「彫金師が、ひとつずつ」. Do not add any other letters, words, or characters anywhere.
2) Middle (18-72% height): extreme close-up of a metalsmith's single hand holding a fine engraving chisel against a gold ring fixed in a dark workbench vise, photographed from the side so only the thumb and two fingertips are visible gripping the tool, anatomically correct fingers, warm rim light on the hand and tool, fine gold shavings resting statically on the dark bench surface (not flying, not floating), engraving grooves sharply in focus, background falling into soft dark bokeh.
3) Bottom quarter (76-100% height): plain dark low-contrast empty space with no detail, reserved for text overlay.
```

### 03-offer.webp（参照画像: tsukuyomi-hero-v3.png）

```
Vertical closing section of the same luxury Japanese landing page as the reference image. Match the reference style exactly: deep black #0A0A0A base, gold #C9A227 main, white #FFFFFF accent, no other colors; engraved metal detail, black velvet texture; single dramatic side spotlight, deep natural shadows, shallow depth of field, studio photography realism. Absolutely no floating particles, no sparks, no glitter dust, no light trails, no glow effects, no lens flare. The very top edge and the very bottom edge must end in solid flat #0A0A0A black.
Zone map:
1) Top (4-10% height): a thin ornate art-deco gold divider ornament, centered, subtle.
2) Upper middle (12-55% height): a pair of finished gold wedding rings with fine hand-engraved scroll patterns, resting side by side on gently folded black velvet, one ring leaning against the other, crisp rim light tracing both bands, engraving detail sharply in focus, soft dark bokeh background, natural contact shadows under the rings.
3) Bottom half (56-100% height): plain dark low-contrast empty space fading to solid #0A0A0A, no detail, reserved for price and button overlays.
Render no text at all. Do not add any letters, words, numbers, or characters anywhere.
```
