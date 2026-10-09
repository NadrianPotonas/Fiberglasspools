# Simplified migration update

Merge this update into your current project. Keep your existing public/pools and public/images and any favicon/branding files. Overwrite public/.htaccess and public/robots.txt with the supplied versions, merging required hosting rules. If you applied the previous migration package, delete its public/legacy-assets folder: those old images are no longer used. Run npm install and npm run build. Vite replaces the old dist contents.

Upload the contents of the newly generated dist to the production domain root, including hidden .htaccess. Remove previously uploaded generated gallery, brochure, news, categories and products folders if present; keep your pool assets. The supplied redirect/Gone rules still handle requests to those paths.

## Content retained
About Us and Become an Entrepreneur retain their original text and footer links. Your current pool quote pages remain unchanged apart from removal of additional legacy photos/descriptions. Why Fibreglass already covers construction, installation, care and guarantees; docs.php and /brochure redirect there.

## URL treatment
Exact old product IDs matching your current catalogue redirect to their pool-specific quote pages. The old Gallery and category listings for splash, medium, large, garden spas and above-ground pools redirect to /pools, which presents the current range. Categories with no equivalent, removed products and all old news return HTTP 410 Gone. Old image-service URLs for removed content also return 410. Unknown IDs and missing pages return 404. REDIRECT-MAP.csv lists the decision for each discovered URL.

The review covers publicly linked URLs found by crawling the old site on 9 October 2026. Without logs or database history, unlinked historical URLs cannot be verified. No ranking-preservation guarantee is implied; removing content can reduce visibility for the searches that depended on it.

## Checks
The build generates 31 HTML pages, including the noindex 404 page. Run python scripts/check-migration.py after the build for local rule/destination checks. Vite preview does not execute Apache .htaccess. On Apache hosting verify actual 301 -> 200 chains, 410 responses for removed IDs and 404 responses for unknown IDs. Requires mod_rewrite and AllowOverride enabled; other servers need equivalent configuration.

Back up the existing live site and database before deployment. Keep the same domain and HTTPS. Keep permanent redirects for at least one year. Confirm quote email, WhatsApp, current business claims and catalogue details before launch.
