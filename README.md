# Delight Veld website

Responsive static website for Delight Veld (Pvt) Ltd, a Zimbabwean land development and property services company.

## Included

- Existing Delight Veld homepage, services, property information and contact sections
- Responsive layout and existing brand assets
- 20 development photographs served from Cloudflare R2
- Homepage hero video and full development video served from Cloudflare R2
- Lazy-loaded gallery images and click-to-play long video

## R2 media integration

- Homepage hero video (20 seconds, 12.64 MB): `https://media.delightveld.com/Videos/Veld%20vids/ROYALTY_FREE_Business_Technology_Music___Presentation_Background_Music_Royalty_Free_by_MUSIC4VIDEO%28256k%29.mp4`
- Full development video (approximately 84 seconds, 49.48 MB): `https://media.delightveld.com/Videos/Veld%20vids/ROYALTY_FREE_Business_Technology_Music___Presentation_Background_Music_Royalty_Free_by_MUSIC4VIDEO%28256k%29_1.mp4`
- Gallery: 20 photographs from the `Images/` and `Images/Vp2/` prefixes on `media.delightveld.com`.
- The long video is click-to-play (`preload=none`). The homepage hero video is muted/looping on desktop and falls back to the existing poster image on small screens and reduced-motion settings.

## Deploy

Deploy the contents of this folder to the existing static hosting project. Keep `index.html`, `script.js`, `styles.css` and the `assets` folder together at the site root.
