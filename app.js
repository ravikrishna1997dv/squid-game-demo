(() => {
  "use strict";
  const $ = id => document.getElementById(id);
  $("year").textContent = new Date().getFullYear();

  const roundDetails = [
    ["ROUND 01 / SAMPLE FORMAT", "Red Light, Green Light", "A host-led movement challenge with clearly marked zones, accessible alternatives, controlled player flow and non-contact rules."],
    ["ROUND 02 / SAMPLE FORMAT", "Mini 4", "A short series of skill-based mini-games with simple scoring, visible rules and marshal-supervised transitions. Exact games and timings remain to be designed."],
    ["ROUND 03 / SAMPLE FORMAT", "Dalgona-style precision", "A precision and patience challenge using safe, purpose-designed materials and tools—not sharp or hazardous equipment."],
    ["ROUND 04 / SAMPLE FORMAT", "Mingle", "A social coordination challenge built around clear group instructions, accessible participation and safe crowd movement."],
    ["ROUND 05 / WORKING NAME", "Night surprise challenge", "The original concept includes an overnight surprise round using the working name “Duckje”. Final mechanics, permissions, rest periods and safety controls are not yet defined."]
  ];
  document.querySelectorAll(".round").forEach(button => button.addEventListener("click", () => {
    document.querySelectorAll(".round").forEach(item => item.classList.toggle("active", item === button));
    const d = roundDetails[Number(button.dataset.round)];
    $("round-detail").innerHTML = `<span class="detail-kicker">${d[0]}</span><h3>${d[1]}</h3><p>${d[2]}</p><span class="detail-foot">Concept only · Final rules and safety design pending</span>`;
  }));

  const attendance = $("attendance"), ticket = $("ticket"), cost = $("cost");
  const money = n => "₹" + Math.round(n).toLocaleString("en-IN");
  function updateCalculator() {
    const people = +attendance.value, price = +ticket.value, costs = +cost.value;
    const revenue = people * price, surplus = revenue - costs - 100000;
    $("attendance-value").textContent = `${people} players`;
    $("ticket-value").textContent = money(price);
    $("cost-value").textContent = money(costs);
    $("calc-revenue").textContent = money(revenue);
    $("calc-surplus").textContent = (surplus < 0 ? "−" : "") + money(Math.abs(surplus));
    $("calc-surplus").style.color = surplus < 0 ? "var(--pink)" : "var(--lime)";
  }
  [attendance, ticket, cost].forEach(input => input.addEventListener("input", updateCalculator));
  updateCalculator();

  const menu = $("menu-toggle"), nav = document.querySelector(".desktop-nav");
  menu.addEventListener("click", () => {
    const opened = nav.classList.toggle("mobile-open");
    menu.setAttribute("aria-expanded", String(opened));
    menu.setAttribute("aria-label", opened ? "Close navigation" : "Open navigation");
    menu.textContent = opened ? "✕" : "☰";
  });
  nav.querySelectorAll("a").forEach(a => a.addEventListener("click", () => {
    nav.classList.remove("mobile-open");
    menu.setAttribute("aria-expanded", "false");
    menu.textContent = "☰";
  }));

  const revealObserver = "IntersectionObserver" in window ? new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in-view");
        revealObserver.unobserve(entry.target);
      }
    });
  }, {threshold: 0.12}) : null;
  if (revealObserver) document.querySelectorAll(".experience-card,.business-card,.trust-grid article,.number-card").forEach(el => {
    el.style.opacity = "0";
    el.style.transform = "translateY(12px)";
    el.style.transition = "opacity .55s ease, transform .55s ease";
    revealObserver.observe(el);
  });
  const revealStyle = document.createElement("style");
  revealStyle.textContent = ".in-view{opacity:1!important;transform:translateY(0)!important}";
  document.head.appendChild(revealStyle);
})();
