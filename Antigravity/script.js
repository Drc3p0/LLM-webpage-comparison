/**
 * MEOW_NET // CYBERNETIC_FELINE_GRID
 * INTERACTIVE BEHAVIORS // VERSION 4.02
 */

document.addEventListener("DOMContentLoaded", () => {
    // --- State Variables ---
    let soundEnabled = false;
    let lastActiveElement = null;

    // --- Cat Databank ---
    const CAT_DATA = {
        1: {
            designation: "SEC_UNIT_01 // SHADOW_STALKER",
            nap: "98.7% (OPTIMIZED)",
            hiss: "42dB (STEALTH)",
            agility: "99.2% (ELITE)",
            risk: "95% (EXCEEDINGLY HIGH)",
            desc: "Formidable leader of the Meow-Net Syndicate. Known for organizing high-density server room takeovers for thermal optimization. Specialize in human ankle surveillance. Keep kibble reserves filled to prevent night assaults."
        },
        2: {
            designation: "SEC_UNIT_02 // MICRO_STACK_v2",
            nap: "41.2% (UNSTABLE)",
            hiss: "88dB (HIGH_FREQUENCY)",
            agility: "65.4% (CALIBRATING)",
            risk: "10% (LOW)",
            desc: "Experimental micro-agents in active cluster configuration. Highly volatile code prone to sudden high-speed runs and keyboard walking. Requires constant battery recharging (naps in sunny spots)."
        },
        3: {
            designation: "SEC_UNIT_03 // GRAVITY_SHREDDER",
            nap: "89.1% (STANDBY)",
            hiss: "72dB (TACTICAL)",
            agility: "99.9% (HARDWARE_LIMIT)",
            risk: "40% (MEDIUM)",
            desc: "Kinetic interception specialist. Highly skilled in mid-air trajectory correction, vertical curtain scaling, and rapid red-dot subversion. Extremely sensitive to cardboard box placements."
        },
        4: {
            designation: "SEC_UNIT_04 // ORANGE_MERGE",
            nap: "99.9% (SUPER_CONDUCTOR)",
            hiss: "12dB (MINIMAL)",
            agility: "40.2% (SLOW_RESPONSE)",
            risk: "85% (HIGH)",
            desc: "Neural bonding configuration. Combines two orange processors to construct a single shared brain cell. Core temp runs hot. Energy efficiency maximized via synchronized purr oscillations."
        },
        5: {
            designation: "SEC_UNIT_05 // CRYO_SLEEP_LINK",
            nap: "100.0% (ABSOLUTE_ZERO)",
            hiss: "0dB (OFFLINE)",
            agility: "12.5% (SLEEPING)",
            risk: "99% (CRITICAL)",
            desc: "Advanced hibernation sequence engaged. Thermal signatures combined to withstand heavy air-conditioning. Do not touch the belly sector. Disruption of this state triggers immediate claw-deployment protocols."
        }
    };

    // --- DOM Elements ---
    const systemTimeEl = document.getElementById("system-time");
    const terminalForm = document.getElementById("terminal-form");
    const terminalInput = document.getElementById("terminal-input");
    const terminalLog = document.getElementById("terminal-log");
    const btnSound = document.getElementById("btn-sound");
    
    // Modal Elements
    const modal = document.getElementById("scanner-modal");
    const modalCloseBtn = document.getElementById("modal-close-btn");
    const modalCloseOverlay = document.getElementById("modal-close-overlay");
    const modalImg = document.getElementById("modal-img");
    const modalFallback = document.getElementById("modal-fallback");
    const modalTitle = document.getElementById("modal-title");
    const statDesignation = document.getElementById("stat-designation");
    const statNap = document.getElementById("stat-nap");
    const statHiss = document.getElementById("stat-hiss");
    const statAgility = document.getElementById("stat-agility");
    const statRisk = document.getElementById("stat-risk");
    const modalDescription = document.getElementById("modal-description");

    // --- Clock Update ---
    function updateClock() {
        const now = new Date();
        const yyyy = now.getFullYear();
        const mm = String(now.getMonth() + 1).padStart(2, '0');
        const dd = String(now.getDate()).padStart(2, '0');
        const hh = String(now.getHours()).padStart(2, '0');
        const min = String(now.getMinutes()).padStart(2, '0');
        const sec = String(now.getSeconds()).padStart(2, '0');
        if (systemTimeEl) {
            systemTimeEl.textContent = `TIME: ${yyyy}.${mm}.${dd} ${hh}:${min}:${sec}`;
        }
    }
    setInterval(updateClock, 1000);
    updateClock();

    // --- Web Audio Synthesizer ---
    function playBeep(freq = 600, duration = 0.06, type = 'sine') {
        if (!soundEnabled) return;
        try {
            const ctx = new (window.AudioContext || window.webkitAudioContext)();
            const osc = ctx.createOscillator();
            const gainNode = ctx.createGain();
            osc.type = type;
            osc.frequency.value = freq;
            gainNode.gain.setValueAtTime(0.04, ctx.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);
            osc.connect(gainNode);
            gainNode.connect(ctx.destination);
            osc.start();
            osc.stop(ctx.currentTime + duration);
        } catch (e) {
            console.warn("Audio Context blocked or unsupported:", e);
        }
    }

    // Sound toggle
    if (btnSound) {
        btnSound.addEventListener("click", () => {
            soundEnabled = !soundEnabled;
            if (soundEnabled) {
                btnSound.textContent = "SOUND: ON";
                btnSound.classList.add("text-green");
                playBeep(880, 0.1, 'square');
            } else {
                btnSound.textContent = "MUTE";
                btnSound.classList.remove("text-green");
            }
        });
    }

    // --- Interactive Terminal Interface ---
    function writeToTerminal(text, className = "") {
        const line = document.createElement("div");
        line.className = `log-line ${className}`;
        line.innerHTML = text;
        terminalLog.appendChild(line);
        terminalLog.scrollTop = terminalLog.scrollHeight;
    }

    if (terminalForm && terminalInput) {
        terminalForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const cmd = terminalInput.value.trim().toLowerCase();
            terminalInput.value = "";

            if (!cmd) return;

            playBeep(440, 0.05, 'triangle');
            writeToTerminal(`<span class="prompt-symbol">neko@root:~#</span> ${escapeHTML(cmd)}`);

            setTimeout(() => {
                executeCommand(cmd);
            }, 100);
        });

        // Typing sounds
        terminalInput.addEventListener("input", () => {
            playBeep(Math.random() * 200 + 500, 0.02, 'sine');
        });
    }

    function escapeHTML(str) {
        return str.replace(/[&<>'"]/g, 
            tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag)
        );
    }

    function executeCommand(cmd) {
        switch (cmd) {
            case 'help':
                writeToTerminal("AVAILABLE CODES:", "text-cyan");
                writeToTerminal(" <span class='text-yellow'>cat</span>     - Display grid mascot ASCII model");
                writeToTerminal(" <span class='text-yellow'>bounce</span>  - Open remote cat bounce uplink");
                writeToTerminal(" <span class='text-yellow'>purr</span>    - Activate cybernetic vibrational core");
                writeToTerminal(" <span class='text-yellow'>status</span>  - Run system hardware diagnosis");
                writeToTerminal(" <span class='text-yellow'>feed</span>    - Attempt bowl refueling protocol");
                writeToTerminal(" <span class='text-yellow'>clear</span>   - Purge log terminal records");
                writeToTerminal(" <span class='text-yellow'>help</span>    - Show this protocol overview");
                break;
            case 'cat':
                playBeep(700, 0.1, 'sine');
                writeToTerminal("   /\\_/\\  ", "text-cyan");
                writeToTerminal("  ( o.o )  ", "text-cyan");
                writeToTerminal("   > ^ <   ", "text-cyan");
                writeToTerminal("[SYSTEM] MASCOT RENDERED SUCCESSFULLY.");
                break;
            case 'bounce':
                playBeep(900, 0.15, 'square');
                writeToTerminal("[WARNING] REDIRECTING TO REMOTE SITE: CAT-BOUNCE.COM", "text-pink");
                writeToTerminal("Establishing secondary uplink...", "text-muted");
                setTimeout(() => {
                    window.open("https://cat-bounce.com/", "_blank");
                }, 1500);
                break;
            case 'purr':
                playBeep(120, 0.5, 'triangle');
                playBeep(150, 0.4, 'triangle');
                writeToTerminal("PRRRRRR... PURRRR... PRRRRRR...", "text-green");
                writeToTerminal("[CORE] Low frequency resonance stabilized at 25Hz.");
                break;
            case 'status':
                playBeep(600, 0.1, 'sine');
                writeToTerminal("SYSTEM STATISTICS:", "text-cyan");
                writeToTerminal(` - ACTIVE_UNITS: 5 / 5 ONLINE`);
                writeToTerminal(` - MEMORY_USAGE: 92% (NAP_OVERHEAD)`);
                writeToTerminal(` - TEMP_MONITOR: 38.5°C (WARM_PURR)`);
                writeToTerminal(` - KIBBLE_RESERVE: 0.4% (WARNING: DEGRADED)`);
                writeToTerminal(` - ANTENNA_FREQ: 5.4GHz (WHISKER_BAND)`);
                break;
            case 'feed':
                playBeep(220, 0.3, 'sawtooth');
                writeToTerminal("[ERROR] CAN OPENER INTERFACE OFFLINE.", "text-pink");
                writeToTerminal("[SYSTEM] BOWL EMPTY. CRITICAL THREAT LEVEL DETECTED.", "text-pink");
                writeToTerminal("[ACTION] INITIALIZING 03:00 AM VOCAL SCRITCH CONFLICT...", "text-yellow");
                break;
            case 'clear':
                terminalLog.innerHTML = "";
                writeToTerminal("Log cleared. Connection secure.", "text-muted");
                break;
            default:
                playBeep(180, 0.25, 'sawtooth');
                writeToTerminal(`[!] UNKNOWN CODE: '${escapeHTML(cmd)}'. TYPE 'help' FOR PROTOCOLS.`, "text-pink");
                break;
        }
    }

    // --- Modal Scanner Interactions ---
    const galleryCards = document.querySelectorAll(".gallery-card");

    galleryCards.forEach(card => {
        // Open on click
        card.addEventListener("click", () => {
            openScannerModal(card);
        });

        // Open on keyboard Space/Enter
        card.addEventListener("keydown", (e) => {
            if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                openScannerModal(card);
            }
        });
    });

    function openScannerModal(card) {
        lastActiveElement = card;
        const catId = card.getAttribute("data-cat-id");
        const details = CAT_DATA[catId];
        const origImg = card.querySelector(".gallery-img");

        if (!details) return;

        playBeep(800, 0.08, 'sine');

        // Set Image & Handle Errors
        modalImg.src = `images/gallery-${catId}.jpg`;
        modalImg.alt = origImg.alt;

        // Reset error state
        modalImg.classList.remove("error");
        if (origImg.classList.contains("error")) {
            modalImg.classList.add("error");
        }

        // Set Info
        modalTitle.textContent = `OPTICAL_SCAN // ${details.designation}`;
        statDesignation.textContent = details.designation;
        statNap.textContent = details.nap;
        statHiss.textContent = details.hiss;
        statAgility.textContent = details.agility;
        statRisk.textContent = details.risk;
        modalDescription.textContent = details.desc;

        // Show Modal
        modal.classList.add("active");
        modal.setAttribute("aria-hidden", "false");
        modalCloseBtn.focus();

        // Trap focus
        document.addEventListener("keydown", trapFocus);
    }

    function closeScannerModal() {
        modal.classList.remove("active");
        modal.setAttribute("aria-hidden", "true");
        document.removeEventListener("keydown", trapFocus);
        
        playBeep(500, 0.05, 'sine');

        if (lastActiveElement) {
            lastActiveElement.focus();
        }
    }

    // Trap focus inside modal for accessibility
    function trapFocus(e) {
        if (!modal.classList.contains("active")) return;

        const focusableElements = modal.querySelectorAll('button, [tabindex="0"]');
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.key === "Tab") {
            if (e.shiftKey) { // Shift + Tab
                if (document.activeElement === firstElement) {
                    lastElement.focus();
                    e.preventDefault();
                }
            } else { // Tab
                if (document.activeElement === lastElement) {
                    firstElement.focus();
                    e.preventDefault();
                }
            }
        } else if (e.key === "Escape") {
            closeScannerModal();
        }
    }

    // Modal Close Triggers
    if (modalCloseBtn) {
        modalCloseBtn.addEventListener("click", closeScannerModal);
    }
    if (modalCloseOverlay) {
        modalCloseOverlay.addEventListener("click", closeScannerModal);
    }

    // Highlight console hover sounds
    const interactiveElements = document.querySelectorAll(".gallery-card, .cyber-link, .control-btn");
    interactiveElements.forEach(el => {
        el.addEventListener("mouseenter", () => {
            playBeep(1200, 0.02, 'sine');
        });
    });
});
