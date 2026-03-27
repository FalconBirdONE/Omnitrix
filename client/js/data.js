// data.js — Central distro definitions used by quiz.js
// Each distro has: experience, purpose, ui, name, tagline, and download link

const distros = [
  {
    id: "ubuntu",
    name: "Ubuntu",
    tagline: "It just works. Usually.",
    experience: "beginner",
    purpose: "general",
    ui: "simple",
    downloadUrl: "https://ubuntu.com/download",
    page: "../distros/ubuntu.html"
  },
  {
    id: "mint",
    name: "Linux Mint",
    tagline: "Windows users in denial.",
    experience: "beginner",
    purpose: "general",
    ui: "simple",
    downloadUrl: "https://linuxmint.com/download.php",
    page: "../distros/mint.html"
  },
  {
    id: "fedora",
    name: "Fedora",
    tagline: "Bleeding edge, but not bleeding out.",
    experience: "intermediate",
    purpose: "dev",
    ui: "modern",
    downloadUrl: "https://fedoraproject.org/workstation/download",
    page: "../distros/fedora.html"
  },
  {
    id: "popos",
    name: "Pop!_OS",
    tagline: "For developers who think tiling makes them productive.",
    experience: "intermediate",
    purpose: "dev",
    ui: "modern",
    downloadUrl: "https://pop.system76.com/",
    page: "../distros/popos.html"
  },
  {
    id: "arch",
    name: "Arch Linux",
    tagline: "You install everything manually. Including your ego.",
    experience: "advanced",
    purpose: "customization",
    ui: "control",
    downloadUrl: "https://archlinux.org/download/",
    page: "../distros/arch.html"
  }
];
