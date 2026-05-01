import { identity } from "../data/identity";

// Project image imports
import bepInk from "../Assets/Projects/bep-ink.png";
import nopsLabs from "../Assets/Projects/nopslabs.png";
import attacker from "../Assets/Projects/attacker.jpg";
import gam3 from "../Assets/Projects/gam3.png";
import gfi from "../Assets/Projects/gfi-duong-qua.png";
import greenSM from "../Assets/Projects/green-sm.png";
import justfab from "../Assets/Projects/justfab.jpg";
import u2u from "../Assets/Projects/u2u.png";
import xToThread from "../Assets/Projects/x-to-thread.png";
import nnct from "../Assets/Projects/nnct-2025.png";
import contentBot from "../Assets/Projects/eddie-content-bot.png";
import justfactor from "../Assets/Projects/justfactor.png";

// Certificate image imports
import certBlockchain from "../Assets/Certificates/Blockchain-certificates.jpeg";
import certTradingML from "../Assets/Certificates/trading-maching-learning-ibm.jpeg";
import certPython from "../Assets/Certificates/python-michigan.jpeg";
import certAIIntro from "../Assets/Certificates/ai-intro-ibm.jpeg";
import certWord from "../Assets/Certificates/word.png";
import certExcel from "../Assets/Certificates/excel.png";
import certPowerPoint from "../Assets/Certificates/powerpoint.png";
import certMOS from "../Assets/Certificates/mos-associate.png";

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
    if (id === "gfi") return gfi;
    if (id === "gam3") return gam3;
    if (id === "u2u") return u2u;
    if (id === "justfab") return justfab;
    if (id === "x-threads") return xToThread;
    if (id === "rd-proximity") return nnct;
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
/**
 * Maps certificate keys to imported image assets
 * @param {string} key 
 * @returns {any} Image asset
 */
export const getCertificateImage = (key) => {
    if (key === "blockchain") return certBlockchain;
    if (key === "trading-ml") return certTradingML;
    if (key === "python-michigan") return certPython;
    if (key === "ai-intro") return certAIIntro;
    if (key === "word") return certWord;
    if (key === "excel") return certExcel;
    if (key === "powerpoint") return certPowerPoint;
    if (key === "mos") return certMOS;
    return nopsLabs;
};
