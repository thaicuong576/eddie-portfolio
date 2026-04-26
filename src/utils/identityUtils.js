import { identity } from "../data/identity";

// Project image imports
import bepInk from "../Assets/Projects/bep-ink.png";
import nopsLabs from "../Assets/Projects/nopslabs.png";
import videos100 from "../Assets/Projects/100-videos.png";
import attacker from "../Assets/Projects/attacker.jpg";
import gam3 from "../Assets/Projects/gam3.png";
import gfi from "../Assets/Projects/gfi-duong-qua.png";
import greenSM from "../Assets/Projects/green-sm.png";
import justfab from "../Assets/Projects/justfab.jpg";
import u2u from "../Assets/Projects/u2u.png";
import xToThread from "../Assets/Projects/x-to-thread.png";
import nnct from "../Assets/Projects/nnct-2025.png";
import pmAgent from "../Assets/Projects/pm-agent.png";
import bepScraper from "../Assets/Projects/bep-ink-ggmap-scraper.png";
import contentBot from "../Assets/Projects/eddie-content-bot.png";
import justfactor from "../Assets/Projects/justfactor.png";

/**
 * Maps experience IDs to imported image assets
 * @param {string} id 
 * @returns {any} Image asset
 */
export const getExperienceImage = (id) => {
    if (id === "bep-ink") return bepInk;
    if (id === "attacker-2024") return attacker;
    if (id === "green-sm") return greenSM;
    if (id === "nops-labs") return nopsLabs;
    if (id === "ai-ugc") return videos100;
    if (id === "gfi") return gfi;
    if (id === "gam3") return gam3;
    if (id === "u2u") return u2u;
    if (id === "justfab") return justfab;
    if (id === "x-threads") return xToThread;
    if (id === "rd-proximity") return nnct;
    if (id === "pm-agent") return pmAgent;
    if (id === "lead-gen-scraper") return bepScraper;
    if (id === "content-bot") return contentBot;
    if (id === "justfactor") return justfactor;
    return nopsLabs;
};

/**
 * Filter experience items by specialization ID
 * @param {string} specId 
 * @returns {Array}
 */
export const getExperienceBySpec = (specId) => {
  return identity.experience.filter(item => 
    item.specializations && item.specializations.includes(specId)
  );
};

/**
 * Get specialization metadata by ID
 * @param {string} specId 
 * @returns {Object|null}
 */
export const getSpecById = (specId) => {
  return identity.specializations.find(s => s.id === specId) || null;
};

/**
 * Get specialization title by ID
 * @param {string} id 
 * @returns {string}
 */
export const getSpecTitle = (id) => {
    const spec = getSpecById(id);
    return spec ? spec.title : id;
};
