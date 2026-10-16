idkvideos — GitHub Pages bundle

PUBLISH
1. Extract this ZIP.
2. Upload everything inside this folder to the ROOT of your GitHub repository, KEEPING THE FOLDER STRUCTURE (do not flatten it):

     index.html          <- landing website (what visitors see first)
     install.html
     service-worker.js   <- cleanup worker for old installs, leave it in place
     app/
       index.html        <- the actual viewer / PWA
       manifest.webmanifest
       service-worker.js
       icon-192.png
       icon-512.png

   Two different files are both called index.html. The root one is the landing page,
   the one in app/ is the viewer. If they end up in the same folder, one overwrites the other.
3. In GitHub, open Settings -> Pages. Choose Deploy from a branch, select main and /(root), then Save.
4. Open the published URL. The landing page loads first; "Open idkvideos" / "enter the void" opens /app/.

IF YOU STILL SEE THE OLD APP AT THE ROOT
Browsers that opened the old version cached it. The root service-worker.js removes that cache
automatically on the next visit (it may take one or two reloads). Or clear the site data once.

CONTROLS (viewer)
Scroll: mouse wheel / trackpad, swipe up/down on touch, or Arrow keys / J / K.
Tap or click the video to pause/play. Space or L = like, D = dislike, M = mute, S = settings.

FIRST USE
The viewer asks for a YouTube Data API v3 key in Settings. GitHub Pages is static hosting, so it cannot
securely store a private key. Don't embed a sensitive key in public source code.
The PWA caches the app shell only; YouTube playback and feed discovery need internet.
Use HTTPS (GitHub Pages) for PWA installation.
