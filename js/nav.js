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
    </ul>`
  );
  if (title == "DotoCalc") {
    $("#navlist").append(
      `<li class="nav-item">
        <label class="nav-link" for="randomDMG"><input type="checkbox" id="randomDMG">Non-Random DMG?</label>
      </li>`
    );
  };
};

$(window).on("load", makeNavbar);
