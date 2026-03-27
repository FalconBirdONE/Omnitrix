// quiz.js — Handles form submission and rule-based distro matching
// Uses the `distros` array defined in data.js

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("quiz-form");
  const resultDiv = document.getElementById("quiz-result");

  if (!form) return; // Only run on index.html

  form.addEventListener("submit", (e) => {
    e.preventDefault(); // Prevent page reload

    // Get user's answers from the form
    const experience = document.getElementById("experience").value;
    const purpose = document.getElementById("purpose").value;
    const ui = document.getElementById("ui").value;

    // Score each distro based on how well it matches user answers
    const scores = distros.map((distro) => {
      let score = 0;

      // Award points for each matching field
      if (distro.experience === experience) score += 3;
      if (distro.purpose === purpose) score += 3;
      if (distro.ui === ui) score += 3;

      // Partial match bonuses (experience proximity)
      if (distro.experience === "beginner" && experience === "intermediate") score += 1;
      if (distro.experience === "intermediate" && experience === "advanced") score += 1;

      return { distro, score };
    });

    // Sort by score descending, pick the top match
    scores.sort((a, b) => b.score - a.score);
    const best = scores[0].distro;

    // Show a brief result message before redirect
    resultDiv.innerHTML = `
      <div class="result-card fade-in visible">
        <p>🎯 Based on your answers, we recommend:</p>
        <h2>${best.name}</h2>
        <p class="tagline">"${best.tagline}"</p>
        <a href="${best.page}" class="btn">Explore ${best.name} →</a>
      </div>
    `;
    resultDiv.scrollIntoView({ behavior: "smooth" });
  });
});
