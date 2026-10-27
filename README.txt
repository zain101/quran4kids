SURAH LESSONS - STATIC WEBSITE
==============================

WHAT IS INSIDE
  index.html            Sign-in page (the entry point)
  surahs.html           List of surahs
  surah.html            One surah, with 3 tabs: Animation, Game, Worksheets
  assets/               Styles, shared code and users.js (the login file)
  animations/           Animation pages + audio/ (Ayman Sowaid recitation, 134 mp3 files)
  games/                Games
  worksheets/           Activity worksheets (PDF), in age-5-8/ and age-9-12/
  progress.html         Progress overview (from the animations), backup and reset
  admin/make-user.html  Small tool to add or change users

SIGN IN
  Default user:      teacher
  Default password:  surah2026
  Please change this before sharing the site (see "ADD OR CHANGE USERS").
  After signing in, the browser remembers you for 30 days on that device.
  The sign-out button (top right) ends the session.

PROGRESS (from the animations)
  Progress comes from the animation on each surah page. Every ayah you watch is counted as "watched",
  and every ayah marked "I know it!" in the animation is counted as "known".
  The surah page shows a bar and a grid of ayahs (grey = not seen, yellow = watched, green = known).
  The surah list shows a bar on every card, and the chart icon opens the progress page
  (completed / in progress / not started, overall percentage).
  Progress is saved only when the animation is used on the surah page (not in the "full screen" link).

BOOKLETS
  The Worksheets tab starts with a "Booklet download" section (Download booklet / Open) for every surah that has a booklet.
  The files are in worksheets/booklets.

MORE GAMES (Memory & quiz)
  The last 10 surahs (105 to 114) also have a second game set: Memory Match, True or False and Order the Ayah.
  Choose it with the "Memory & quiz" button on the Game tab. The files are in games/quiz (open games/quiz/index.html for a menu of all ten).

REPEAT AUDIO
  In the animations, the repeat button (circular arrows with a 5) next to the speaker plays the ayah 5 times in a row.
  Press it again, or change ayah, to stop.

BACKUP
  The progress page has "Download backup" and "Load backup". The backup file contains the progress,
  so you can keep it safe or move it to another device.

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
