function makeNavbar() {
  let title = $("title").text();
  $("#navbar").append(
    `<ul id="navlist" class="navbar-nav mr-auto">
      <li class="nav-item">
        <a class="nav-link" href="dotocalc.html">DotoCalc</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="stats.html">Stats</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="about.html">About</a>
      </li>
    </ul>`
  );
  if (title == "DotoCalc") {
    $("#navlist").append(
      `<li class="nav-item">
        <label class="nav-link" for="randomDMG"><input type="checkbox" id="randomDMG" checked>Non-Random DMG?</label>
      </li>
      <li>
        <label class="nav-link" for="toggleItemStats"><input type="checkbox" id="toggleItemStats">Item stats?</label>
      </li>`
    );
  };
};

$(window).on("load", makeNavbar);
