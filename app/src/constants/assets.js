/**
 * Single source of truth for brand assets.
 *
 * RULE: Never hardcode the logo URL anywhere else. Every in-app reference and
 * every icon/splash generation script must import LOGO_URL from this file.
 *
 * Authored as CommonJS so it can be required from app.config.ts (Expo's config
 * loader transpiles only the entry config and resolves nested imports via plain
 * Node `require`, which cannot resolve a `.ts` extension). Types live in
 * assets.d.ts so TypeScript app code keeps full type-safety.
 */

/** Logo source of truth. */
const LOGO_URL = 'https://www.swag.gg/logos/swag-logo-1024x1024.png';

/** Full-black brand background used by the splash screen and app shell. */
const BRAND_BACKGROUND = '#000000';

module.exports = { LOGO_URL, BRAND_BACKGROUND };
