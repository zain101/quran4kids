SURAH LESSONS - STATIC WEBSITE
==============================

WHAT IS INSIDE
  index.html            Sign-in page (the entry point)
  surahs.html           List of surahs
  surah.html            One surah, with 3 tabs: Animation, Game, Worksheets
  assets/               Styles, shared code and users.js (the login file)
  animations/           Animation pages + audio/ (Ayman Sowaid recitation, 97 mp3 files)
  games/                Games
  worksheets/           Activity worksheets (PDF), in age-5-8/ and age-9-12/
  admin/make-user.html  Small tool to add or change users

SIGN IN
  Default user:      teacher
  Default password:  surah2026
  Please change this before sharing the site (see "ADD OR CHANGE USERS").
  After signing in, the browser remembers you for 30 days on that device.
  The sign-out button (top right) ends the session.

ADD OR CHANGE USERS
  Login details are stored in the local file  assets/users.js
  (salted and hashed, not plain text).
  1. Open admin/make-user.html in your browser.
  2. Type a username and password and press "Create line".
  3. Copy the line into assets/users.js inside the list, then save.

RUN IT ON YOUR OWN COMPUTER
  Option 1 (simplest): double-click index.html.
  Option 2 (starts a small local server, needs Python 3):
    Windows: double-click Start-Site.bat
    Mac:     double-click Start-Site.command  (first time: right-click > Open)
    Linux:   run  sh start-site.sh
  It opens http://localhost:8765 in your browser. Close the window to stop it.

OPEN IT
  Easiest: double-click index.html (works offline in Chrome, Edge, Firefox and Safari).
  Online: upload the whole folder to any static host (Netlify Drop, GitHub Pages,
  Cloudflare Pages, or your own web space). No server or database is needed.

ADD MORE CONTENT
  1. Copy the new HTML or PDF into animations/, games/ or worksheets/age-5-8/ or worksheets/age-9-12/.
  2. Open assets/app.js and add it to that surah in the SURAHS list
     (or add a new surah entry). Items marked "Coming soon" appear when a list is empty.
  For animation audio: put mp3 files in animations/audio/ named like 090001.mp3.

IMPORTANT ABOUT SECURITY
  This is a static site, so the login is a simple gate to keep casual visitors out.
  It is not strong protection: anyone who knows the direct file addresses can open them,
  and anyone who can read the site files can try to guess the password offline.
  If the lessons must be truly private, host them behind your hosting provider's
  password protection (for example Netlify or Cloudflare Access) as well.
  Use a long password.
