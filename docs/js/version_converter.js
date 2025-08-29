/**
 * Version Converter for XenForo documentation
 * Converts a version string to XenForo version ID format
 */
document$.subscribe(function () {
  const versionConverter = document.getElementById("versionConverter");
  if (versionConverter) {
    const versionInput = document.getElementById("versionInput");
    const convertBtn = document.getElementById("convertBtn");
    const resultEl = document.getElementById("versionResult");

      function convertAndShow() {
          convertVersion(versionInput.value, resultEl);
      }

      convertBtn.addEventListener("click", convertAndShow);
      versionInput.addEventListener("keypress", function(event) {
          if (event.key === "Enter") convertAndShow();
      });
  }
});

/**
 * Converts a version string to XenForo version ID
 * @param {string} input - Version string (e.g. "1.7.3 rc4")
 * @param {HTMLElement} resultEl - Element to display result
 */
function convertVersion(input, resultEl) {
    input = input.trim().toLowerCase().replace(/\s+/g, " ");

    const regex = /^(\d{1,2})\.(\d{1,2})\.(\d{1,2})(?:\s*(alpha|a|beta|b|rc|release\s*candidate|stable|s)?\s*([0-9])?)?$/i;
    const match = input.match(regex);

    if (!match) {
        showError(resultEl, "Invalid format. Example: '1.7.3 rc4' or '2.0.0'");
        return;
    }

    const majorNum = parseInt(match[1], 10);
    const minorNum = parseInt(match[2], 10);
    const patchNum = parseInt(match[3], 10);

    if (majorNum > 99 || minorNum > 99 || patchNum > 99) {
        showError(resultEl, "Major, minor, and patch versions must be 0-99");
        return;
    }

    const major = String(majorNum).padStart(2, "0");
    const minor = String(minorNum).padStart(2, "0");
    const patch = String(patchNum).padStart(2, "0");

    let state = 7; // stable default
    if (match[4]) {
        const label = match[4].toLowerCase();
        if (label.startsWith("a")) state = 1;   // alpha
        else if (label.startsWith("b")) state = 3; // beta
        else if (label.startsWith("rc")) state = 5; // release candidate
        else if (label.startsWith("s")) state = 7; // stable
    }

    let stateVer = 0;
    if (match[5]) {
        stateVer = parseInt(match[5], 10);
        if (stateVer < 0 || stateVer > 9) {
            showError(resultEl, "State version must be 0-9");
            return;
        }
    }

    const versionId = `${major}${minor}${patch}${state}${stateVer}`;
    showSuccess(resultEl, `Version ID: ${versionId}`);
}

function showError(el, msg) {
    el.textContent = msg;
    el.classList.add("version-error");
    el.classList.remove("version-success");
}

function showSuccess(el, msg) {
    el.textContent = msg;
    el.classList.add("version-success");
    el.classList.remove("version-error");
}